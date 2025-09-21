const express = require("express");
const verifyAccessToken = require('../middlewares/verifyAccessToken');

function createBookingRouter(bookingController) {
  const router = express.Router();

  router.post('/', bookingController.createBooking);
  router.get('/', bookingController.getBookings);
  router.get('/:booking_id', bookingController.getBookingById);
  router.put('/:booking_id/status', bookingController.updateBookingStatus);
  router.put('/:booking_id/payment-status', bookingController.updateBookingPaymentStatus);
  

  return router;
}

module.exports = createBookingRouter;
