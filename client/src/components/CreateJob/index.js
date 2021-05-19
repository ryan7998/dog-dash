import React, {useEffect, useState} from 'react';
import { Button, Header, Icon, Modal, Checkbox, Form, Container, Grid, Segment, Message, Input, Label } from 'semantic-ui-react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import DateTimePicker from 'react-datetime-picker'
// import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle'
import { useMutation } from '@apollo/react-hooks';
import { ADD_JOB } from "../../utils/mutations";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../../utils/queries";

const CreateJob = () =>{
    const [formState, setFormState] = useState();
    const [open, setOpen] = React.useState(false);
    const [addJob, { error }] = useMutation(ADD_JOB);
    const [currentDate, setNewDate] = useState(null);
    const [value, onChange] = useState(new Date());
    // check if loggedin user is a walker
    
    const userIsWalker = useQuery(QUERY_USER)?.data?.user.type === 'Dog Walker';
    useEffect(()=>{

    }, [addJob])

    const createJob = async event =>{
        try{
            const mutResp = await addJob({
                variables:{
                    title: formState.title,
                    description: formState.description,
                    price: parseFloat(formState.price),
                    date: value,
                    status: "Live"
                }
            })
            setOpen(false);
            window.location.reload(false);
    
        } catch(e){
            console.log(e, error);
        }
        window.location.reload(false);
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    return(
        // if user is not a walker show post a job button:
        !userIsWalker && 
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
                        <DateTimePicker name="datePicker" onChange={onChange} value={value} label="Select Date"/>
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