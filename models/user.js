import mongoose from 'mongoose';

const userSchema = mongoose.Schema({ // structure for each of the posts in our website
    name: {type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },

});

const User = mongoose.model('User', userSchema);

export default User;