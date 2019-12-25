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
        setIsOpen(!isOpen);
        scrollDown();
    }

    function scrollDown(props) {
        window.scrollHeight
        window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
    }
    return (
        <>
            <div className="home">
                <HomeHeader/>
                <div className="d-flex justify-content-center" >
                    <Jumbotron>
                        <h1 className="display-3">SkunkWorks</h1>
                        <p className="lead">Start a project.   Join a team.   Build a community.</p>
                        <hr className="my-2"/>
                        <br></br>
                        <p>Work on something you're proud of.</p>
                    </Jumbotron>
                </div>
                    <div className="d-flex justify-content-center">
                        <Button className="about-button" color="light" onClick={toggle}>View Projects</Button>
                    </div>
                    <Collapse isOpen={isOpen}>
                        <div className="arrow bounce d-flex justify-content-center" onClick={scrollDown}></div>
                    </Collapse>
            </div>
            <Collapse isOpen={isOpen}>
                <ProjectDisplay/>
            </Collapse>
        </>
    );
};

const HomeHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
        <Navbar className="nav" expand="md">
          <NavbarBrand href="/">SkunkWorks</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/About">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">temp</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/">temp</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
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

