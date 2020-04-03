import withLayout from '../comps/Layout';
import {Container, Row, Col, Jumbotron, Button,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Form, FormGroup,
    Label, Input, FormFeedback, FormText,
    TabContent, TabPane, Nav, NavItem, NavLink, Collapse} from 'reactstrap';

import Header from '../comps/Header';

const About = () => {
    return <div className="about">
        <Header></Header>
        <Description></Description>
        <Team></Team>
        <Mission></Mission>
    </div>
}

const Description = () => {
    return <>
        <h1>Who we are</h1>
        <p>description!!</p>
    </>
}

const Team = () => {
    const MemberCard = () => {
        return <Row>
            <Col>image</Col>
            <Col>
                <Row>
                    Name
                </Row>
                <Row>
                    Position
                </Row>
            </Col>
        </Row>
    }
    return <Col>
        <MemberCard></MemberCard>
        <MemberCard></MemberCard>
        <MemberCard></MemberCard>
    </Col>
}

const Mission = () => {
    return <Col>
        <Row>thing 1</Row>
        <Row>thing 2</Row>
        <Row>thing 3</Row>
    </Col>
}

export default About;
