import Post from '../models/post.js'
import mongoose from 'mongoose';


export const newPost = async (req, res) => {
    const { content, userPosted, userId  } = req.body;
    
    console.log(req.file)
    const postInfo = {
        filename: req.file?.filename ,
        contentType: req.file?.mimetype,
        content,
        userPosted,
        userId
      };
    const post = new Post(postInfo)
    try {
        await post.save()
        res.status(200).json({message: 'Posted Successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getMedia = async(req, res) => {
    try {
        const {id} = req.params
        res.sendFile(`/uploads/${id}`,{ root: '.' })
      } catch (error) {
        res.json({message: error.message})
      }
}

export const deletePost = async(req, res) => {
    const {id: _id} = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("post unavailable...");
    }
    try {
        await Post.findByIdAndRemove(_id)
        res.status(200).json({message: 'Deleted Successfully'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}