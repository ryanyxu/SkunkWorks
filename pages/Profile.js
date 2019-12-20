import Link from 'next/link';
import '../style.css';
import withLayout from '../comps/Layout';

import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText} from 'reactstrap';

import React, { useState } from 'react';

const Profile = () => (
    <>
        <ProfileIntro/>
        <ProjectInvolvement/>
        <Contact/>
    </>
);


const ProfileIntro = (props) => {
    return (
        <Row className="profile-intro">
            <Col className="col-12 col-lg-4 col-md-4">
                <img className="profile-picture" src="https://www.brandeis.edu/computer-science/people/images/faculty/michael-golitsyn.jpg"/>
            </Col>
            <Col className="col-12 col-lg-8 col-md-8">
                <p>Michael Golitsyn</p>
                <p>golitsyn@brandeis.edu</p>
                <p>About me:</p>
            </Col>
        </Row>
    );
};

function ProjectInvolvement(props) {
    function ProjectCard(props) {
        return (
            <div>
                <Card className="project-involvement">
                    <CardImg top width="100%" src="https://cities4people.eu/wp-content/uploads/2017/11/cities4people-logo-plain-2-1024x972.jpg" alt="Card image cap" />
                    <CardBody>
                    <CardTitle>Project Title</CardTitle>
                    <CardText>Role:</CardText>
                    <CardText>Accomplishments:</CardText>
                    <Link href="/Project">
                        <Button onClick="">View Project</Button>
                    </Link>
                    </CardBody>
                </Card>
            </div>
        );
    }
    return (
        <div className="project-display">
            <Container className="technology-display">
                <h1 className="header">Projects</h1>
                <Row>
                    <Col className="col-12 col-lg-6 col-md-6"><ProjectCard/></Col>
                    <Col className="col-12 col-lg-6 col-md-6"><ProjectCard/></Col>
                </Row>
            </Container>
        </div>
    );
}

const Contact = (props) => {
    return (
        <div className="form-display">
            <h1 className="header">Get in Touch!</h1>
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
                <Label for="exampleText">Message</Label>
                <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>
    );
  }



export default withLayout(Profile);