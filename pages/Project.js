import Link from 'next/link';
import '../style.css';
import withLayout from '../comps/Layout';

import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText,
    TabContent, TabPane, Nav, NavItem, NavLink, Collapse} from 'reactstrap';

import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import Axios from 'axios';
import Header from '../comps/Header';
import classnames from 'classnames';
import ProjectDisplay from './Projects';
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
        <div id="project">
            {
                !project ? <div>project not found</div>:
                <>
                    <ProjectIntro project={project}/>
                    
                </>
            }
        </div>
    );
}
//<JoinForm/>
//<TechnologyDisplay technologies={project.technologies}/>
//<TeamDisplay team={project.members}/>

//displays project name and short description
const compress = () => {
    let proj = document.getElementById("project-intro");
    if (proj) proj.id=("project-change");
    let jumb = document.getElementById("project-jumbotron");
    if (jumb) {
        jumb.id = "project-jumbotron-change";
        jumb.classList.remove("jumbotron");
    }
    let intro = document.getElementById("project-change");
    if (intro) {
        intro.classList.remove("opacity-095");
        intro.classList.add("opacity-06");
        intro.className.replace("opacity-095", "opacity-06");
    }
}
const ProjectIntro = (props) => {
    const [activeTab, setActiveTab] = useState('0');

    const [isOpen, setIsOpen] = useState(false);
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
        setIsOpen(true);
        compress();
    }

    const tabs = () => {
        return <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}>
              Learn More
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}>
            Team Members
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Join Us
          </NavLink>
        </NavItem>
      </Nav>;
    }

    const tabContents = (project) => {
        return (
            <Collapse className="project-content" isOpen={isOpen}>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                    <Row>
                        <Col >
                        <MoreInfo info={project.longDescription} tech={project.technologies}/>
                        </Col>
                    </Row>
                    </TabPane>
                    
                    <TabPane tabId="3">
                    <Row>
                        <Col >
                        <TeamDisplay team={project.members}/>
                        </Col>
                    </Row>
                    </TabPane>
                    <TabPane tabId="4">
                    <Row>
                        <Col >
                            <JoinForm/>
                        </Col>
                    </Row>
                    </TabPane>
                </TabContent>
            </Collapse>);
        
    }

    return (
        <div id="project-intro-background">
            <div id="project-intro" className="color-change opacity-095">
                <Header/>
                <div className="d-flex justify-content-center">
                    <Jumbotron id="project-jumbotron">
                        <h1 id="project-name" className="display-3">{props.project.name}</h1>
                        <p className="lead">{props.project.shortDescription}</p>
                    </Jumbotron>
                </div>
                {tabs()}
            </div>
            {tabContents(props.project)}
        </div>
    );
}
const MoreInfo = (props) => {
    return (<>
        <Row>
            <Col className="col-6">
                <div>{props.info}</div>
            </Col>
            <Col className="col-6">
                <TechnologyDisplay technologies={props.tech}/>
            </Col>
        </Row>
    </>);
}

//displays technologies used
const TechnologyDisplay = (props) => {
    //renders individual technology card
    //in the future will want a large database of icons for every possible framework/technology
    //can possibly reuse code in tech, team, and project display and pass classname as parameters for styling
    const TechnologyCard = (props) => {

        return <div >
            <img className="technology-photo" src={props.tech.image}/>
            <h4>{props.tech.name}</h4>
        </div>
    }

    var technologyCards = [];
    props.technologies.forEach(technology => {
        technologyCards.push(
            <Col className="col-6 col-lg-3 col-md-4"><TechnologyCard tech={technology}/></Col>
        );
    });

    return (
        <div>
            <Container className="technology-display">
                <h2>Tech Stack</h2>
                <Row>
                    {technologyCards}
                </Row>
            </Container>
        </div>
    );
}

//displays project team
const TeamDisplay = (props) => {
    //renders individual member card
    var TeamCard = (props) => {
        return <> {
            <div >
                
            </div>
        }</>
    }

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
        <div>
        <Row >
                {
                    !members ? <div className="icon"></div> :
                    members.map(member => 
                    <Col className="col-6 col-lg-4 col-md-3">
                        <Container>
                            <div>
                                <Link href={"/Profile?id=" + member.id}>
                                    <img className="project-member-photo" src={member.image} alt="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"></img>
                                </Link>
                            </div>
                            <div>
                                <div>Name: {member.firstname + " " + member.lastname}</div>
                                <div>Role: </div>
                                <div>About me: </div>
                            </div>
                        </Container>

                    </Col>
                    )
                }
        </Row>
        </div>
    );
}


///form for joining project
const JoinForm = (props) => {
    return (
        <div className="form-display">
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

export default Project;