// middlewares/error.middleware.js

// It is used to sending responses to  the client.
export const globalErrorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);
  
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      status: "error",
      message,
    });
  };
  