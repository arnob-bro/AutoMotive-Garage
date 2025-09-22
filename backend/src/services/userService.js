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
  
      // Convert vehicle_id to string for consistency with frontend
      const vehicles = res3.rows.map(vehicle => ({
        ...vehicle,
        vehicle_id: vehicle.vehicle_id.toString() // Convert integer to string
      }));
  
      return {
        ...res1.rows[0],
        ...res2.rows[0],
        vehicles: vehicles
      };
    } catch (err) {
      console.error("Error in getting customer profile by id:", err.message);
      throw new Error("Failed to get customer profile");
    }
  }
  

  async updateProfile(user_id, role, name, email, phone, birthday, anniversary, address, vehicles) {
    try {
      // Update users table
      await this.db.query(
        `UPDATE users SET email = $1 WHERE user_id = $2`,
        [email, user_id]
      );
  
      // Update customers table
      await this.db.query(
        `UPDATE customers 
         SET name = $1, phone = $2, birthday = $3, anniversary = $4, address = $5 
         WHERE customer_id = $6`,
        [name, phone, birthday, anniversary, address, user_id]
      );
  
      // Handle vehicles - you'll need to implement this logic
      if (vehicles && Array.isArray(vehicles)) {
        await this.updateUserVehicles(user_id, vehicles);
      }
  
      // Return updated profile
      return await this.getCustomerProfileById(user_id);
    } catch (err) {
      console.error("Error in updating profile:", err.message);
      throw new Error("Failed to update profile");
    }
  }
  
  // In UserService class, replace the updateUserVehicles method:

  async updateUserVehicles(user_id, vehicles) {
    try {
      console.log('Updating vehicles for user:', user_id);
      console.log('Incoming vehicles:', vehicles);
      
      // Get current vehicles
      const currentVehicles = await this.db.query(
        `SELECT vehicle_id FROM vehicles WHERE customer_id = $1`,
        [user_id]
      );
      
      const currentVehicleIds = currentVehicles.rows.map(v => v.vehicle_id.toString());
      const incomingVehicleIds = vehicles.filter(v => v.vehicle_id && v.vehicle_id !== null).map(v => v.vehicle_id.toString());
      
      console.log('Current vehicle IDs:', currentVehicleIds);
      console.log('Incoming vehicle IDs:', incomingVehicleIds);
      
      // Delete vehicles that are no longer present
      const vehiclesToDelete = currentVehicleIds.filter(id => !incomingVehicleIds.includes(id));
      
      for (const vehicleId of vehiclesToDelete) {
        await this.db.query(
          `DELETE FROM vehicles WHERE vehicle_id = $1 AND customer_id = $2`,
          [vehicleId, user_id]
        );
      }
      
      // Update or insert vehicles
      for (const vehicle of vehicles) {
        // --- ADD VALIDATION HERE ---
        // Validate required fields
        if (!vehicle.brand || !vehicle.model || !vehicle.year) {
          throw new Error("Vehicle brand, model, and year are required");
        }
        
        // Validate year is 4 characters (e.g., "2020")
        const yearString = vehicle.year.toString();
        if (yearString.length !== 4) {
          throw new Error("Vehicle year must be 4 characters (e.g., '2020')");
        }
        
        // Validate year is a valid number
        if (isNaN(yearString) || parseInt(yearString) < 1900 || parseInt(yearString) > new Date().getFullYear() + 1) {
          throw new Error("Vehicle year must be a valid year");
        }
        // --- END VALIDATION ---
        
        if (vehicle.vehicle_id && vehicle.vehicle_id !== null) {
          // Update existing vehicle - vehicle_id is integer
          await this.db.query(
            `UPDATE vehicles SET brand = $1, model = $2, year = $3 
             WHERE vehicle_id = $4 AND customer_id = $5`,
            [vehicle.brand, vehicle.model, yearString, vehicle.vehicle_id, user_id]
          );
        } else {
          // Insert new vehicle - let SERIAL handle the ID
          await this.db.query(
            `INSERT INTO vehicles (brand, model, year, customer_id) 
             VALUES ($1, $2, $3, $4) RETURNING vehicle_id`,
            [vehicle.brand, vehicle.model, yearString, user_id]
          );
        }
      }
      
      console.log('Vehicle update completed successfully');
    } catch (err) {
      console.error("Error updating vehicles:", err.message);
      console.error("Error stack:", err.stack);
      throw new Error("Failed to update vehicles: " + err.message);
    }
  }

















  
}

module.exports = UserService;
