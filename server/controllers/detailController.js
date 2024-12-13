const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Detail = require("../models/detailModel");

exports.newDetail = catchAsyncError(async (req, res, next) => {
  const detail = await Detail.create(req.body);
  if (!detail) {
    return next(new ErrorHandler("Error creating detail", 500));
  }

  res.status(201).json({
    success: true,
    detail,
  });
});

// Get all Details
exports.getDetails = catchAsyncError(async (req, res, next) => {
  const details = await Detail.find();
  if (!details) {
    return next(new ErrorHandler("Error fetching details", 500));
  }

  res.status(200).json({
    success: true,
    details,
  });
});

//Admin: Get Specific Detail - api/v1/admin/detail/:id
exports.getDetail = catchAsyncError(async (req, res, next) => {
  const detail = await Detail.findById(req.params.id);
  if (!detail) {
    return next(
      new ErrorHandler(`Detail not found with this id ${req.params.id}`)
    );
  }
  res.status(200).json({
    success: true,
    detail,
  });
});

// Update Detail
exports.updateDetail = catchAsyncError(async (req, res, next) => {
  const detail = await Detail.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!detail) {
    return next(new ErrorHandler("Detail not found", 404));
  }

  res.status(200).json({
    success: true,
    detail,
  });
});

// Delete Detail
exports.deleteDetail = catchAsyncError(async (req, res, next) => {
  const detail = await Detail.findById(req.params.id);
  if (!detail) {
    return next(new ErrorHandler("Detail not found", 404));
  }

  await detail.deleteOne();
  res.status(200).json({
    success: true,
    message: "Detail deleted successfully",
  });
});
