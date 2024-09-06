import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true // for enabling the searching field in DB, make index true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    // createdAt,updatedAt
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        // payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)


// bcrypt---> A library to help you hash pasword
// jwt---> jwt is a bearer token(token jiske bhi pass hai too data user ko send kr dega)





// EXPLANATION

// This code defines a User model using Mongoose, which helps manage user data in a MongoDB database. Here's a simple explanation:

// 1. Defining the User Schema:
// userSchema: This structure outlines the fields (or properties) of a user document in the database.
// username: A required, unique, lowercase, and trimmed string that acts as the user's name.
// email: A required, unique, lowercase, and trimmed string representing the user's email.
// fullName: A required, trimmed string for the user's full name.
// avatar: A required string to store the URL of the user's profile picture.
// coverImage: An optional string to store a URL for the user's cover photo.
// watchHistory: A list of references (Object IDs) to the Video model. It keeps track of what videos the user has watched.
// password: A required string that stores the user's password.
// refreshToken: A string used to store the user's refresh token for extended authentication sessions.
// timestamps: Mongoose automatically adds createdAt and updatedAt fields to track when the user document was created and updated.

// 2. Password Hashing:
// Before saving a user to the database, the pre("save") middleware is run. It checks if the password field has been modified. If it has, the password is encrypted (hashed) using bcrypt to protect it. This happens before the user data is saved to the database.

// 3. Password Validation:
// isPasswordCorrect: This method compares the user's inputted password to the hashed password in the database to check if they match (using bcrypt).

// 4. Generating Tokens:
// generateAccessToken: This method creates an access token (a short-term token for authentication) for the user using JSON Web Token (JWT). The token includes the user's ID, email, username, and full name.
// generateRefreshToken: This method generates a refresh token (a long-term token for authentication renewal) that includes just the user's ID.
// Both tokens are signed using secret keys stored in environment variables (process.env.ACCESS_TOKEN_SECRET and process.env.REFRESH_TOKEN_SECRET) and have expiry times that are also set in environment variables.


// 5. Exporting the User Model:
// User: Finally, the User model is created from the schema and exported for use in other parts of the application. This allows other parts of the app to interact with the users collection in the database (e.g., creating users, finding them, etc.).

// Summary:
// This code manages user data, ensuring passwords are safely stored, users can log in with correct credentials, and tokens are generated for secure authentication.