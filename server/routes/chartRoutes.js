const express = require("express");
const router = express.Router();
const {
  linechartdata,
  doughnutchartdata,
//   barchartdata,
} = require("../controllers/chartController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/measurements").get(isAuthenticatedUser, linechartdata);
router.route("/getLatestMeterData").get(isAuthenticatedUser, doughnutchartdata);
// router.route('/barchart').get(isAuthenticatedUser, barchartdata);

module.exports = router;
