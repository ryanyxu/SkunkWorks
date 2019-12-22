const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const projectname = req.body.projectname;
    const shortdescription = req.body.shortdescription;
    const longdescription = req.body.longdescription;
    const duration = req.body.longdescription;
    const technologies = req.body.technologies;
    const members = req.body.members;

    const newProject = new Project({
        projectname,
        shortdescription,
        longdescription,
        duration,
        technologies,
        members,
    });

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project deleted.'))
        .catch(err => res.status(400).json('Error ' + err));
});

router.route('/update/:id').post((req, res) => {
    Project.findById(req.params.id)
        .then(project => {
            project.projectname = req.body.projectname;
            project.shortdescription = req.body.shortdescription;
            project.longdescription = req.body.longdescription;
            project.duration = req.body.longdescription;
            project.technologies = req.body.technologies;
            project.members = req.body.members;

            project.save()
                .then(() => res.json('Project updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
});


module.exports = router;
