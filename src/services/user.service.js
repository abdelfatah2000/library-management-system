const db = require("../config/db");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendMail = require("../utils/sendMail");


const getMemberByEmail = async (email) => {
  const user = await db.query("SELECT id FROM members WHERE email = $1", [email]);
  return user.rows[0];
};

const getStaffByEmail = async (email) => {
  const user = await db.query("SELECT id FROM staff WHERE email = $1", [email]);
  return user.rows[0];
};

const getMemberByID = async (id) => {
  const user = await db.query("SELECT id FROM members WHERE id = $1", [id]);
  return user.rows[0];
};

const getStaffByID = async (id) => {
  const user = await db.query("SELECT id, email, role_id FROM staff WHERE id = $1", [id]);
  if (!user) {
    throw new AppError("User not found", StatusCodes.BAD_REQUEST, "fail", true);
  }
  return user.rows[0];
};


const getUserByEmail = async (email) => {
  const user = await db.query("SELECT id FROM users WHERE email = $1", [email]);
  return user.rows[0];
};

const generateJWT = (id, email, role_id) => {
  const payload = {
    id,
    email,
    role_id,
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

const addMember = async (name, email, phone) => {
  const user = await getUserByEmail(email);
  if (user) {
    throw new AppError(
      "Duplicate value",
      StatusCodes.BAD_REQUEST,
      "fail",
      true
    );
  }
  const text = `
      INSERT INTO members (name, email, phone, created_at, updated_at)
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *;
  `;
  const { rows } = await db.query(text, [name, email, phone]);

  //verify email
  const token = generateToken();
  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await db.query(
    `INSERT INTO verification_tokens (user_id, token, expires_at) VALUES ($1, $2, $3);`,
    [rows[0].id, token, expires_at]
  );

  const verificationLink = `http://localhost/3000/api/verify-email?token=${token}`;

  const html = `<h1>Welcome to Library Management System!</h1>
          <p>Please click the link below to verify your email:</p>
          <a href="${verificationLink}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>`;
  await sendMail(email, "Email Verification", html);

  return rows[0];
};

const addLibrarian = async (name, email, phone, password, role_id) => {
  const text = `
      INSERT INTO staff (name, email, phone, password, role_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `;
  const hashedPassword = await hashPassword(password);
  const { rows } = await db.query(text, [name, email, phone, hashedPassword, role_id]);
  return rows[0];
};

const login = async (email, password) => {
  const query = `
      SELECT id, email, password, role_id
      FROM staff 
      WHERE email = $1;
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
  const isMatch = await comparePassword(password, user.rows[0].password);
  if (!isMatch) {
    throw new AppError(
      "Invalid credentials",
      StatusCodes.UNAUTHORIZED,
      "fail",
      true
    );
  }

  const token = generateJWT(
    user.rows[0].id,
    user.rows[0].email,
    user.rows[0].role_id
  );
  return token;
};


const verifyEmail = async (token) => {
  const query = `
      SELECT user_id, expires_at
      FROM verification_tokens 
      WHERE token = $1
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
  await db.query("UPDATE members SET is_verified = TRUE WHERE id = $1", [
    user_id,
  ]);
  // Delete token from verification_tokens table
  await db.query("DELETE FROM verification_tokens WHERE user_id = $1", [
    user_id,
  ]);
};

module.exports = {
  addLibrarian,
  getStaffByID,
  verifyEmail,
  addMember,
  login,
};
