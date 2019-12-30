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
import ProjectDisplay from './Projects';
import Header from '../comps/Header';
 
/**
 * TODO in future:
 * make project and usernames unique so that urls look prettier
 */

 //displays home page
const Home = () => (
    <div> 
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
        scroll.scrollToBottom();
        //window.scrollHeight
        //window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
    return (
        <div id="home-background">
            <div id="home">
                <Header/>
                <div className="d-flex justify-content-center" >
                    <Jumbotron id="home-jumbotron">
                        <h1 className="display-3">SkunkWorks</h1>
                        <p className="lead">Start a project.   Join a team.   Build a community.</p>
                        <hr className="my-2"/>
                        <br></br>
                        <p>Work on something you're proud of.</p>
                    </Jumbotron>
                </div>
                    <Collapse isOpen={!isOpen}>
                        <div className="d-flex justify-content-center">
                            <Button outline color="light" size="lg" id="open-project-btn" onClick={toggle}>View Projects</Button>
                        </div>
                    </Collapse>
                    <Collapse isOpen={isOpen}>
                        <div className="arrow bounce d-flex justify-content-center" onClick={scrollDown}></div>
                    </Collapse>
            </div>
            <Collapse isOpen={isOpen}>
                <div id="whitespace">Projects</div>
                <ProjectDisplay/>
            </Collapse>
        </div>
    );
};


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

