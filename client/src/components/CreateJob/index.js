import React, { useEffect, useState } from "react";
import {
  Button,
  Header,
  Modal,
  Form,
  Container,
  Grid,
  Segment,
  Message,
  Input,
  Label,
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_JOB } from "../../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../../utils/queries";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CreateJob = () => {
  const [formState, setFormState] = useState();
  const [open, setOpen] = React.useState(false);
  const [addJob, { error }] = useMutation(ADD_JOB);
  const [currentDate, setNewDate] = useState(null);
  const [value, onChange] = useState(new Date());
  // check if loggedin user is a walker

  const userIsWalker = useQuery(QUERY_USER)?.data?.user.type === "Dog Walker";

  useEffect(() => {}, [addJob]);

  const createJob = async (event) => {
    try {
      const mutResp = await addJob({
        variables: {
          title: formState.title,
          description: formState.description,
          price: parseFloat(formState.price),
          date: formState.dateAndTime,
          status: "Live",
        },
      });
      setOpen(false);
      console.log("Modal was closed");
      window.location.replace("/myjobhistory");
    } catch (e) {
      console.log(e, error);
      window.location.reload(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  //Date and time styles
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
  }));

  const classes = useStyles();

  return (
    // if user is not a walker show post a job button:
    !userIsWalker && (
      <Modal
        closeIcon
        open={open}
        trigger={
          <Button className="ui inverted orange button">+ Post Job</Button>
        }
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Container text>
          <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
          >
            <Grid.Column>
              <Header as="h2" color="teal" textAlign="center">
                Add new Job
              </Header>
              <Form size="large" onSubmit={createJob}>
                <Segment stacked>
                  <Form.Input
                    required
                    fluid
                    placeholder="Title"
                    name="title"
                    onChange={handleChange}
                  />
                  <Form.TextArea
                    required
                    fluid
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                  />
                  <Input
                    required
                    fluid
                    labelPosition="right"
                    type="text"
                    placeholder="Price"
                    name="price"
                  >
                    <Label basic>$</Label>
                    <input onChange={handleChange} />
                    <Label>.00</Label>
                  </Input>
                  <form className={classes.container} noValidate>
                    <TextField
                      id="datetime-local"
                      name="dateAndTime"
                      label="Date and Time"
                      type="datetime-local"
                      defaultValue="0000-00-00T00:00"
                      onChange={handleChange}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </form>
                </Segment>

                <Button color="teal" fluid size="large">
                  + Create
                </Button>
                {error && <Message color="red">Please Try Again!!</Message>}
              </Form>
            </Grid.Column>
          </Grid>
        </Container>
      </Modal>
    )
  );
};

export default CreateJob;
