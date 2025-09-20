class PartService {
    constructor(db) {
      this.db = db;
    }
  
    // Create new part
    async createPart({ name, short_description, long_description, price, stock, category, image, status }) {
      try {
        const res = await this.db.query(
          `INSERT INTO parts 
            (name, short_description, long_description, price, stock, category, image, status)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           RETURNING *`,
          [name, short_description, long_description, price, stock, category, image, status]
        );
  
        return res.rows[0];
      } catch (err) {
        console.error("Error in creating part:", err.message);
        throw new Error("Failed to create part");
      }
    }
  
    // Get part by name
    async getPartByName(name) {
      try {
        const result = await this.db.query(`SELECT * FROM parts WHERE name = $1`, [name]);
        return result.rows[0];
      } catch (err) {
        console.error("Error in getting part by name:", err.message);
        throw new Error("Failed to get part by name");
      }
    }
  
    // Get all parts (with pagination, search, and status filter)
    async getParts(page = 1, limit = 10, searchTerm = "", status = "") {
      try {
        const offset = (page - 1) * limit;
        const searchPattern = `%${searchTerm.trim()}%`;
  
        const result = await this.db.query(
          `SELECT *
           FROM parts
           WHERE ($1='' OR name ILIKE $2 OR category ILIKE $2)
             AND ($3::text IS NULL OR status=$3)
           ORDER BY created_at DESC
           LIMIT $4 OFFSET $5`,
          [searchTerm, searchPattern, status || null, limit, offset]
        );
  
        const countResult = await this.db.query(
          `SELECT COUNT(*) AS total
           FROM parts
           WHERE ($1='' OR name ILIKE $2 OR category ILIKE $2)
             AND ($3::text IS NULL OR status=$3)`,
          [searchTerm, searchPattern, status || null]
        );
  
        const total = parseInt(countResult.rows[0].total, 10);
        return {
          success: true,
          parts: result.rows,
          pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
        };
      } catch (err) {
        console.error("Error in fetching parts:", err.message);
        throw new Error("Failed to fetch parts");
      }
    }
  
    // Update part
    async updatePart({ part_id, name, short_description, long_description, price, stock, category, image, status }) {
      try {
        const result = await this.db.query(
          `UPDATE parts 
           SET name = $1, short_description = $2, long_description = $3,
               price = $4, stock = $5, category = $6, image = $7, status = $8,
               updated_at = CURRENT_TIMESTAMP
           WHERE part_id = $9
           RETURNING *`,
          [name, short_description, long_description, price, stock, category, image, status, part_id]
        );
  
        if (result.rows.length === 0) {
          return null; // Part not found
        }
  
        return result.rows[0];
      } catch (err) {
        console.error("Error updating part:", err.message);
        throw new Error("Failed to update part");
      }
    }
  
    // Soft delete part (set status = Deleted)
    async deletePart(part_id) {
      try {
        const result = await this.db.query(
          `UPDATE parts 
           SET status = 'Deleted', updated_at = CURRENT_TIMESTAMP
           WHERE part_id = $1
           RETURNING *`,
          [part_id]
        );
  
        if (result.rows.length === 0) {
          return null; // Part not found
        }
  
        return result.rows[0];
      } catch (err) {
        console.error("Error deleting part:", err.message);
        throw new Error("Failed to delete part");
      }
    }
  
    // Get part by ID
    async getPartById(part_id) {
      try {
        const result = await this.db.query(
          `SELECT * FROM parts WHERE part_id = $1`,
          [part_id]
        );
        return result.rows[0];
      } catch (err) {
        console.error("Error in getting part by ID:", err.message);
        throw new Error("Failed to get part by ID");
      }
    }
  }
  
  module.exports = PartService;
  