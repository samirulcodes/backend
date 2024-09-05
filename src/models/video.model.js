import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String, 
            required: true
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    // createdAt,updatedAt
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)







// EXPLANATION


// This code defines a video data model using Mongoose, which is a library that helps work with MongoDB (a database). It represents video records and specifies how they are structured in the database. Let me explain it step by step in simple terms:

// Breakdown:

// Imports:
// mongoose, { Schema }: These are from the Mongoose library. mongoose is used to interact with MongoDB, and Schema is used to define the structure (or blueprint) of your data (in this case, a video).
// mongoose-aggregate-paginate-v2: This is a plugin that helps paginate large sets of data when querying the database (for example, showing videos page by page).

// videoSchema Definition:
// This is where you define how a video is stored in the database. Each video will have the following fields:

// videoFile: A string representing the URL of the video file (probably stored in Cloudinary). It's required.
// thumbnail: A string representing the URL of the video thumbnail (also probably stored in Cloudinary). It's required.
// title: A string for the video's title. It's required.
// description: A string describing the video. It's required.
// duration: A number representing how long the video is (in seconds or minutes). It's required.
// views: A number representing how many views the video has. It starts at 0 by default.
// isPublished: A boolean (true/false) indicating if the video is published or not. It is set to true by default.
// owner: This references a User (another data model) that "owns" the video. It's stored as an ObjectId (a unique identifier for the user in MongoDB).
// timestamps: true:

// This automatically adds two fields to each video: createdAt and updatedAt. These fields store the date and time when the video was created and last updated.
// videoSchema.plugin(mongooseAggregatePaginate):

// This adds pagination functionality to the video model, allowing you to fetch videos in smaller, manageable chunks (e.g., 10 videos at a time) when querying large collections.
// export const Video = mongoose.model("Video", videoSchema):

// This line creates a Mongoose model named "Video" based on the videoSchema. The Video model is what you'll use to interact with the videos collection in MongoDB (e.g., creating, finding, or updating video records).




// Summary:
// This code defines a model for storing video information (like video file, title, description, etc.) in a MongoDB database. It also includes pagination support to make it easier to work with large numbers of videos. This model is later used in your app whenever you need to interact with video data (e.g., uploading a new video or fetching a list of videos).