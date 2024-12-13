const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Equipment = require("../models/equipmentModel");

exports.newEquipment = catchAsyncError(async (req, res, next) => {
  const equipment = await Equipment.create(req.body);
  if (!equipment) {
    return next(new ErrorHandler("Error creating equipment", 500));
  }

  res.status(201).json({
    success: true,
    equipment,
  });
});

// Get all Equipments
exports.getEquipments = catchAsyncError(async (req, res, next) => {
  const equipments = await Equipment.find();
  if (!equipments) {
    return next(new ErrorHandler("Error fetching equipments", 500));
  }

  res.status(200).json({
    success: true,
    equipments,
  });
});

//Admin: Get Specific Equipment - api/v1/admin/equipment/:id
exports.getEquipment = catchAsyncError(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);
  if (!equipment) {
    return next(
      new ErrorHandler(`Equipment not found with this id ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    equipment,
  });
});

// Update Equipment
exports.updateEquipment = catchAsyncError(async (req, res, next) => {
  const equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!equipment) {
    return next(new ErrorHandler("Equipment not found", 404));
  }

  res.status(200).json({
    success: true,
    equipment,
  });
});

// Delete Equipment
exports.deleteEquipment = catchAsyncError(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.id);
  if (!equipment) {
    return next(new ErrorHandler("Equipment not found", 404));
  }

  await equipment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Equipment deleted successfully",
  });
});
