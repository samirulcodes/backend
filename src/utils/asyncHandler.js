// 1. using Promises

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
    }
}


export { asyncHandler }





// HIGH ORDER FUNCTION STEPS-->
// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}

// 2. using try catch
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }




// EXPLANATION
// 1.
// What it does:
// Input: You provide it with a requestHandler, which is the function that handles an incoming request.
// Output: It returns a new function that wraps your requestHandler in a promise.

// How it works:
// a.Normal Route Handler: Normally, when you write an async route handler in Express, you need to manually wrap it in a try-catch block to handle errors. This is because if something goes wrong in an async function, Express won’t automatically catch that error.

// b.With asyncHandler:
// Instead of manually wrapping your handler in try-catch, you use asyncHandler to handle it for you.
// The asyncHandler function calls your requestHandler and wraps it in a Promise.resolve() to ensure that even if the function returns a promise, any errors will be caught.
// If an error occurs, it gets passed to the next(err) function, which triggers Express’s built-in error handling mechanism.