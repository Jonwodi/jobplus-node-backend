const db = require("../config/database");
const bcrypt = require("bcrypt");

// create user
exports.createUser = async (body) => {
  const { first_name, last_name, email, password, confirm_password } = body;

  // check if user already exists using user email
  const checkUserEmail = await db.query(
    'SELECT * FROM "users" WHERE email = $1',
    [email]
  );
  if (checkUserEmail.rows.length > 0) {
    throw new Error("User already exists");
  }

  // check if passwords match
  if (password !== confirm_password) {
    throw new Error("Passwords do not match");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await db.query(
    'INSERT INTO "users" (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [first_name, last_name, email, hashedPassword]
  );

  return rows;
};
