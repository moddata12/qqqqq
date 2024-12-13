const { MetersModel } = require("../models/meterModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");

//Report0

// Route to initially fetch all data from the table
exports.Report0 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 1 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report1

exports.Report1 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 2 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report2 Start

exports.Report2 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 3 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report3 Start

exports.Report3 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 4 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report4 Start

exports.Report4 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 5 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report 5 start

exports.Report5 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 6 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report6 Start

exports.Report6 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 7 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report7 start

exports.Report7 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 8 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});

//Report8 start

exports.Report8 = catchAsyncError(async (req, res, next) => {
  try {
    // Query all documents from the database, sorted by datetime
    const allDocuments = await MetersModel.find({ mid: 9 }).sort({
      datetime: -1,
    });

    // Process each document
    // allDocuments.forEach(document => {
    //   // Perform operations on each document here
    //   console.log(document);
    // });

    res.status(200).json({
      success: true,
      allDocuments,
    }); // Sending all documents as response
  } catch (error) {
    // console.error(error);
    // res.status(500).json({ message: 'Internal Server Error' });
    return next(new ErrorHandler("Internal server error", 500));
  }
});
