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

router.route("/exportReport0").get(isAuthenticatedUser, Report0);
router.route("/exportReport1").get(isAuthenticatedUser, Report1);
router.route("/exportReport2").get(isAuthenticatedUser, Report2);
router.route("/exportReport3").get(isAuthenticatedUser, Report3);
router.route("/exportReport4").get(isAuthenticatedUser, Report4);
router.route("/exportReport5").get(isAuthenticatedUser, Report5);
router.route("/exportReport6").get(isAuthenticatedUser, Report6);
router.route("/exportReport7").get(isAuthenticatedUser, Report7);
router.route("/exportReport8").get(isAuthenticatedUser, Report8);

module.exports = router;
