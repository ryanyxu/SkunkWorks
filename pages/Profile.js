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

//profile page for a member
const Profile = () => {
    const router = useRouter();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!profile) {
            getProfile();
        }
    }, [profile]);

    const getProfile = async () => {
        let res = await Axios.get('http://localhost:5000/profiles/' + router.query.id)
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
                <>
                    <ProfileIntro image={profile.image} 
                        name={profile.name}
                        email={profile.email}
                        about={profile.about}
                    />
                    <ProjectInvolvement projects={profile.projects}/>
                    <Contact/>
                </>
            }
        </>
    );
}

//displays basic profile info
const ProfileIntro = (props) => {
    return (
        <Row className="profile-intro">
            <Col className="col-12 col-lg-4 col-md-4">
                <img className="profile-picture" src={props.image}/>
            </Col>
            <Col className="col-12 col-lg-8 col-md-8">
                <p>{props.name}</p>
                <p>{props.email}</p>
                <p>About Me: {props.about}</p>
            </Col>
        </Row>
    );
};

//displays project involvement
//possibly move image data away from profile on database and change to include useEffect and read from server
function ProjectInvolvement(props) {
    function ProjectCard(props) {
        return (
            <div>
                <Card className="project-involvement">
                    <CardImg top width="100%" src={props.project.image} alt="Cannot find image" />
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
    }

    var projectCards = [];
    props.projects.forEach(project => {
        projectCards.push(
            <Col className="col-12 col-lg-6 col-md-6"><ProjectCard project={project}/></Col>
        );
    });

    return (
        <div className="project-display">
            <Container className="technology-display">
                <h1 className="header">Projects</h1>
                <Row>
                    {projectCards}
                </Row>
            </Container>
        </div>
    );
}

//contact form
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
                <Button>Submit</Button>
            </Form>
        </div>
    );
  }



export default withLayout(Profile);