// pages/index.js

import withLayout from '../comps/Layout';
import React, { useState } from 'react';
import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText} from 'reactstrap';

import '../style.css';

const Home = () => (
    <div>
        <IntroDisplay/>
        <ProjectDisplay/>
        <SignUp/>
    </div>
);


const IntroDisplay = (props) => {
    return (
        <div className="d-flex justify-content-center intro-display">
            <Jumbotron>
                <h1 className="display-3">SkunkWorks</h1>
                <p className="lead">Start a project.   Join a team.   Build a community.</p>
                <hr className="my-2"/>
                <p>Work on something you're proud of.</p>
                <p className="lead">
                    <Button color="primary">Join Us</Button>
                </p>
            </Jumbotron>
        </div>
    );
};
  

class ProjectDisplay extends React.Component {
    render() {
        return (
            <div className="project-display parallax">
                <div className="header">Current Projects</div>
                <Row>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                    <Col className="col-12 col-lg-4 col-md-6 col-sm-12 col-xs-12"><Project/></Col>
                </Row>
            </div>
        );
    }
}

function Project(props) {
    return (
        <div>
            <Card className="project">
                <CardImg top width="100%" src="https://cities4people.eu/wp-content/uploads/2017/11/cities4people-logo-plain-2-1024x972.jpg" alt="Card image cap" />
                <CardBody>
                <CardTitle>Project Title</CardTitle>
                <CardText>Description of how amazing project is</CardText>
                <Button>Learn More</Button>
                </CardBody>
            </Card>
        </div>
    );
}

const SignUp = (props) => {
    return (
        <div className="form-display">
            <h1 className="header">Join Us</h1>
            <Form className="sign-up">
                <FormGroup>
                <Label for="exampleText">Name</Label>
                <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                />
                </FormGroup>
                <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                />
                </FormGroup>
                <FormGroup>
                <Label for="exampleSelect">Interested in:</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option></option>
                    <option>Creating a project</option>
                    <option>Joining a project</option>
                    <option>Other</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Label for="exampleSelect">Role</Label>
                <Input type="select" name="select" id="exampleSelect">
                    <option></option>
                    <option>Project Manager</option>
                    <option>Developer</option>
                    <option>Designer</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Label for="exampleText">Let us know about you!</Label>
                <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                <Label for="exampleFile">Attatch Resume</Label>
                <Input type="file" name="file" id="exampleFile" />
                <FormText color="muted">
                    Completely optional
                </FormText>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    );
  }

//export default withLayout(Home);
export default Home;

