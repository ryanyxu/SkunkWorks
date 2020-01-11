import React, { useState , useEffect } from 'react';
import '../style.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Axios from 'axios';

const AddProjectForm = (props) => {
    const [numMembers, setNumMembers] = useState(0);
    const projectInfo = {
        _id:"",
        projectname:"",
        shortdescription:"",
        longdescription:"",
        members:[],
        technologies:[],
        image:"",
    };
    
    const membersArr = [];
    const userForms = (numMembers) => {
        var userForms = [];
        //eventually add option for existing skunkworks member
        for (let i = 0; i < numMembers; i++) {
            membersArr[i] = {
                firstname:"",
                lastname:"",
                _id:"",
                email:"",
                image:"",
                projects: [{}]
            };

            userForms.push(
                <FormGroup>
                    <div>Member {i} </div>
                    <Label for={"memberFirstName" + i}>First Name</Label>
                    <Input type="text" name={"memberFirstName" + i} id={"memberFirstName" + i} 
                    onChange={e => membersArr[i].firstname=e.target.value} />

                    <Label for={"memberLastName" + i}>Last Name</Label>
                    <Input type="text" name={"memberLastName" + i} id={"memberLastName" + i} 
                    onChange={e => membersArr[i].lastname=e.target.value} />

                    <Label for={"memberEmail" + i}>Email</Label>
                    <Input type="email" name={"memberEmail" + i} id={"memberEmail" + i} 
                    onChange={(e) => {
                        membersArr[i].email=e.target.value;
                        membersArr[i]._id=e.target.value;
                    }}/>

                    <Label for={"memberRole" + i}>Role</Label>
                    <Input type="text" name={"memberRole" + i} id={"memberRole" + i} 
                    onChange={e => membersArr[i].projects[0].role=e.target.value} />

                    <Label for={"memberContribution" + i}>Contribution</Label>
                    <Input type="text" name={"memberContribution" + i} id={"memberContribution" + i} 
                    onChange={e => membersArr[i].projects[0].contribution=e.target.value} />

                    <Label for={"memberPhoto" + i}>Link to Photo</Label>
                    <Input type="url" name={"memberPhoto" + i} id={"memberPhoto" + i} 
                    onChange={e => membersArr[i].image=e.target.value} />
                </FormGroup>
            )
        }
        return userForms;
    }

    const handleSubmit = (e) => {
        for (let i = 0; i < membersArr.length; i++) {
            projectInfo.members.push(membersArr[i]._id);
        }
        for (let i = 0; i < membersArr.length; i++) {
            membersArr[i].projects[0].projectname=projectInfo.projectname;
            membersArr[i].projects[0]._id=projectInfo.projectname;
            membersArr[i].projects[0].image=projectInfo.image

            console.log(JSON.stringify(membersArr[i]))
            Axios.post('http://localhost:8080'+'/profiles/add', membersArr[i])
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
        Axios.post('http://localhost:8080'+'/projects/add', projectInfo)
            .then(response => console.log(response))
            .catch(error => console.log(error))

        console.log(JSON.stringify(projectInfo))
    }

    return (
        <>
        <Form>
            <h1>Add New Project</h1>
            <FormGroup>
                <Label for="numUsers">Number of Members</Label>
                <div>NOTE: enter this before filling out form</div>
                <Input type="number" name="numUsers" id="numUsers"
                onChange={input => setNumMembers(input.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input type="text" name="projectName" id="projectName"
                onChange={(e) => {
                    projectInfo.projectname= e.target.value;
                    projectInfo._id=e.target.value;
                }} />
            </FormGroup>
            <FormGroup>
                <Label for="shortDescription">Short Description</Label>
                <Input type="text" name="shortDescription" id="shortDescription" 
                onChange={e => projectInfo.shortdescription = e.target.value} />
            </FormGroup>
            <FormGroup>
                <Label for="longDescription">Long Description</Label>
                <Input type="textarea" name="longDescription" id="longDescription" 
                onChange={e => projectInfo.longdescription = e.target.value} />
            </FormGroup>
            <FormGroup>
                <Label for="technologies">Technologies Used</Label>
                <Input type="textarea" name="technologies" id="technologies" 
                onChange={e => projectInfo.technologies = [e.target.value]} />
            </FormGroup>
            <FormGroup>
                <Label for="image">Project image</Label>
                <Input type="url" name="image" id="image" 
                onChange={e => projectInfo.image = e.target.value} />
            </FormGroup>
            {userForms(numMembers)}
        </Form>
        <Button onClick={e => handleSubmit(e)}>Submit</Button>
        </>
    );
}

export default AddProjectForm;