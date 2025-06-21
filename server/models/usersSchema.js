import mongoose from "mongoose";


const usersSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    },


}, { timestamps: true })

export const users = new mongoose.model("users", usersSchema)

