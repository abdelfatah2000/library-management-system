CREATE TYPE book_status AS ENUM ('available', 'loaned', 'unavailable');
CREATE TYPE reservation_status AS ENUM ('cancelled', 'pending', 'ready', 'accepted');


CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS permissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS role_permissions(
  role_id INT REFERENCES roles(id) ON DELETE CASCADE,
  permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(11) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(11) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id INT REFERENCES roles(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_expiry CHECK (expires_at > created_at)
);


CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  biography TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author_id INT NOT NULL REFERENCES authors(id) ON DELETE CASCADE,
  published_at DATE NOT NULL,
  isbn VARCHAR(50) UNIQUE NOT NULL,
  status book_status DEFAULT 'available',
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS loans (
  id SERIAL PRIMARY KEY,
  member_id INT NOT NULL REFERENCES members(id) ON DELETE RESTRICT,
  staff_id INT NOT NULL REFERENCES staff(id) ON DELETE RESTRICT,
  book_id INT NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
  due_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS reservations(
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  member_id INT NOT NULL REFERENCES members(id) ON DELETE CASCADE,
  status reservation_status DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fines (
  id SERIAL PRIMARY KEY,
  loan_id INT NOT NULL REFERENCES loans(id) ON DELETE RESTRICT,
  member_id INT NOT NULL REFERENCES members(id) ON DELETE RESTRICT,
  amount DECIMAL(10,2) NOT NULL,
  paid_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Indexes
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_books_author_id ON books(author_id);
CREATE INDEX idx_books_category_id ON books(category_id);
CREATE INDEX idx_reservations_member_id ON reservations(member_id);
CREATE INDEX idx_reservations_book_id ON reservations(book_id);
CREATE INDEX idx_loans_member_id ON loans(member_id);
CREATE INDEX idx_loans_book_id ON loans(book_id);
CREATE INDEX idx_fines_member_id ON fines(member_id);
CREATE INDEX idx_fines_loan_id ON fines(loan_id);



-- function to assign update_at with current timestamp every time u edit row
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON members
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_update_at
  BEFORE UPDATE ON books
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at
  BEFORE UPDATE ON staff
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_loans_update_at
    BEFORE UPDATE ON loans
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_update_at
  BEFORE UPDATE ON reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_fines_updated_at
  BEFORE UPDATE ON fines
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();


-- function to clean verification_tokens table from expired rows
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM verification_tokens 
    WHERE expires_at < CURRENT_TIMESTAMP 
    AND used_at IS NULL;
END;
$$ language 'plpgsql';


INSERT INTO roles(name, description) VALUES
('admin', 'System administrator with complete access'),
('librarian', 'Librarian with limited access');

INSERT INTO permissions (name, description) VALUES
-- Book Management
('manage_books', 'CRUD books'),
('view_books', 'Retrieves books'),
('manage_categories', 'Manage books categories'),

-- Member Management
('manage_members', 'CRUD members'),
('view_members', 'View member'),

-- Staff Management
('manage_staff', 'CRUD staff'),
('view_staff', 'View staff'),

-- Loan Management
('issue_loans', 'Issue books to members'),
('return_loans', 'Return books'),
('override_due_dates', 'Modify due dates and override late fees'),

-- Reservation Management
('manage_reservations', 'Process reservations'),
('view_reservations', 'Update or modify existing reservations'),
('cancel_reservations', 'Cancel existing reservations'),

-- Fines Management
('change_fine', 'Change fines'),
('manage_fines', 'Create and manage fines');

-- Insert permission for every role
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p 
WHERE r.name = 'admin';

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'librarian'
AND p.name IN (
  'manage_books',
  'view_books',
  'manage_categories',
  'view_members',
  'issue_loans',
  'return_loans',
  'override_due_dates',
  'manage_reservations',
  'view_reservations',
  'cancel_reservations',
  'change_fine',
  'manage_fines'
);

INSERT INTO staff (name, email, phone, password, role_id)
VALUES ('ta7a', 'ta7a@gmail.com', '01200186617', '$2b$07$tdrLx8Xi/5NwzQFnvk2l/eAHVK4uNK60.YAsGCQTnMNmwhsiMX88q',
(SELECT id FROM roles WHERE name = 'admin'));
