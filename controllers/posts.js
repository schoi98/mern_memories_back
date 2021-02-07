// We put the controller logic for the posts from routes here to simplify
import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';
import router from '../routes/users.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find(); // this is an asychronous action

        // console.log(postMessages);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res) => { // creating posts
    const post = req.body; // our post

    const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

    try {
        // try creatin new opo
        await newPost.save();
        res.status(201).json(newPost); // learn http code
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params; // in the format /posts/123, 123 is the id and will fill the { id } variable
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export default router;