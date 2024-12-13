const { MetersModel } = require("../models/meterModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
//Grid3

exports.Grid3 = catchAsyncError(async (req, res, next) => {
  try {
    const currentDate = new Date();
    const previousMonth =
      currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
    const previousYear =
      previousMonth === 12
        ? currentDate.getFullYear() - 1
        : currentDate.getFullYear();

    // Aggregate query to find the maximum power consumption for the previous month
    const maxPowerData = await MetersModel.aggregate([
      {
        $match: {
          mid: 1, // Assuming mid is the meter ID
          datetime: {
            $gte: new Date(previousYear, previousMonth - 1, 1),
            $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
          },
        },
      },
      {
        $unwind: "$measurements", // Unwind the measurements array
      },
      {
        $group: {
          _id: null,
          max_power: { $max: "$measurements.activepower" }, // Assuming you want to use activepower, change if necessary
        },
      },
    ]);

    // Send the max power data as JSON response
    res.json(maxPowerData);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Grid4

exports.Grid4 = catchAsyncError(async (req, res, next) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
    const currentYear = currentDate.getFullYear();

    // Aggregate query to find the maximum power consumption for the current month
    const maxPowerData = await MetersModel.aggregate([
      {
        $match: {
          mid: 1, // Assuming mid is the meter ID
          datetime: {
            $gte: new Date(currentYear, currentMonth, 1), // Start of current month
            $lt: new Date(currentYear, currentMonth + 1, 1), // Start of next month
          },
        },
      },
      {
        $unwind: "$measurements", // Unwind the measurements array
      },
      {
        $group: {
          _id: null,
          max_power: { $max: "$measurements.activepower" }, // Assuming you want to use activepower, change if necessary
        },
      },
    ]);

    // Send the max power data as JSON response
    res.json(maxPowerData);
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});
