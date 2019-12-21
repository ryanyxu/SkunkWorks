import Link from 'next/link';
import '../style.css';
import withLayout from '../comps/Layout';

import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText} from 'reactstrap';

import React, { useState } from 'react';

const Project = () => (
    <>
        <ProjectIntro/>
        <TechnologyDisplay/>
        <TeamDisplay/>
        <JoinForm/>
    </>
);


const ProjectIntro = (props) => {
    return (
        <div className="d-flex justify-content-center intro-display">
            <Jumbotron>
                <h1 className="display-3">Project Name</h1>
                <p className="lead">Short Description of Project</p>
            </Jumbotron>
        </div>
    );
};

function TechnologyDisplay(props) {
    return (
        <div className="project-display">
            <Container className="technology-display">
                <h1 className="header">Technologies Used</h1>
                <Row>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                    <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard/></Col>
                </Row>
            </Container>
        </div>
    );
}

function TechnologyCard(props) {
    return <img className="icon" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"></img>
}

function TeamDisplay(props) {
    return (
        <div className="project-display">
            <Container className="technology-display">
                <h1 className="header">Our Team</h1>
                <Row>
                    <Col className="col-6 col-lg-3 col-md-6"><TeamCard num="0" /></Col>
                    <Col className="col-6 col-lg-3 col-md-6"><TeamCard num="1" /></Col>
                    <Col className="col-6 col-lg-3 col-md-6"><TeamCard num="2"/></Col>
                    <Col className="col-6 col-lg-3 col-md-6"><TeamCard num="3" /></Col>
                </Row>
            </Container>
        </div>
    );
}

function TeamCard(props) {
    var team = ["https://www.brandeis.edu/computer-science/people/images/faculty/antonella-dilillo.jpg",
        "https://www.brandeis.edu/computer-science/people/images/faculty/hickey-tim.jpg",
        "https://www.brandeis.edu/computer-science/people/images/faculty/salas-pito.jpg",
        "https://www.brandeis.edu/computer-science/people/images/faculty/michael-golitsyn.jpg"
        ]
    return <Link href="/Profile"><img className="icon" src={team[props.num]}></img></Link>
}

const JoinForm = (props) => {
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



export default withLayout(Project);