const express = require("express");
const verifyAccessToken = require('../middlewares/verifyAccessToken');

function createServiceRouter(serviceController) {
  const router = express.Router();

  // Create a new service
  router.post("/create", serviceController.createService);
  
  // Get all services with pagination and filtering
  router.get("/", serviceController.getServices);
  
  // Update a service
  router.put("/:service_id", serviceController.updateService);
  
  // Delete a service (soft delete)
  router.delete("/:service_id", serviceController.deleteService);

  return router;
}

module.exports = createServiceRouter;