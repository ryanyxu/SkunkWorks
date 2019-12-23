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

function Project() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [technologies, setTechnologies] = useState([]);
    const [team, setTeam] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:5000/projects/' + router.query.id)
            .then(project => {
                setName(project.data.projectname);
                setShortDescription(project.data.shortdescription);
                setLongDescription(project.data.longdescription);
                const setTech = (t) => { //put somewhere else later
                    var arr = [];
                    t.forEach(tech => {
                        var techName = tech.technology;
                        var techImage = tech.image;
                        arr.push(new Object({name: techName, image: techImage}));
                    })
                    return arr;
                }
                setTechnologies(setTech(project.data.technologies));
                const setMembers = (t) => {
                    var arr = [];
                    t.forEach(member => {
                        arr.push(member._id);
                    })
                    return arr;
                }
                setTeam(setMembers(project.data.members));
            });
    }, []); //second param makes useffect only run once (safari stopped freezing!!)

    return (
        <>
            <ProjectIntro name={name} shortDescription={shortDescription}/>
            <TechnologyDisplay technologies={technologies}/>
            <TeamDisplay team={team}/>
            <JoinForm/>
        </>
    );
}

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

//TODO fix technolgoydisplay
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

//in the future will want a large database of icons for every possible framework/technology
//can possibly reuse code in tech, team, and project display and pass classname as parameters for styling
function TechnologyCard(props) {
    return <Container>
        <img className="icon" src={props.tech.image}/>
        <h4>{props.tech.name}</h4>
    </Container>
}

//TODO fix profile
function TeamDisplay(props) {
    const [teamCards, setTeamCards] = useState([]);
    useEffect(() => {
        props.team.forEach(id => {
            Axios.get('http://localhost:5000/profiles/' + id)
                .then(profile => { //profile from id
                    const newTeamCard = () => {
                        var member = {
                            id: id,
                            firstname: profile.data.firstname,
                            lastname: profile.data.lastname,
                            image: profile.data.image,
                        };
                        return <Col className="col-6 col-lg-3 col-md-4"><TeamCard member={member}/></Col>;
                    }
                    setTeamCards([newTeamCard(), ...teamCards]);
                });
        });
    }, [teamCards.length == props.team.length]);

    return (
        <div className="project-display">
            <Container className="technology-display">
                <h1 className="header">Our Team</h1>
                <Row>
                    {teamCards}
                </Row>
            </Container>
        </div>
    );
}

function TeamCard(props) {
        //change 1 to something else later obviously
        //TOEJTEJKRL change href to have id
        //*******read this */
    console.log(props.member.image);
    console.log(props.member.firstname);
    return <div>
            <Link href="/Profile"><img className="icon" src={props.member.image}></img></Link>
            <h4>{props.member.firstname + " " + props.member.lastname}</h4>
        </div>
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