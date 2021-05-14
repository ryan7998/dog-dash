import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Grid, Header,Icon, Image, Message, Segment } from 'semantic-ui-react'
// import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
// import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const options = [
    { key: 'o', text: 'Dog Owner', value: 'owner' },
    { key: 'w', text: 'Dog Walker', value: 'walker' },
  ]
  // const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    // const mutationResponse = await addUser({
    //   variables: {
    //     email: formState.email, password: formState.password,
    //     firstName: formState.firstName, lastName: formState.lastName
    //   }
    // });
    // const token = mutationResponse.data.addUser.token;
    // Auth.login(token);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>Sign up</Header>
      <Form size='large'>
      <Segment stacked>

        <Form.Group widths='equal'>
          <Form.Input required fluid placeholder='First name' />
          <Form.Input required fluid placeholder='Last name' />
        </Form.Group>
          <Form.Input required fluid placeholder='Email' />
          <Form.Input type='password' required fluid placeholder='Password' />
          <Form.Input required fluid placeholder='Address' />
        <Form.Select required options={options} placeholder='Type' />
        <Form.Checkbox required label='I agree to the Terms and Conditions' />
        </Segment>
        
        <Button color='teal' fluid size='large'>
          Sign up
        </Button>
      </Form>
    </Grid.Column>
  </Grid>

  );

}

export default Signup;
