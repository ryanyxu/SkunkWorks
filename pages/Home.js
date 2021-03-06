// pages/index.js

import withLayout from '../comps/Layout';
import React, { useState , useEffect } from 'react';
import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText, Collapse, Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText, } from 'reactstrap';
import Link from 'next/link';
import '../style.css';
import Axios from 'axios';
import Header from '../comps/Header';
 
/**
 * TODO in future:
 * make project and usernames unique so that urls look prettier
 */

 //displays home page
const Home = () => (
    <div className="lead"> 
        <IntroDisplay/>
    </div>
); //<SignUp/>

//displays intro screen with jumbotron and description
const IntroDisplay = () => {

    //for collapse
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(true);
        scrollDown();
    }

    function scrollDown(props) {

        var Scroll = require('react-scroll');
        var scroll = Scroll.animateScroll;
        scroll.scrollTo(document.getElementById("home-background").getBoundingClientRect().bottom);
        //window.scrollHeight
        //window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
    return (
        <>
        <div id="home-background">
            <Header/>
            <div className="d-flex justify-content-center" >
                <div id="home-jumbotron">
                    <h1 id="home-jumbotron-title" className="display-3">SkunkWorks</h1>
                    <p id="" className="home-jumbotron-text">Build something you're proud of</p>
                </div>
            </div>
            <Collapse isOpen={!isOpen}>
                <div className="d-flex justify-content-center">
                    <Button className="project-btn" size="lg" onClick={toggle}>View Projects</Button>
                </div>
            </Collapse>
            <Collapse isOpen={isOpen}>
                <div className="d-flex justify-content-center arrow bounce" onClick={scrollDown}></div>
            </Collapse>
        </div>
        <Collapse isOpen={isOpen}>
            <div id="whitespace">Projects</div>
            <ProjectDisplay/>
        </Collapse>
        </>
    );
};

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
            await Axios.get('/projects/')
            .then(response => {
                return response.data.map(project => new Object({ //possibly make project object later
                        id: project._id,
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
        const lift = () => {
            let project = document.getElementById(props.project.id + "-card");
            if (project){
                project.classList.toggle("card-shadow");
            }
        }

        return (
            <div>
                <Link href={'/Project?id=' + props.project.id}>
                    <Card className="project-card" id={props.project.id + "-card"} onMouseEnter={lift} onMouseLeave={lift}>
                        <CardImg top width="100%" src={props.project.image} />
                        <CardBody>
                        <CardTitle>{props.project.name}</CardTitle>
                        </CardBody>
                    </Card>
                </Link>
            </div>
        );
    }

    //so people on other servers can see
    /*
    var mockProject = (id) => {
        return {
            id: id,
            name: "Mock Project",
            description: "So people on other servers can see what it looks like.",
            image: "https://www.netclipart.com/pp/m/179-1791305_1-6-meet-schedule-mark-your-calendar-icon.png",
        }
    }
    */

    return (
        <div className="project-display">
            <Row>
                {
                    !projects ? <></> :
                    projects.map(project => {
                        return(<Col className="col-6 col-lg-4">
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

export default Home;

