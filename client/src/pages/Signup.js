import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Grid, Header, Icon, Image, Message, Segment, TextArea } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import background from "../assets/bgwhite.png";

function Signup(props) {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [ownerType, setOwnerType] = useState(false);
  
  const options = [
    { key: 'o', text: 'Dog Owner', value: 'owner' },
    { key: 'w', text: 'Dog Walker', value: 'walker' },
  ]
  const [addUser, {error}] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try{
      const mutationResponse = await addUser({
        variables: {
          firstName: formState.firstName, 
          lastName: formState.lastName,
          email: formState.email, 
          password: formState.password,
          type: formState.type,
          address: formState.address, 
          description: formState.description, 
          image: "testimage"
        }
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    }catch(e){
      console.log(e)
    }
  };

  const handleChange = event => {
    if(event.target.textContent){
      setFormState({
        ...formState,
        'type' : event.target.textContent
      })
      if(event.target.textContent === 'Dog Owner'){
        setOwnerType(true);
      }else{
        setOwnerType(false);
      }
      console.log(ownerType);
    }else{
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${background})` }}>
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>Sign up</Header>
      <Form size='large' onSubmit={handleFormSubmit}>
      <Segment stacked>
        <Form.Group widths='equal'>
          <Form.Input required fluid placeholder='First name' name="firstName" onChange={handleChange} />
          <Form.Input required fluid placeholder='Last name' name="lastName" onChange={handleChange} />
        </Form.Group>
          <Form.Input required fluid placeholder='Email' name="email" onChange={handleChange} />
          <Form.Input type='password' required fluid placeholder='Password' name="password" onChange={handleChange} />
          <Form.Input required fluid placeholder='Address' name="address" onChange={handleChange} />
        <Form.Select options={options} placeholder='Type' search selection name="type" onChange={handleChange}/>
        {ownerType && 
          <Form.TextArea fluid placeholder="Please Enter your Dog's Description" name="description" onChange={handleChange} />
        }
        <Form.Checkbox required label='I agree to the Terms and Conditions' />
        </Segment>
        
        <Button color='teal' fluid size='large'>
          Sign up
        </Button>
        {error && <Message color='red'>Registration Failed! Please try again</Message>}

      </Form>
    </Grid.Column>
  </Grid>
  </div>

  );

}

export default Signup;
