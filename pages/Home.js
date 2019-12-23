// pages/index.js

import withLayout from '../comps/Layout';
import React, { useState , useEffect } from 'react';
import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText} from 'reactstrap';
import Link from 'next/link';
import '../style.css';
import Axios from 'axios';

/**
 * TODO in future:
 * make project and usernames unique so that urls look prettier
 */

 //displays home page
const Home = () => (
    <div>
        <IntroDisplay/>
        <ProjectDisplay/>
        <SignUp/>
    </div>
);

//displays intro screen with jumbotron and description
const IntroDisplay = (props) => {
    function scrollDown(props) {
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
    return (
        <div className="d-flex justify-content-center intro-display">
            <Jumbotron>
                <h1 className="display-3">SkunkWorks</h1>
                <p className="lead">Start a project.   Join a team.   Build a community.</p>
                <hr className="my-2"/>
                <br></br>
                <p>Work on something you're proud of.</p>
                <p className="lead">
                    <Button color="primary" onClick={scrollDown}>Become a Skunkworker</Button>
                </p>
            </Jumbotron>
        </div>
    );
};

//gets projects from db and displays them
const ProjectDisplay = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (projects.length == 0) {
            getProjects();
        }
    });

    //retrieve projects from server
    const getProjects = async () => {
        setProjects(
            await Axios.get('http://localhost:5000/projects/')
            .then(response => {
                return response.data.map(project => new Object({ //possibly make project object later
                        id: project._id.toString(),
                        name: project.projectname,
                        description: project.shortdescription,
                        image: project.image
                    })
                );
            })
        )
    };

    //renders individual project card
    const ProjectCard = (props) => {
        return (
            <div>
                <Card className="project">
                    <CardImg top width="100%" src={props.project.image} />
                    <CardBody>
                    <CardTitle>{props.project.name}</CardTitle>
                    <CardText>{props.project.description}</CardText>
                    <Link href={'/Project?id=' + props.project.id}>
                        <Button>Learn More</Button>
                    </Link>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="project-display parallax">
            <div className="header">Current Projects</div>
            <Row>
                {
                    !projects ? <></> :
                    projects.map(project => {
                        return(<Col className="col-12 col-lg-4 col-md-6">
                            <ProjectCard project={project}/>
                        </Col>);
                    })
                }
            </Row>
        </div>
    );
}

//sign up form
const SignUp = (props) => {
    return (
        <div className="form-display">
            <h1 className="header">Become a SkunkWorker</h1>
            <Form className="sign-up">
                <FormGroup>
                <Label for="exampleText">Name</Label>
                <Input
                    type="text"
                    name="text"
                />
                </FormGroup>
                <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                    type="email"
                    name="email"
                />
                </FormGroup>
                <FormGroup>
                <Label for="exampleSelect">Interested in:</Label>
                <Input type="select" name="select">
                    <option></option>
                    <option>Creating a project</option>
                    <option>Joining a project</option>
                    <option>Other</option>
                </Input>
                </FormGroup>
                <FormGroup>
                <Label for="exampleSelect">Role</Label>
                <Input type="select" name="select">
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

export default withLayout(Home);

