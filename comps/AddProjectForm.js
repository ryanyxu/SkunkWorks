import React, { useState , useEffect } from 'react';
import '../style.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const AddProjectForm = (props) => {
    const [numMembers, setNumMembers] = useState(0);
    const userForms = (numMembers) => {
        var userForms = [];
        for (var i = 1; i <= numMembers; i++) {
            userForms.push(
                <FormGroup>
                    <div>Member {i} </div>
                    <Label for={"memberFirstName" + i}>First Name</Label>
                    <Input type="text" name={"memberFirstName" + i} id={"memberFirstName" + i} />

                    <Label for={"memberLastName" + i}>Last Name</Label>
                    <Input type="text" name={"memberLastName" + i} id={"memberLastName" + i} />

                    <Label for={"memberEmail" + i}>Email</Label>
                    <Input type="email" name={"memberEmail" + i} id={"memberEmail" + i} />

                    <Label for={"memberRole" + i}>Role</Label>
                    <Input type="text" name={"memberRole" + i} id={"memberRole" + i} />

                    <Label for={"memberContribution" + i}>Contribution</Label>
                    <Input type="text" name={"memberContribution" + i} id={"memberContribution" + i} />

                    <Label for={"memberPhoto" + i}>Link to Photo</Label>
                    <Input type="url" name={"memberPhoto" + i} id={"memberPhoto" + i} />
                </FormGroup>
            )
        }
        return userForms;
    }

    return (
        <Form>
            <h1>Add New Project</h1>
            <FormGroup>
                <Label for="projectName">Project Name</Label>
                <Input type="text" name="projectName" id="projectName" />
            </FormGroup>
            <FormGroup>
                <Label for="shortDescription">Short Description</Label>
                <Input type="text" name="shortDescription" id="shortDescription" />
            </FormGroup>
            <FormGroup>
                <Label for="longDescription">Long Description</Label>
                <Input type="textarea" name="longDescription" id="longDescription" />
            </FormGroup>
            <FormGroup>
                <Label for="numUsers">Number of Members</Label>
                <Input type="number" name="numUsers" id="numUsers" onChange={input => setNumMembers(input.target.value)}/>
            </FormGroup>
            {userForms(numMembers)}
            <Button>Submit</Button>
        </Form>
    );
}

export default AddProjectForm;