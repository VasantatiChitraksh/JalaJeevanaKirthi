import mongoose, { mongo } from "mongoose";

const BlogSchema = new mongoose.Schema({
    user: {type: String, required: true, },
    text: {type: String, required: true},
})

const BlogModel = mongoose.model("Blogs", BlogSchema)

export { BlogModel as Blogs}