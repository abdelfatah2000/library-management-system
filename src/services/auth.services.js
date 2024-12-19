const db = require("../config/db");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");

const getUserByEmail = async (email) => {
  const user = await db.query("SELECT id FROM users WHERE email = $1", [email]);
  return user.rows[0];
};

const getUserByPhone = async (phone) => {
  const user = await db.query("SELECT id FROM users WHERE phone = $1", [phone]);
  return user.rows[0];
};

const getUserByID = async (id) => {
  const user = await db.query(
    "SELECT id, name, email, phone, created_at, updated_at FROM users WHERE id = $1",
    [id]
  );
  if (!user) {
    throw new AppError("User not found", StatusCodes.BAD_REQUEST, "fail", true);
  }
  return user.rows[0];
};

const generateJWT = (id, email) => {
  const payload = {
    id,
    email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "10d" });
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 7);
  return hashedPassword;
};

const comparePassword = async (plain, hash) => {
  const isMatch = await bcrypt.compare(plain, hash);
  return isMatch;
};

const generateToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

const register = async (name, email, phone, password) => {
  const existingEmail = await getUserByEmail(email);
  const existingPhone = await getUserByPhone(phone);
  if (existingEmail) {
    throw new AppError(
      "Duplicate value",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  } else if (existingPhone) {
    throw new AppError(
      "Duplicate value",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  const query = `
    INSERT INTO users (name, email, password, phone, created_at, updated_at)
    values ($1, $2, $3, $4, NOW(), NOW())
    RETURNING id, name, email, phone, created_at, updated_at
  `;

  const hash = await hashPassword(password);
  const { rows } = await db.query(query, [name, email, hash, phone]);

  // Verification Email
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const text = `
      INSERT INTO verification_tokens (user_id, token, token_type, expires_at) 
      VALUES ($1, $2, 'email_verification', $3);
  `;

  await db.query(text, [rows[0].id, token, expiresAt]);

  const verificationLink = `http://localhost/3000/api/verify-email?token=${token}`;

  const html = `<h1>Welcome to Library Management System!</h1>
          <p>Please click the link below to verify your email:</p>
          <a href="${verificationLink}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>`;

  await sendMail(email, "Email Verification", html);

  return rows[0];
};

const verifyEmail = async (token) => {
  const query = `
      SELECT user_id, expires_at
      FROM verification_tokens 
      WHERE token = $1 AND token_type = 'email_verification'
  `;
  const user = await db.query(query, [token]);
  if (user.rows.length === 0) {
    throw new AppError(
      "Invalid or expired token",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  const { user_id, expires_at } = user.rows[0];

  // check if token expired
  if (new Date() > new Date(expires_at)) {
    throw new AppError("Token Expired", StatusCodes.BAD_REQUEST, "fail", true);
  }

  // Make user verified
  await db.query("UPDATE users SET is_verified = TRUE WHERE id = $1", [
    user_id,
  ]);
  // Delete token from verification_tokens table
  await db.query("DELETE FROM verification_tokens WHERE user_id = $1", [
    user_id,
  ]);
};

const initiateResetPassword = async (email) => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new AppError(
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED,
      "fail",
      true
    );
  }
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
  const query = `
      INSERT INTO verification_tokens (user_id, token, token_type, expires_at)
      VALUES ($1, $2, 'password_reset', $3)
  `;

  // Add token to verification tokens table
  await db.query(query, [user.id, token, expiresAt]);

  //Send the mail
  const resetPasswordLink = `http://localhost:3000/api/reset-password?token=${token}`;
  const html = `<h1>Password Reset Request</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetPasswordLink}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>`;

  await sendMail(email, "Reset password", html);
};

const resetPassword = async (token, password) => {
  const user = await db.query(
    `
    SELECT user_id, token, expires_at
    FROM verification_tokens 
    WHERE token = $1 AND token_type = 'reset_password'`,
    [token]
  );

  if (user.rowCount === 0) {
    throw new AppError(
      "Invalid or expired token",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  const { user_id, expires_at } = user.rows[0];

  // check if token expired
  if (new Date() > new Date(expires_at)) {
    throw new AppError("Token Expired", StatusCodes.BAD_REQUEST, "fail", true);
  }
  const newHasedPassword = await hashPassword(password);
  await db.query(`UPDATE users SET password = $1 WHERE id = $2`, [
    newHasedPassword,
    user_id,
  ]);

  await db.query(
    `DELETE FROM verification_tokens WHERE user_id = $1 AND token_type ='reset_password'`,
    [user_id]
  );
};

const resendEmail = async (email, type) => {
  const token = generateToken();
  let html;
  if (type === "email_verification") {
    const verificationLink = `http://localhost/3000/api/verify-email?token=${token}`;

    html = `<h1>Welcome to Library Management System!</h1>
          <p>Please click the link below to verify your email:</p>
          <a href="${verificationLink}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>`;
    await sendMail(email, "Email Verification", html);
  } else if (type === "reset_password") {
    // Re-Send reset password email
    const resetPasswordLink = `http://localhost:3000/api/reset-password?token=${token}`;
    const html = `<h1>Password Reset Request</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${resetPasswordLink}">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>`;

    await sendMail(email, "Reset password", html);
  }
};

const login = async (email, password) => {
  const query = `
      SELECT id, email, phone, password
      FROM users 
      WHERE (email = $1 OR phone = $1);
      `;
  const user = await db.query(query, [email]);
  if (user.rowCount === 0) {
    throw new AppError(
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED,
      "fail",
      true
    );
  }
  if(user.rows[0].is_verified === false){
    throw new AppError(
      "Verify email first",
      StatusCodes.UNAUTHORIZED,
      "fail",
      true
    );
  }
  const isMatch = await comparePassword(password, user.rows[0].password);
  if (!isMatch) {
    throw new AppError(
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED,
      "fail",
      true
    );
  }
  const token = generateJWT(user.rows[0].id, user.rows[0].email);
  return token;
};

module.exports = {
  initiateResetPassword,
  resetPassword,
  resendEmail,
  getUserByID,
  verifyEmail,
  register,
  login,
};
