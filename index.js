  import express from 'express';
  import bodyParser from 'body-parser';
  import mongoose from 'mongoose';
  import cors from 'cors';
  import dotenv from 'dotenv';

  import postRoutes from './routes/posts.js';
  import userRoutes from './routes/users.js';
  // no need for const 

  const app = express(); //initialize app
  dotenv.config();

  app.use(bodyParser.json({ limit: "30mb", extended: true}));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
  app.use(cors());


  app.use('/posts', postRoutes); // starting path for all starting routes every route ins postRoutes starts in /posts
  app.use('/user', userRoutes);

  app.get('/', (req, res) => {
    res.send('Hello to Memories API');
  });
  // Use mongodb for database
  // Unsafe to put it here store somewhere else later on -> environment variables.

  const PORT = process.env.PORT || 5000; // heroku will populate process.env.PORT

  mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then (() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
  mongoose.set('useFindAndModify', false);