const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    technologies: {
        type: Array,
        required: true,
    },
    members: {
        type: Array,
        required: true,
    },
    longdescription: {
        type: String,
        required: true,
    },
},{
    timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

//have not yet worked on getting people on multiple teams to work
