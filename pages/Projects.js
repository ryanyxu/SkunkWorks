//gets projects from db and displays them

import withLayout from '../comps/Layout';
import React, { useState , useEffect } from 'react';
import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText} from 'reactstrap';
import Link from 'next/link';
import '../style.css';
import Axios from 'axios';
import Header from '../comps/Header';

//try to get some kind of sketch background
//might be cool if it were a different sketch each time
const ProjectDisplay = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (projects.length == 0) {
            getProjects();
        }
    });

    //retrieve projects from server
    const getProjects = async () => {
        setProjects(
            await Axios.get('http://localhost:5000/projects/')
            .then(response => {
                return response.data.map(project => new Object({ //possibly make project object later
                        id: project._id.toString(),
                        name: project.projectname,
                        description: project.shortdescription,
                        image: project.image
                    })
                );
            })
        )
    };

    //renders individual project card
    const ProjectCard = (props) => {
        const lift = () => {
            let project = document.getElementById(props.project.id + "-card");
            if (project){
                project.classList.toggle("card-shadow");
            }
        }

        return (
            <div>
                <Card className="project-card" id={props.project.id + "-card"} onMouseEnter={lift} onMouseLeave={lift}>
                    <CardImg top width="100%" src={props.project.image} />
                    <CardBody>
                    <CardTitle>{props.project.name}</CardTitle>
                    <CardText>{props.project.description}</CardText>
                    <Link href={'/Project?id=' + props.project.id}>
                        <Button>Learn More</Button>
                    </Link>
                    </CardBody>
                </Card>
            </div>
        );
    }

    //so people on other servers can see
    var mockProject = (id) => {
        return {
            id: id,
            name: "Mock Project",
            description: "So people on other servers can see what it looks like.",
            image: "https://www.netclipart.com/pp/m/179-1791305_1-6-meet-schedule-mark-your-calendar-icon.png",
        }
    }

    return (
        <div className="project-display parallax">
            <div className="header">Current Projects</div>
            <Row>
                <Col className="col-12 col-lg-4 col-md-6">
                    <ProjectCard project={mockProject("asdf")}/>
                </Col>
                <Col className="col-12 col-lg-4 col-md-6">
                    <ProjectCard project={mockProject("sdfg")}/>
                </Col>
                <Col className="col-12 col-lg-4 col-md-6">
                    <ProjectCard project={mockProject("dfgh")}/>
                </Col>
                {
                    !projects ? <></> :
                    projects.map(project => {
                        return(<Col className="col-12 col-lg-4 col-md-6">
                            <ProjectCard project={project}/>
                        </Col>);
                    })
                }
            </Row>
        </div>
    );
}

export default ProjectDisplay;