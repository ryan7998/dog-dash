import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

function Login() {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="job-list">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center" className="login-title">
            Log-in to your account
          </Header>
          <Form size="large" onSubmit={handleFormSubmit}>
            <Segment stacked className="login-form">
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={handleChange}
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleChange}
              />

              <Button fluid size="large" className="login-register">
                Login
              </Button>
              {error && (
                <Message color="red">Incorrect email / password</Message>
              )}
            </Segment>
          </Form>
          <Message
            className="signup-link"
            style={{ backgroundColor: "teal", color: "white" }}
          >
            New to us?{" "}
            <Link
              style={{ color: "white", textDecoration: "underline" }}
              to="/signup"
            >
              Sign up
            </Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Login;
