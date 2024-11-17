import mongoose from "mongoose";


const FishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    origin: { type: String, required: true },
    status: { type: String, required: true },
    habitat: { type: String, required: true },
    shortage: { type: String },
    fact: { type: String },
    points: {type : Number},
});

const FishModel = mongoose.model("fishes", FishSchema);

export { FishModel as Fish };
