const bcrypt = require("bcrypt");


class ServiceController {
    constructor(serviceService) {
      this.serviceService = serviceService;
  
      // Bind methods so 'this' works in routes
      this.createService = this.createService.bind(this);
      this.getServices = this.getServices.bind(this);
      this.updateService = this.updateService.bind(this);
    }
  
    async createService(req, res) {
      try {
        const {name, description, price, duration, status} = req.body;
        
        // check if all fields are provided
        if (!name || !description || !price || !duration || !status) {
          return res.status(400).json({error: "All fields are required"});
        }
        
        // check if name is a valid name
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
          return res.status(400).json({ error: "Invalid name" });
        }
          // Validate price
        if (price !== undefined && !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
            return res.status(400).json({ message: "Invalid price. Must be a number with up to 2 decimals." });
        }

        // Validate duration
        if (duration && !/^(\d+)\s?(min|minutes|hour|hours|h|m)$/i.test(duration)) {
            return res.status(400).json({ message: "Invalid duration. Use formats like '30 min', '2 hours', '1h'." });
        }

        // Validate is_active
        if (status !== undefined && typeof status !== "string") {
            return res.status(400).json({ message: "Invalid status. Must be a string." });
        }

        // Description is optional, just limit length
        if (description && description.length > 500) {
            return res.status(400).json({ message: "Description too long (max 500 chars)." });
        }

        // check if user already exists
        const serviceExists = await this.serviceService.getServiceByName(name);
        if (serviceExists) {
          return res.status(400).json({error: "Service already exists"});
        } 
        const serviceCreation = await this.serviceService.createService({name, description, price, duration, status});
        res.status(201).json({success: true, message: "Service created successfully", service: serviceCreation});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    }

    async getServices(req, res) {
        try {
          const services = await this.serviceService.getServices();
          res.json(services);
        } catch (error) {
          res.status(500).json({success: false, error: error.message });
        }
      }

    
      async updateService(req, res) {
        try {

          const {
            name,
            description,
            price,
            duration,
            status 
          } = req.body;

          const { service_id } = req.params;

          // check if all fields are provided

          // check if all fields are provided
        if (!name || !description || !price || !duration || !status) {
            return res.status(400).json({error: "All fields are required"});
          }


        // check if name is a valid name
        if (!/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(name)) {
            return res.status(400).json({ error: "Invalid name" });
        }
            // Validate price
        if (price !== undefined && !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
            return res.status(400).json({ message: "Invalid price. Must be a number with up to 2 decimals." });
        }
  
        // Validate duration
        if (duration && !/^(\d+)\s?(min|minutes|hour|hours|h|m)$/i.test(duration)) {
            return res.status(400).json({ message: "Invalid duration. Use formats like '30 min', '2 hours', '1h'." });
        }
  
        // Validate is_active
        if (status !== undefined && typeof status !== "string") {
            return res.status(400).json({ message: "Invalid status. Must be a string." });
        }
  
        // Description is optional, just limit length
        if (description && description.length > 500) {
            return res.status(400).json({ message: "Description too long (max 500 chars)." });
        }

        const updatedService = await this.serviceService.updateService({service_id, name,description,price,duration,status});
          
        if (!updatedService) {
            return res.status(404).json({ error: "Service not found" });
        }
          
        res.json({success: true, service: updatedService});
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    
      
}
  
  module.exports = ServiceController;
  