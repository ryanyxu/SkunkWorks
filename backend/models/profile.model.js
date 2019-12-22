const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileProjectSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    role: {
        type: String,
    },
    contribution: {
        type: String,
    }
});

//possibly add usernames in future
const profileSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    projects: {
        type: [profileProjectSchema],
    },
},{
    timestamps: true,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;

//have not yet worked on getting people on multiple teams to work
