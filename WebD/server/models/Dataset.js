import mongoose, { mongo } from "mongoose"

const DatasetSchema = new mongoose.Schema({
    url: { type: String, required: true},
    username: {type: String, required: true,},
    date: {type: Date, required: true},
    title: {type: String, required: true},
    description: {type: String, required: false},
})

const DatasetModel = mongoose.model("Dataset", DatasetSchema);

export {DatasetModel as Dataset}