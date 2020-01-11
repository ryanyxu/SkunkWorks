import React, { useState , useEffect } from 'react';
import '../style.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddProjectForm = (props) => {
    const [numMembers, setNumMembers] = useState(0);
    let projectInfo = {
        projectname:"",
        shortdescription:"",
        longdescription:"",
        members:[],
        technologies:"",
    };
    let membersArr = [];
    const userForms = (numMembers) => {
        var userForms = [];
        //eventually add option for existing skunkworks member
        for (let i = 0; i < numMembers; i++) {
            membersArr[i] = {
                firstname:"",
                lastname:"",
                email:"",
                photo:"",
                projects: {}
            };
            const test = (e) => {
                membersArr[i].firstname=e.target.value;
                console.log(membersArr[i].firstname);
            }

            userForms.push(
                <FormGroup>
                    <div>Member {i} </div>
                    <Label for={"memberFirstName" + i}>First Name</Label>
                    <Input type="text" name={"memberFirstName" + i} id={"memberFirstName" + i} 
                    onChange={e => test(e)} />

                    <Label for={"memberLastName" + i}>Last Name</Label>
                    <Input type="text" name={"memberLastName" + i} id={"memberLastName" + i} 
                    onChange={e => membersArr[i].lastname=e.target.value} />

                    <Label for={"memberEmail" + i}>Email</Label>
                    <Input type="email" name={"memberEmail" + i} id={"memberEmail" + i} 
                    onChange={e => membersArr[i].email=e.target.value} />

                    <Label for={"memberRole" + i}>Role</Label>
                    <Input type="text" name={"memberRole" + i} id={"memberRole" + i} 
                    onChange={e => membersArr[i].projects.role=e.target.value} />

                    <Label for={"memberContribution" + i}>Contribution</Label>
                    <Input type="text" name={"memberContribution" + i} id={"memberContribution" + i} 
                    onChange={e => membersArr[i].projects.contribution=e.target.value} />

                    <Label for={"memberPhoto" + i}>Link to Photo</Label>
                    <Input type="url" name={"memberPhoto" + i} id={"memberPhoto" + i} 
                    onChange={e => membersArr[i].projects.image=e.target.value} />
                </FormGroup>
            )
        }
        return userForms;
    }

    const handleSubmit = (e) => {
        projectInfo.members = membersArr;
        //for each member, add to database
        //add team to database
    }

    return (
        <>
        <Form>
            <h1>Add New Project</h1>
            <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input type="text" name="projectName" id="projectName"
                onChange={e => projectInfo.projectname = e.target.value} />
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
                <Input type="textare" name="technologies" id="technologies" 
                onChange={e => projectInfo.technologies = e.target.value} />
            </FormGroup>
            <FormGroup>
                <Label for="numUsers">Number of Members</Label>
                <Input type="number" name="numUsers" id="numUsers"
                onChange={input => setNumMembers(input.target.value)} />
            </FormGroup>
            {userForms(numMembers)}
        </Form>
        <Button onClick={e => handleSubmit(e)}>Submit</Button>
        </>
    );
}

export default AddProjectForm;