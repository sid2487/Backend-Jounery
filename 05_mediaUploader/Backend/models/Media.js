import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
});
const Media = mongoose.model("Media", mediaSchema);
export default Media;