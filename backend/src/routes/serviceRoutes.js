const express = require("express");
const verifyAccessToken = require('../middlewares/verifyAccessToken');

function createServiceRouter(serviceController) {
  const router = express.Router();

  router.post("/create", serviceController.createService);
  router.get("/", serviceController.getServices);
  router.put("/:service_id", serviceController.updateService);

  return router;
}

module.exports = createServiceRouter;
