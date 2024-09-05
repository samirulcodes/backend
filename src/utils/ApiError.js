// Error Handling
class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.errors = errors

        // not mandatory--> we can ignore also
        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}





// EXPLANATION

// This code defines a custom error class called ApiError that helps manage errors in a more detailed and structured way for APIs. It extends the built-in JavaScript Error class, which is commonly used for handling errors.

// 1.class ApiError extends Error:
// The ApiError class inherits from the base Error class, meaning it has all the properties and behaviors of a regular error but adds some extra functionality.

// 2.constructor:

// This is the function that runs when you create a new instance of the ApiError class.

// It takes four parameters:
// statusCode: The HTTP status code related to the error (e.g., 404 for "Not Found", 500 for "Server Error").
// message: A custom error message (default is "Something went wrong").
// errors: An array to store multiple errors (optional, default is an empty array).
// stack: Information about where the error occurred (optional)

// 3.super(message):

// Calls the parent Error class constructor with the message, so that the ApiError inherits the standard behavior of an error, including the message.

// 4.Custom properties:

// statusCode: Stores the HTTP status code for the error.
// data: A placeholder for additional data that might be added later (default is null).
// message: The error message (this is already handled by the parent Error class, but it's stored again here for clarity).
// success: A boolean flag indicating the operation failed (false).
// errors: Stores any additional error details (an array).

// 5.stack:

// If a stack is provided when creating the error, it uses that stack trace. Otherwise, it automatically captures the stack trace using Error.captureStackTrace. This helps in debugging by showing where the error occurred.


// Summary:
// The ApiError class provides a structured way to handle API errors. It allows you to specify an HTTP status code, a message, optional error details, and a stack trace for better debugging. This makes error handling in APIs clearer and more informative.