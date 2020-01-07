const router = require('express').Router();
let Profile= require('../models/profile.model');

//get all people
router.route('/').get((req, res) => {
    Profile.find()
        .then(profiles => res.json(profiles))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add a person
router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const projects = req.body.projects;
    const image = req.body.image;

    const newProfile = new Profile({
        firstname,
        lastname,
        email,
        projects,
        image,
    });

    newProfile.save()
        .then(() => res.json('Profile added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

//get person by id
router.route('/:id').get((req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            res.json(profile)
        })
        .catch(err => res.status(400).json('Error ' + err));
});

//remove person by id
//need to get this to remove person from projects as well
router.route('/:id').delete((req, res) => {
    Profile.findByIdAndDelete(req.params.id)
        .then(() => res.json('Profile deleted.'))
        .catch(err => res.status(400).json('Error ' + err));
});

//update person by id
router.route('/update/:id').post((req, res) => {
    Profile.findById(req.params.id)
        .then(profile => {
            profile.firstname = req.body.firstname;
            profile.lastname = req.body.lastname;
            profile.email = req.body.email;
            profile.projects = req.body.projects;
            profile.image = req.body.image;

            profile.save()
                .then(() => res.json('Profile updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
});

//get person's contributions to a project by person id and proj id
router.route('/:personId/:projectId').get((req, res) => {
    Profile.findById(req.params.personId)
        .then(profile => {
            //res.json(person.projects.id(req.params.projectId));
            res.json(profile.projects.id(req.params.projectId));
        })
        .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;
