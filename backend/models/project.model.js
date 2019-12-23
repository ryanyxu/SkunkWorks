const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const technologySchema = new Schema({
    technology: {
        type: String,
    },
    image: {
        type: String,
    },
});

const memberSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const projectSchema = new Schema({
    projectname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    shortdescription: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    longdescription: {
        type: String,
        required: true,
    },
    technologies: {
        type: [technologySchema],
        required: true,
    },
    members: {
        type: [memberSchema],
    },
    image: {
        type: String,
    }
},{
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

//have not yet worked on getting people on multiple teams to work
