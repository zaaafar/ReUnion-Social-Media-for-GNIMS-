// import mongoose from "mongoose";
// const commentSchema = new mongoose.Schema({
//     text:{type:String, required:true},
//     author:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
//     post:{type:mongoose.Schema.Types.ObjectId, ref:'Post', required:true}
// });
// export default commentSchema = mongoose.model('Comment', commentSchema); 


import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }
});

// Create the model separately and export it directly
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
