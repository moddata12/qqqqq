const { MetersModel } = require("../models/meterModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

//Card0

exports.Card0 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 1 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card1

exports.Card1 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 2 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card2

exports.Card2 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 3 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card3

exports.Card3 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 4 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card4

exports.Card4 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 5 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card5

exports.Card5 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 6 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card6

exports.Card6 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 7 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card7

exports.Card7 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 8 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Card8

exports.Card8 = catchAsyncError(async (req, res, next) => {
  try {
    const measurements = await MetersModel.find({ mid: 9 })
      .sort({ datetime: -1 })
      .limit(1);
    if (!measurements || measurements.length === 0) {
      // return res.status(404).json({ error: "No measurements found" });
      return next(new ErrorHandler("No measurements found", 404));
    }
    res.json(measurements);
  } catch (error) {
    // console.error("Error fetching measurements:", error);
    // res.status(500).json({ error: "Internal server error" });
    return next(new ErrorHandler("Internal server error", 500));
  }
});
