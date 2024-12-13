const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const { Radardata } = require("../controllers/radarController");

router.route("/maxmonth").get(isAuthenticatedUser, Radardata);

module.exports = router;
