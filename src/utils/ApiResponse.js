class ApiResponse {
    constructor(
        statuscode,
        message = "Success",
        data
    ) {
        this.statuscode = statuscode;
        this.message = message;
        this.success = statuscode < 400;
        this.data = data;
    }
}// Define a class named ApiResponse
class ApiResponse {

    // Constructor is called when a new object is created from this class
    constructor(
        statuscode,          // HTTP status code (e.g., 200, 404, 500)
        message = "Success", // Default message is "Success" if not provided
        data                 // Actual response data (can be anything: object, array, etc.)
    ) {

        // Store the status code in the object
        this.statuscode = statuscode;

        // Store the message in the object
        this.message = message;

        // success will be true if statuscode is less than 400 (means no error)
        // Example: 200 → true, 404 → false
        this.success = statuscode < 400;

        // Store the response data
        this.data = data;
    }
}



export { ApiResponse };