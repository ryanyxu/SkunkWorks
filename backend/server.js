const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const projectsRouter = require('./routes/projects');
const profilesRouter = require('./routes/profiles')
app.use('/projects', projectsRouter);
app.use('/profiles', profilesRouter);

//For avoidong Heroku $PORT error
app.listen(port, () => {
    console.log('App is running, server is listening on port ' + port);
});