import express from "express";
import { deletePost, getAllPosts, getMedia, newPost } from "../controllers/post.js";
import multer from "multer";
import crypto from 'crypto'
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/'); // Store uploads in the 'uploads' directory
    },
    filename: (req, file, cb) => {
      // Generate a unique filename with a timestamp and random characters
      crypto.randomBytes(16, (err, buf) => {
        if (err) return cb(err); 
        const filename = buf.toString('hex') + path.extname(file.originalname);
        cb(null, filename);
      });
    },
  });
  
const upload = multer({ storage });

const router = express.Router()

router.post('/newPost', upload.single('file'), newPost)

router.get('/getAllPosts', getAllPosts)

router.get('/getMedia/:id', getMedia)

router.delete('/delete/:id', deletePost)

export default router