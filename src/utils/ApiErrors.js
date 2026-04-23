// Create a custom error class that extends the built-in Error class
class ApiErrors extends Error {
  // Constructor is called when a new ApiErrors object is created
  constructor(
    statusCode, // HTTP status code (e.g., 404, 500)
    message = "Something went wrong", // Default error message if none is provided
    errors = [], // Optional array to store multiple error details
    stack = "" // Optional custom stack trace
  ) {
    // Call the parent (Error class) constructor with the message
    super(message);

    // Store the HTTP status code in the object
    this.statusCode = statusCode;

    // Placeholder for additional data (kept null for now)
    this.data = null;

    // Store additional error details (useful for validation errors, etc.)
    this.errors = errors;

    // If a custom stack trace is provided, use it
    if (stack) {
      this.stack = stack;
    } else {
      // Otherwise, automatically capture the stack trace
      // This helps in debugging (shows where the error occurred)
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export this class so it can be used in other files/modules
export { ApiErrors };
