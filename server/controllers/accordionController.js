const { MetersModel } = require("../models/meterModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

exports.Accordion = catchAsyncError(async (req, res, next) => {
  try {
    // Define startTime (can be passed in the request or defined elsewhere)
    const startTime = req.query.startTime || new Date(); // If not provided, use the current time

    // Fetch the latest measurements from the database
    const [measurements2, measurements1] = await Promise.all([
      MetersModel.find({ mid: 2 }).sort({ datetime: -1 }).limit(1),
      MetersModel.find({
        mid: 1,
        voltage: { $ne: 0 }, // Find where voltage is not equal to 0
        datetime: { $lt: startTime },
      }).limit(1),
    ]);

    // If no measurements found for one or both of the meters, return a detailed error
    if (!measurements2.length) {
      return next(
        new ErrorHandler("No measurements found for meter with mid: 2", 404)
      );
    }

    if (!measurements1.length) {
      return next(
        new ErrorHandler("No measurements found for meter with mid: 1", 404)
      );
    }

    // Get the last updated datetime for both meters
    const lastUpdated2 = measurements2[0].datetime;
    let lastUpdated1 = measurements1[0].datetime;

    // If voltage or current of EB Incomer (meter with mid: 1) is 0, update the last updated time
    if (measurements1[0].voltage === 0 || measurements1[0].current === 0) {
      lastUpdated1 = new Date().toISOString(); // Set the current time
    }

    // Calculate the total time difference between the two meters
    const totalTimeDifference2_1 = Math.abs(
      new Date(lastUpdated2) - new Date(lastUpdated1)
    );

    // Send the response with the data
    res.json({
      success: true,
      lastUpdatedMid2: lastUpdated2,
      lastUpdatedMid1: lastUpdated1,
      totalTimeDifference2_1,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal server error", 500));
  }
});
