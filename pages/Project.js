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

//displays individual project
function Project() {
    const router = useRouter();

    const [project, setProject] = useState({
        name: "",
        shortDescription: "",
        longDescription: "",
        technologies: [],
        members: [],
    });

    //calls getProject when project is not retrieved from server
    useEffect(() => {
        if (!project.name) {
            getProject();
        }
    }, [project]);

    //get project from server
    const getProject = async () => {
        setProject(
            await Axios.get('http://localhost:5000/projects/' + router.query.id)
            .then(project => {
                return {
                    name: project.data.projectname,
                    shortDescription: project.data.shortdescription,
                    longDescription: project.data.longdescription,
                    technologies: project.data.technologies.map(tech => {
                        var techName = tech.technology;
                        var techImage = tech.image;
                        return {name: techName, image: techImage};
                    }),
                    members: project.data.members.map(member => member._id),
                };
            })
        );
    };

    return (
        <>
            {
                !project ? <div>project not found</div>: <>
                    <ProjectIntro name={project.name} shortDescription={project.shortDescription}/>
                    <TechnologyDisplay technologies={project.technologies}/>
                    <TeamDisplay team={project.members}/>
                    <JoinForm/>
                </>
            }
        </>
    );
}

//displays project name and short description
const ProjectIntro = (props) => {
    return (
        <div className="d-flex justify-content-center intro-display">
            <Jumbotron>
                <h1 className="display-3">{props.name}</h1>
                <p className="lead">{props.shortDescription}</p>
            </Jumbotron>
        </div>
    );
};

//displays technologies used
function TechnologyDisplay(props) {
    var technologyCards = [];
    props.technologies.forEach(technology => {
        technologyCards.push(
            <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard tech={technology}/></Col>
        );
    });

    return (
        <div className="project-display">
            <Container className="technology-display">
                <h1 className="header">Technologies Used</h1>
                <Row>
                    {technologyCards}
                </Row>
            </Container>
        </div>
    );
}

//renders individual technology card
//in the future will want a large database of icons for every possible framework/technology
//can possibly reuse code in tech, team, and project display and pass classname as parameters for styling
function TechnologyCard(props) {
    return <Container>
        <img className="icon" src={props.tech.image}/>
        <h4>{props.tech.name}</h4>
    </Container>
}

//displays project team
function TeamDisplay(props) {
    var idArr = props.team;
    const [members, setMembers] = useState([]);

    //call getTeam if team is empty
    useEffect(() => {
        if (idArr.length > 0) { 
            getTeam();
        }
    }, [idArr]);

    //get team from server
    const getTeam = async () => {
        let arr = [...Array(idArr.length)];
        for (var i = 0; i < idArr.length; i++) {
            arr[i] = await Axios.get('http://localhost:5000/profiles/' + idArr[i])
                .then(profile => {
                    return {
                        id: idArr[i],
                        firstname: profile.data.firstname,
                        lastname: profile.data.lastname,
                        image: profile.data.image,
                    };
                });
        }
        setMembers(arr);
    }

    return (
        <div className="project-display">
        <Container className="technology-display">
            <h1 className="header">Our Team</h1>
            <Row>
                {
                    !members ? <div className="icon"></div> :
                    members.map(member => 
                    <Col className="col-6 col-lg-3 col-md-4"><TeamCard member={member}/></Col>
                    )
                }
            </Row>
        </Container>
        </div>
    );
}

//renders individual member card
function TeamCard(props) {
    return <> {
        <div>
            <Link href={"/Profile?id=" + props.member.id}>
                <img className="icon" src={props.member.image} alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
            </Link>
            <h4>{props.member.firstname + " " + props.member.lastname}</h4>
        </div>
    }</>
}

///form for joining project
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