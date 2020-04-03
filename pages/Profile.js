import Link from 'next/link';
import '../style.css';
import withLayout from '../comps/Layout';

import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText} from 'reactstrap';

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Axios from 'axios';
import Header from '../comps/Header';

//profile page for a member
//change so loads a blank screen befroe things are done. reference the tech screen
const Profile = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(null
        /*
        name: "Ryan",
        email: "Xu",
        projects: [],
        image: "https://media.licdn.com/dms/image/C511BAQE01Nz-hKBHZQ/company-background_10000/0?e=1577491200&v=beta&t=JvZ3KpWc7Pb6v2P646OTNq2qmOwhXCuUJC6ucRKCd88",
    */
    );

    useEffect(() => {
        if (!profile) {
            getProfile();
        }
    }, [profile]);

    const getProfile = async () => {
        let res = await Axios.get('/profiles/' + router.query.id)
            .then(profile => {
                let obj = {
                    name: profile.data.firstname + " " + profile.data.lastname,
                    email: profile.data.email,
                    projects: profile.data.projects,
                    image: profile.data.image,
                }
                return obj;
            });
        setProfile(res);
    }

    return (
        <>
            {
                !profile ? <div>profile not found</div> :
                <div className="color-change lead">
                    <ProfileIntro image={profile.image} 
                        name={profile.name}
                        email={profile.email}
                        about={profile.about}
                    />
                    <ProjectInvolvement projects={profile.projects}/>
                </div>
            }
        </>
    );
}

//displays basic profile info
const ProfileIntro = (props) => {
    return (
        <div className="profile-intro">
            <Header/>
            <Row className="profile-padding">
                <Col className="col-12 col-lg-4 col-md-4">
                    <img className="profile-picture" src={props.image}/>
                </Col>
                <Col className="col-12 col-lg-8 col-md-8">
                    <div className="profile-description">
                        <p>{props.name}</p>
                        <p>{props.email}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

//displays project involvement
//possibly move image data away from profile on database and change to include useEffect and read from server
function ProjectInvolvement(props) {
    function ProjectCard(props) {
        return (
            <Row className="project-involvement-card"
                id={props.project.id + "-card"}>
                    <Col className="col col-12 col-lg-4 project-involvement-image">
                        <CardImg top src={props.project.image}/>
                    </Col>
                    <Col className="col col-12 col-lg-8 ">
                        <CardTitle className="project-involvement-title">{props.project.projectname}</CardTitle>
                        <CardText>Role: {props.project.role}</CardText>
                        <CardText>Accomplishments: {props.project.contribution}</CardText>
                        <Link href={"/Project?id=" + props.project._id}>
                            <Button onClick="">View Project</Button>
                        </Link>
                    </Col>
            </Row>
        );

/*
        return (
            <div>
                <Card
                    className="project-involvement-card"
                    id={props.project.id + "-card"}
                    onMouseEnter={lift} onMouseLeave={lift}
                    >
                    
                    <CardBody>
                    <CardTitle>{props.project.projectname}</CardTitle>
                    <CardText>Role: {props.project.role}</CardText>
                    <CardText>Accomplishments: {props.project.contribution}</CardText>
                    <Link href={"/Project?id=" + props.project._id}>
                        <Button onClick="">View Project</Button>
                    </Link>
                    </CardBody>
                </Card>
            </div>
        );
        */
    }

    var projectCards = [];
    props.projects.forEach(project => {
        projectCards.push(
            <ProjectCard project={project}/>
        );
    });
    /*
    var mockProject = (id) => {
        return {
            id: id,
            name: "Mock Project",
            role: "Project Manager",
            contribution: "Organized meetings and led team",
            image: "https://www.netclipart.com/pp/m/179-1791305_1-6-meet-schedule-mark-your-calendar-icon.png",
        }
    }
    */

    return (
        <div className="color-change-light">
            <div className="profile-padding">
                <Container >
                    <div className="profile-header">Projects</div>
                    <Row>
                        {projectCards}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

//contact form
const Contact = (props) => {
    return (
        <div className="profile-form profile-padding">
            <h1 className="profile-header">Contact me</h1>
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
                <Label for="exampleText">Message</Label>
                <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
                <FormGroup>
                </FormGroup>
                <Button className="profile-form-submit">Submit</Button>
            </Form>
        </div>
    );
}

export default Profile;