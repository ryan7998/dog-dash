import React, {useState} from 'react';
import { Button, Header, Icon, Modal, Checkbox, Form, Container, Grid, Segment, Message, Input, Label } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import { useMutation } from '@apollo/react-hooks';
import { ADD_JOB } from "../../utils/mutations";

const CreateJob = () =>{
    const [formState, setFormState] = useState();
    const [open, setOpen] = React.useState(false);
    const [addJob, { error }] = useMutation(ADD_JOB);
    const [currentDate, setNewDate] = useState(null);
    const onChange = (event, data) => setNewDate(data.value);
  
    const createJob = async event =>{
        try{
            const mutResp = await addJob({
                variables:{
                    title: formState.title,
                    description: formState.description,
                    price: parseFloat(formState.price),
                    date: currentDate,
                    status: "Live"
                }
            })
            setOpen(false);
        } catch(e){
            console.log(e, error);
        }
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return(
        <Modal
            closeIcon
            open={open}
            trigger={<Button className="ui inverted orange button">+ Post Job</Button>}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            <Container text>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column>
                <Header as='h2' color='teal' textAlign='center'>Add new Job</Header>
                <Form size='large' 
                onSubmit={createJob}
            >
                    <Segment stacked>
                        <Form.Input required fluid placeholder='Title' name="title" onChange={handleChange}/>
                        <Form.TextArea required fluid placeholder='Description' name="description" onChange={handleChange}/>
                        <Input required fluid labelPosition='right' type='text' placeholder='Price' name="price" >
                            <Label basic>$</Label>
                            <input onChange={handleChange}/>
                            <Label>.00</Label>
                            
                        </Input>
                        <SemanticDatepicker name="datePicker" onChange={onChange} label="Select Date"/>
                    </Segment>
                    
                    <Button color='teal' fluid size='large'>+ Create</Button>
                    {error && <Message color='red'>Please Try Again!!</Message>}
                </Form>
                </Grid.Column>
            </Grid>
            </Container>
        </Modal>
    );
}

export default CreateJob;