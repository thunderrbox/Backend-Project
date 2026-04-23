// * we  are using here two approaches for using asyncHandler, one is to create a separate file for asyncHandler and export it, and the other is to create a function in the same file and export it. Both approaches are valid and it depends on the preference of the developer and the structure of the project. In this case, we will go with the first approach and create a separate file for asyncHandler and export it, and we will import it in the files where we need to use it. This way we can keep our code organized and modular, and we can also reuse the asyncHandler function in multiple files without having to duplicate the code.

// * approach 1
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, req, next)).catch((error) => next(error));
    }
}











export { asyncHandler };

    













    
//* approach 2 ---->  Including try & catch block 
    

// *const asyncHandler = () => () => { }
// *we are using a higher order function here, which is a function that returns another function, and we can use this higher order function to wrap our asynchronous route handlers and catch any errors that occur in the route handlers and pass them to the next middleware for error handling. This way we can avoid having to write try-catch blocks in every route handler and we can also ensure that all errors are handled properly in a centralized error handling middleware. This is a common pattern in Express.js applications for handling asynchronous route handlers and ensuring that errors are handled properly.

// * it is just extension of this patter const asyncHandler = () => {() => { }} not much different function . We are passing function in this async function that's why using this pattern.
//* And if by any chance we want to make inner function ASYNC and we can make it by following this pattern ---> const asyncHandler = () => async () => { }

// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal Server Error",
//         })    
//     }
// };