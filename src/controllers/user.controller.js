import {asyncHandler} from "../utils/asyncHandler.js"


const registerUSer=asyncHandler(async (req,res)=>{
    res.status(200).json({message:"ok"})
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res


    // const {fullName, email, username, password } = req.body
    // //console.log("email: ", email);

    // if (
    //     [fullName, email, username, password].some((field) => field?.trim() === "")
    // ) {
    //     throw new ApiError(400, "All fields are required")
    // }

})


export {registerUSer}