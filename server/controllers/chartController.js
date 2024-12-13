const { MetersModel } = require("../models/meterModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

// Linechart Data & Barchart Data
exports.linechartdata = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 1 })
      .sort({ datetime: -1 })
      .limit(20);
    if (!measurements || measurements.length === 0) {
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});

// Doughnut Chart Data
exports.doughnutchartdata = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 1 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements[0].measurements); // Return only the latest measurements
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});
