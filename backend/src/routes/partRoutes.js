const express = require("express");
const verifyAccessToken = require('../middlewares/verifyAccessToken');

function createPartRouter(partController) {
  const router = express.Router();

  // Create a new service
  router.post("/create", partController.createPart);
  router.get("/", partController.getParts);
  router.put("/:part_id", partController.updatePart);
  router.delete("/:part_id", partController.deletePart);

  return router;
}

module.exports = createPartRouter;