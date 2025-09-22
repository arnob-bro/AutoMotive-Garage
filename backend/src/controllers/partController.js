const bcrypt = require("bcrypt");

class PartController {
    constructor(partService) {
      this.partService = partService;
  
      // Bind methods so 'this' works in routes
      this.createPart = this.createPart.bind(this);
      this.getParts = this.getParts.bind(this);
      this.updatePart = this.updatePart.bind(this);
      this.deletePart = this.deletePart.bind(this);
    }
  
    async createPart(req, res) {
      try {
        const {
            name, 
            short_description, 
            long_description, 
            price, 
            stock , 
            category,
            image, 
            status
        } = req.body;
        
        // check if all fields are provided
        if (!name || !short_description || !long_description || price === undefined || !stock || !category || !status) {
          return res.status(400).json({error: "All fields are required"});
        }
        
        // check if name is a valid name
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
          return res.status(400).json({ error: "Invalid name" });
        }
        
        // Validate price
        if (price !== undefined && !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
            return res.status(400).json({ error: "Invalid price. Must be a number with up to 2 decimals." });
        }


        // Validate status
        if (status !== undefined && typeof status !== "string") {
            return res.status(400).json({ error: "Invalid status. Must be a string." });
        }

        // Description is optional, just limit length
        if (short_description && short_description.length > 255) {
            return res.status(400).json({ error: "short description too long (max 255 chars)." });
        }

        if (stock !== undefined) {
          const stockNum = parseInt(stock);
          if (isNaN(stockNum)) {
            return res.status(400).json({ error: "Invalid stock. Must be a number." });
          }
          // Use stockNum for further processing
        }
        

        // check if part already exists
        const partExists = await this.partService.getPartByName(name);
        if (partExists) {
          return res.status(400).json({error: "Part already exists"});
        } 
        
        const partCreation = await this.partService.createPart({
            name, 
            short_description, 
            long_description, 
            price, 
            stock , 
            category,
            image, 
            status
        });
        res.status(201).json({success: true, message: "Part created successfully", part: partCreation});
      } catch (err) {
        console.error('Error in createPart:', err);
        res.status(500).json({ error: err.message || "Internal server error" });
      }
    }

    async getParts(req, res) {
        try {
          const { page = 1, limit = 10, searchTerm = "", status = "" } = req.query;
          
          const parts = await this.partService.getParts(
            parseInt(page), 
            parseInt(limit), 
            searchTerm, 
            status
          );
          
          res.json(parts);
        } catch (error) {
          console.error('Error in getParts:', error);
          res.status(500).json({success: false, error: error.message });
        }
    }

    async updatePart(req, res) {
        try {
          const {
            name, 
            short_description, 
            long_description, 
            price, 
            stock , 
            category,
            image, 
            status
          } = req.body;

          const { part_id } = req.params;

          // Validate service_id
          if (!part_id) {
            return res.status(400).json({error: "Part ID is required"});
          }

          // check if all fields are provided
        if (!name || !short_description || !long_description || price === undefined || !stock || !category || !status) {
            return res.status(400).json({error: "All fields are required"});
          }
          
          // check if name is a valid name
          if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
            return res.status(400).json({ error: "Invalid name" });
          }
          
          // Validate price
          if (price !== undefined && !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
              return res.status(400).json({ error: "Invalid price. Must be a number with up to 2 decimals." });
          }
  
  
          // Validate status
          if (status !== undefined && typeof status !== "string") {
              return res.status(400).json({ error: "Invalid status. Must be a string." });
          }
  
          // Description is optional, just limit length
          if (short_description && short_description.length > 255) {
              return res.status(400).json({ error: "short description too long (max 255 chars)." });
          }
  
          if (stock !== undefined) {
            const stockNum = parseInt(stock);
            if (isNaN(stockNum)) {
              return res.status(400).json({ error: "Invalid stock. Must be a number." });
            }
            // Use stockNum for further processing
          }
          const updatedPart = await this.partService.updatePart({
            part_id, 
            name, 
            short_description, 
            long_description, 
            price, 
            stock , 
            category,
            image, 
            status
        });
            
          if (!updatedPart) {
              return res.status(404).json({ error: "Part not found" });
          }
            
          res.json({success: true, message: "Part updated successfully", part: updatedPart});
        } catch (error) {
          console.error('Error in updateService:', error);
          res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async deletePart(req, res) {
      try {
        const { part_id } = req.params;

        if (!part_id) {
          return res.status(400).json({error: "Part ID is required"});
        }

        const deletedPart = await this.partService.deletePart(part_id);
        
        if (!deletedPart) {
          return res.status(404).json({ error: "Part not found" });
        }
        
        res.json({success: true, message: "Part deleted successfully"});
      } catch (error) {
        console.error('Error in deletePart:', error);
        res.status(500).json({ error: error.message || "Internal server error" });
      }
    }
}
  
module.exports = PartController;