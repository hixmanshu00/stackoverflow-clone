import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    filename : {type: String},
    contentType : {type: String},
    content : {type: String},
    userPosted : {type: String, required: true},
    userId : {type: String, required: true},
    postedOn : {type: Date, default: Date.now}
})

export default mongoose.model('posts',postSchema)