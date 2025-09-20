
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
        [
            name, description, price, duration, status
        ]
      );

      return true;
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
    try{
        const offset = (page - 1) * limit;
        const searchPattern = `%${searchTerm.trim()}%`;
    
        const result = await this.db.query(`
        SELECT *
        FROM services
        WHERE ($1='' OR name ILIKE $2)
            AND ($3::text IS NULL OR status=$3)
        ORDER BY created_at DESC
        LIMIT $4 OFFSET $5
        `, [searchTerm, searchPattern, status || null, limit, offset]);
    
        const countResult = await this.db.query(`
        SELECT COUNT(*) AS total
        FROM services
        WHERE ($1='' OR name ILIKE $2)
            AND ($3::text IS NULL OR status=$3)
        `, [searchTerm, searchPattern, status || null]);
    
        const total = parseInt(countResult.rows[0].total, 10);
        return {
        success: true,
        services: result.rows,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        };

    }catch(err){
        console.error("Error in fetching services:", err.message);
        throw new Error("Failed to fetch services");
    }
  }



  async updateService({service_id, name,description,price,duration,status}) {
    try {
      
  
      // Update the inquiry
      const result = await this.db.query(
        `UPDATE services 
         SET name = $1, description = $2, price = $3, duration = $4,status= $5, updated_at = CURRENT_TIMESTAMP
         WHERE service_id = $6
         RETURNING *`,
        [   name,
            description,
            price,
            duration,
            status,
            service_id
        ]
      );
  
      if (result.rows.length === 0) {
        throw new Error("service not found");
      }
  
      const updatedService = result.rows[0];
      return updatedService;
    } catch (err) {
      console.error("Error updating service:", err.message);
      throw new Error("Failed to update service");
    }
  }

}

module.exports = ServiceService;
