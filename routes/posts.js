import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js';

const router = express.Router();

// Reached by going to /posts from index.

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost); // we need the id of the object we are updating
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
export default router;