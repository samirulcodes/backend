// For Response

class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }





// EXPLANATION

// This code defines a class called ApiResponse that helps structure responses in an API. It standardizes how successful responses are formatted and returned to the client.

// Breakdown:
// class ApiResponse:
// This is the class definition, which will be used to create objects representing API responses.

// constructor:
// The constructor is the function that runs when you create a new ApiResponse object. It takes three parameters:
// statusCode: The HTTP status code (e.g., 200 for success, 404 for "Not Found").
// data: The actual data or result you want to send back (could be user information, a list of items, etc.).
// message: A message describing the response (default is "Success").

// Properties:
// statusCode: Stores the HTTP status code of the response.
// data: Stores the response data (the result or content of the API request).
// message: A descriptive message for the response (default is "Success").
// success: A boolean that is true if the statusCode is less than 400 (which generally means it's a successful response), and false if the statusCode is 400 or higher (which indicates an error).


// Summary:
// The ApiResponse class standardizes the structure of API responses by including the status code, data, message, and a success flag. It makes it easy to ensure that every API response follows a consistent format, whether it's a success or an error.