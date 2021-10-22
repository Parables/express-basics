//1. import the express package
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/user.js';

// dotenv needs to be configure first before using it anywhere
dotenv.config();

//2. create an instance of an express server
const app = express();
app.use(express.json());

// creating a route
app.get('/', (req, res) => {
    return res.send('Hello World');
});

// a route to fwtch all users in our database
app.get('/users', async (req, res) => {
    const allUsers = await User.find({});
    return res.json(allUsers);
})

app.post('/users', async (req, res) => {
    const newUser = await User.create({ ...req.body });
    return res.json(newUser);
})

app.patch('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { ...req.body });
    return res.json(updatedUser);
})

app.delete('/users/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) { return res.send('User was deleted'); }
    else { return res.send('User not found'); }
})

//5. Connect mongoose to mongoDB
mongoose.connect(process.env.CONSTRING, (error) => {
    if (error) {
        console.log('something is wrong', error);
    }
    console.log('Connection to MongoDB is successful')
});

//3. listen for incoming requsests
app.listen(process.env.PORT, () => console.log('Server is up and running'));
