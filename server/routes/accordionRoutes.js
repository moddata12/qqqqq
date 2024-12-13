const express = require("express");
const router = express.Router();
const { Accordion } = require("../controllers/accordionController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/totalTimeDifference").get(isAuthenticatedUser, Accordion);

module.exports = router;
