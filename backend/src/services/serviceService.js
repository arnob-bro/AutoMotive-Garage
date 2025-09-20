class ServiceService {
  constructor(db) {
    this.db = db;
  }

  async createService({name, description, price, duration, status}) {
    try {
      // Insert service
      const res = await this.db.query(
        `INSERT INTO services 
        (name, description, price, duration, status)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
        [name, description, price, duration, status]
      );

      return res.rows[0]; // Return the created service instead of just true
    } catch (err) {
      console.error("Error in creating service:", err.message);
      throw new Error("Failed to create service");
    }
  }

  async getServiceByName(name) {
    try {
      const result = await this.db.query(`SELECT * FROM services WHERE name = $1`, [name]);
      return result.rows[0];
    } catch (err) {
      console.error("Error in getting service by name:", err.message);
      throw new Error("Failed to get service by name");
    }
  }

  async getServices(page = 1, limit = 10, searchTerm = "", status = "") {
    try {
        const offset = (page - 1) * limit;
        const searchPattern = `%${searchTerm.trim()}%`;
    
        // Build the WHERE clause dynamically
        let whereClause = "WHERE 1=1";
        const queryParams = [];
        let paramIndex = 1;

        // Add search term condition
        if (searchTerm.trim()) {
          whereClause += ` AND name ILIKE $${paramIndex}`;
          queryParams.push(searchPattern);
          paramIndex++;
        }

        // Add status condition
        if (status && status.trim()) {
          whereClause += ` AND status = $${paramIndex}`;
          queryParams.push(status);
          paramIndex++;
        }

        // Add pagination parameters
        whereClause += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        queryParams.push(limit, offset);
    
        const result = await this.db.query(`
        SELECT service_id, name, description, price, duration, status, created_at, updated_at
        FROM services
        ${whereClause}
        `, queryParams);
    
        // Count query with same conditions
        let countWhereClause = "WHERE 1=1";
        const countParams = [];
        let countParamIndex = 1;

        if (searchTerm.trim()) {
          countWhereClause += ` AND name ILIKE $${countParamIndex}`;
          countParams.push(searchPattern);
          countParamIndex++;
        }

        if (status && status.trim()) {
          countWhereClause += ` AND status = $${countParamIndex}`;
          countParams.push(status);
        }

        const countResult = await this.db.query(`
        SELECT COUNT(*) AS total
        FROM services
        ${countWhereClause}
        `, countParams);
    
        const total = parseInt(countResult.rows[0].total, 10);
        
        return {
          success: true,
          services: result.rows,
          pagination: { 
            page: parseInt(page), 
            limit: parseInt(limit), 
            total, 
            totalPages: Math.ceil(total / limit) 
          }
        };

    } catch(err) {
        console.error("Error in fetching services:", err.message);
        throw new Error("Failed to fetch services");
    }
  }

  async updateService({service_id, name, description, price, duration, status}) {
    try {
      // Update the service
      const result = await this.db.query(
        `UPDATE services 
         SET name = $1, description = $2, price = $3, duration = $4, status = $5, updated_at = CURRENT_TIMESTAMP
         WHERE service_id = $6
         RETURNING *`,
        [name, description, price, duration, status, service_id]
      );
  
      if (result.rows.length === 0) {
        return null; // Service not found
      }
  
      const updatedService = result.rows[0];
      return updatedService;
    } catch (err) {
      console.error("Error updating service:", err.message);
      throw new Error("Failed to update service");
    }
  }

  async deleteService(service_id) {
    try {
      // Soft delete by updating status to 'Deleted'
      const result = await this.db.query(
        `UPDATE services 
         SET status = 'Deleted', updated_at = CURRENT_TIMESTAMP
         WHERE service_id = $1
         RETURNING *`,
        [service_id]
      );

      if (result.rows.length === 0) {
        return null; // Service not found
      }

      return result.rows[0];
    } catch (err) {
      console.error("Error deleting service:", err.message);
      throw new Error("Failed to delete service");
    }
  }

  async getServiceById(service_id) {
    try {
      const result = await this.db.query(
        `SELECT * FROM services WHERE service_id = $1`,
        [service_id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Error in getting service by ID:", err.message);
      throw new Error("Failed to get service by ID");
    }
  }
}

module.exports = ServiceService;