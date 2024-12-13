const express = require("express");
const router = express.Router();
const {
  Card0,
  Card1,
  Card2,
  Card3,
  Card4,
  Card5,
  Card6,
  Card7,
  Card8,
} = require("../controllers/cardController");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/getCard0").get(isAuthenticatedUser, Card0);
router.route("/getCard1").get(isAuthenticatedUser, Card1);
router.route("/getCard2").get(isAuthenticatedUser, Card2);
router.route("/getCard3").get(isAuthenticatedUser, Card3);
router.route("/getCard4").get(isAuthenticatedUser, Card4);
router.route("/getCard5").get(isAuthenticatedUser, Card5);
router.route("/getCard6").get(isAuthenticatedUser, Card6);
router.route("/getCard7").get(isAuthenticatedUser, Card7);
router.route("/getCard8").get(isAuthenticatedUser, Card8);

module.exports = router;
