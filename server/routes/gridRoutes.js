const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const { Grid3, Grid4 } = require("../controllers/gridController");

router.route("/getPreviousMaxPower").get(isAuthenticatedUser, Grid3);
router.route("/getCurrentMaxPower").get(isAuthenticatedUser, Grid4);

module.exports = router;
