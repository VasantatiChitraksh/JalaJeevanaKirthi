import mongoose from "mongoose";

const marineDbConnection = mongoose.createConnection('mongodb+srv://jjkweb:ug2team3@cluster0.b3naz.mongodb.net/MarineData', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const FishSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    origin: { type: String, required: true },
    status: { type: String, required: true },
    habitat: { type: String, required: true },
    shortage: { type: String },
    fact: { type: String }
});

const FishModel = marineDbConnection.model("fishes", FishSchema);

export { FishModel as Fish };
