module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV === "production") {
    let message = err.message;
    let error = new Error(message);

    if (err.name === "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.name === "CastError") {
      message = `Resource not found: ${err.path}`;
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.code === 11000) {
      const duplicateFields = Object.keys(err.keyValue || {}); // Ensure keyValue is defined
      message = `Duplicate ${duplicateFields.join(", ")} error`; // Join the field names into a single string
      error = new Error(message);
      err.statusCode = 400;
    }

    if (err.name === "JSONWebTokenError") {
      let message = `JSON Web Token is invalid. Try again`;
      error = new Error(message);
      err.statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
      let message = `JSON Web Token is expired. Try again`;
      error = new Error(message);
      err.statusCode = 401;
    }

    // Handling email sending errors
    if (err.syscall === "connect" && err.code === "ENETUNREACH") {
      message = `Email sending failed: Unable to reach the email server. Please check your network connection.`;
      error = new Error(message);
      err.statusCode = 503; // Service Unavailable
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
