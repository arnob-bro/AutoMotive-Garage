const express = require("express");
const verifyAccessToken = require('../middlewares/verifyAccessToken');

function createContactRouter(contactController) {
  const router = express.Router();

  router.post("/", contactController.makeInquiry);
  router.get("/", contactController.getInquiries);
  router.post("/:contactform_id/reply", verifyAccessToken, contactController.replyToInquiry);
  router.get("/:contactform_id/reply",  contactController.getReplyByContactFormId);
  

  return router;
}

module.exports = createContactRouter;
