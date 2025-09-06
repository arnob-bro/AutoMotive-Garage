const bcrypt = require("bcrypt");

class UserService {
  constructor(db) {
    this.db = db;

  }

  // ----------Signup---------------
  async createUser(user_id, name,email, password) {
    try {

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user
      const res1 = await this.db.query(
        `INSERT INTO users 
        (user_id,email, password_hash)
       VALUES ($1,$2,$3)
       RETURNING user_id,  email, password_hash`,
        [
            user_id,
            
            email,
            hashedPassword
        ]
      );

      const res2 = await this.db.query(
        `INSERT INTO customers 
        (customer_id, name)
       VALUES ($1,$2)
       RETURNING customer_id, name`,
        [
            user_id,
            name
        ]
      );

      return true;
    } catch (err) {
      console.error("Error in creating user:", err.message);
      throw new Error("Failed to create user");
    }
  }

  async getUserByEmail(email) {
    try {
      const result = await this.db.query(`SELECT * FROM users WHERE email = $1`, [email]);
      return result.rows[0];
    } catch (err) {
      console.error("Error in getting user by email:", err.message);
      throw new Error("Failed to get user by email");
    }
  }

  async getRoleById(role_id) {
    try {
      const result = await this.db.query(`SELECT * FROM roles WHERE id = $1`, [role_id]);
      return result.rows[0];
    } catch (err) {
      console.error("Error in getting role by id:", err.message);
      throw new Error("Failed to get role by id");
    }
  }

  
  async getUserById(user_id) {
    try {
      const result = await this.db.query(`SELECT * FROM users WHERE user_id = $1`, [user_id]);
      return result.rows[0];
    } catch (err) {
      console.error("Error in getting user by id:", err.message);
      throw new Error("Failed to get user by id");
    }
  }

}

module.exports = UserService;
