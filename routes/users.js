import express from 'express';

import { signin, signup } from '../controllers/user.js';

const router = express.Router();

// Reached by going to /posts from index.

router.post('/signin', signin); // we have to send the data from the form to the backend
router.post('/signup', signup); 

export default router;