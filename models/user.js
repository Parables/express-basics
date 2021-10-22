import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String
});

export const User =model('users', userSchema);
