const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const {
  newDetail,
  getDetails,
  getDetail,
  updateDetail,
  deleteDetail,
} = require("../controllers/detailController");
const router = express.Router();

router.route("/details").get(isAuthenticatedUser, getDetails);
router
  .route("/admin/detail/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newDetail);
router
  .route("/admin/detail/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getDetail)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateDetail)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDetail);

module.exports = router;
