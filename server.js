const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;


connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})
const projectsRouter = require('./backend/routes/projects');
const profilesRouter = require('./backend/routes/profiles')
app.use('/projects', projectsRouter);
app.use('/profiles', profilesRouter);


//For avoidong Heroku $PORT error
app.listen(port, () => {
    console.log('App is running, server is listening on port ' + port);
});

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
//app.use(express.static(path.join(__dirname, 'client/build')));
if(process.env.NODE_ENV === 'production') {  app.use(express.static(path.join(__dirname, 'client/build')));  //  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })}
//build modeapp.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/client/public/index.html'));})
//start serverapp.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})