const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const {
  Report0,
  Report1,
  Report2,
  Report3,
  Report4,
  Report5,
  Report6,
  Report7,
  Report8,
} = require("../controllers/reportController");

router.route("/Report0Data").get(isAuthenticatedUser, Report0);
router.route("/Report1Data").get(isAuthenticatedUser, Report1);
router.route("/Report2Data").get(isAuthenticatedUser, Report2);
router.route("/Report3Data").get(isAuthenticatedUser, Report3);
router.route("/Report4Data").get(isAuthenticatedUser, Report4);
router.route("/Report5Data").get(isAuthenticatedUser, Report5);
router.route("/Report6Data").get(isAuthenticatedUser, Report6);
router.route("/Report7Data").get(isAuthenticatedUser, Report7);
router.route("/Report8Data").get(isAuthenticatedUser, Report8);

module.exports = router;
