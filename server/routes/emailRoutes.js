const express = require("express");
const router = express.Router();
const { mail } = require("../controllers/emailController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/send-email").post(isAuthenticatedUser, mail);

module.exports = router;
