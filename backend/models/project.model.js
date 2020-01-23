const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//put back to technologies if needed
const technologySchema = new Schema({
    technology: {
        type: String,
    },
    image: {
        type: String,
    },
});

const projectSchema = new Schema({
    _id: {
        type: String,
        required: false,
    },
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
    },
    longdescription: {
        type: String,
        required: true,
    },
    technologies: {
        type: Array,
        required: true,
    },
    members: {
        type: [String],
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
