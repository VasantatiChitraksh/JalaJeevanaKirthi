import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true }, 
});


const CommentSchema = new mongoose.Schema({
    user: { type: String, required: true },
    text: { type: String, required: true },
    replies: [ReplySchema]
});

const ForumSchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    comments: [CommentSchema]
});

const ForumModel = mongoose.model("Forum", ForumSchema);

export { ForumModel as Forum };
