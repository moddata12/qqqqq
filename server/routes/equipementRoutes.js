const express = require("express");
const {
  isAuthenticatedUser,
  authorizeRoles,
} = require("../middlewares/authenticate");
const {
  newEquipment,
  getEquipments,
  getEquipment,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipmentController");
const router = express.Router();

router.route("/equipments").get(isAuthenticatedUser, getEquipments);
router
  .route("/admin/equipment/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newEquipment);
router
  .route("/admin/equipment/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getEquipment)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateEquipment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEquipment);

module.exports = router;
