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

  async getCustomerProfileById(user_id) {
    try {
      const res1 = await this.db.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [user_id]
      );
  
      const res2 = await this.db.query(
        `SELECT * FROM customers WHERE customer_id = $1`,
        [user_id]
      );
      const res3 = await this.db.query(
        `SELECT * FROM vehicles WHERE customer_id = $1`,
        [user_id]
      );
  
      // If no results found
      if (!res1.rows[0] || !res2.rows[0]) {
        return null;
      }
  
      // Merge the two objects
      return {
        ...res1.rows[0],
        ...res2.rows[0],
        vehicles: res1.rows[0] || []
      };
    } catch (err) {
      console.error("Error in getting customer profile by id:", err.message);
      
    }
  }
  

  async updateProfile(user_id,role,email,phone,birthday,anniversary,address) {
    try {
      if(role === "admin"){
        const res1 = await this.db.query(`
          UPDATE users
          SET email = $1
          WHERE user_id = $2`, [email, user_id]);

          const res2 = await this.db.query(`
            UPDATE admin
            SET phone = $1, birthday = $2, anniversary = $3, address = $4
            WHERE customer_id = $5`, [phone,birthday,anniversary,address,user_id]);
      }
      else if( role === "customer"){
        if(role === "admin"){
          const res1 = await this.db.query(`
            UPDATE users
            SET email = $1
            WHERE user_id = $2`, [email, user_id]);
  
            const res2 = await this.db.query(`
              UPDATE customers
              SET phone = $1, birthday = $2, anniversary = $3, address = $4
              WHERE customer_id = $5`, [phone,birthday,anniversary,address,user_id]);
        }
      }
      
      return result.rows[0];
    } catch (err) {
      console.error("Error in updating pofile:", err.message);
      throw new Error("Failed to update profile");
    }
  }

}

module.exports = UserService;
