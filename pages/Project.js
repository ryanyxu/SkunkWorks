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
                    console.log("length" + arr.length);
                    return arr;
                }
                setTechnologies(setTech(project.data.technologies));
            });
    }, []); //second param makes useffect only run once (safari stopped freezing!!)
    console.log(technologies.length);
    return (
        <>
            <ProjectIntro name={name} shortDescription={shortDescription}/>
            <TechnologyDisplay technologies={technologies}/>
        </>
    );
    /*
    return (
        <>
            <ProjectIntro name={name} shortDescription={shortDescription}/>
            <TechnologyDisplay technologies={technologies}/>
            <TeamDisplay team={team}/>
            <JoinForm/>
        </>
    );
    */
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
    var teamCards = [];

    props.team.forEach(member => {
        teamCards.push(
            <Col className="col-6 col-lg-3 col-md-4"><TeamCard member={member}/></Col>
        );
    });

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
    var team = ["https://www.brandeis.edu/computer-science/people/images/faculty/antonella-dilillo.jpg",
        "https://www.brandeis.edu/computer-science/people/images/faculty/hickey-tim.jpg",
        "https://www.brandeis.edu/computer-science/people/images/faculty/salas-pito.jpg",
        "https://www.brandeis.edu/computer-science/people/images/faculty/michael-golitsyn.jpg"
        ]
        //change 1 to something else later obviously
    return <div>
            <Link href="/Profile"><img className="icon" src={team[1]}></img></Link>
            <h4>{props.member}</h4>
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