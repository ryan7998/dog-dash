import React, { useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { UPDATE_TITLE } from "../../utils/actions";
import Auth from "../../utils/auth";
import { RATE_USER } from "../../utils/mutations";
import { Button, Container, Popup, Rating, Image, Modal, Form,} from "semantic-ui-react";
import CreateJob from "../CreateJob";
import Upload from "../../utils/upload";


function ProfileData({profileData}) {
  const [open, setOpen] = React.useState(false);
  const [formState, setFormState] = useState();
  const [rateUser, { error }] = useMutation(RATE_USER);
  const dispatch = useDispatch();

  const userID = Auth.getProfile().data._id;
  const {id:urlID} = useParams();
  const {
    _id,
    firstName,
    lastName,
    description,
    address,
    email,
    image,
    ratingAvg,
    type,
    receivedRate,
    hideJobButton,
    selectedJobs,
    orders,
    self
  } = profileData;

  let subString = "amazon";

  //This is important so any local images will load in both the User Profile AND the other User profile
  if (urlID == userID) {
    return <Redirect to="/profile" />;
  }
  if (profileData.image) {
    if (!profileData.image.includes(subString)) {
      profileData = { ...profileData, image: "." + profileData.image };
    }
  }

  // update title according to the profile name:
  dispatch({
    type: UPDATE_TITLE,
    title: `${firstName}'s profile`
  });


  let numOfRating = 0;
  if (receivedRate) {
    numOfRating = receivedRate.length;
  } else {
    numOfRating = 0;
  }
  
 
  const handleChange = event => {
    if(event.target.textContent){
      setFormState({
        ...formState,
        type: event.target.textContent,
      });
    } else {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const checkRating = (event, data) => {
    setFormState({
      ...formState,
      rating: data.rating,
    });
  };

  const submitRating = async (num) => {
    // refresh();
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const user = rateUser({
        variables: {
          rated_id: urlID,
          ratingNb: formState.rating,
          text: formState.firstName,
        },
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };
  const userIsWalker = (type === 'Dog Walker');

  return (
    <div className="profileimg">
      <div className="profilePicContainer">
        <div className="centerprofileimg">
          <Image src={image} alt={description} size="medium" circular />
        </div>
        {/*conditionaly render the image upload only if it is the USERS own page profile */}
        {_id === userID && (
          <div className="editPic">
            <Popup
              content="Upload new profile image"
              trigger={
                <a>
                  <Upload />
                </a>
              }
            />
          </div>
        )}
      </div>
      <Container className="card-container">
        <h1>{type}</h1>
        <p>{firstName} {lastName}</p>
        <p className='mainRating'>({numOfRating})</p>
        <Rating className='mainRating' icon='star' size='ui massive star rating' defaultRating={ratingAvg} maxRating={5} disabled={true}/>

        {/*conditionaly render the Rating upload only if it is NOT USERS own page profile */}
        {!(_id === userID) && (
          <Modal
            centered={false}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            trigger={<Button icon="add" />}
          >
            <Modal.Header>
              <label>Rating: </label>
              <Rating
                icon="star"
                defaultRating={0}
                maxRating={5}
                size="huge"
                onRate={checkRating}
              />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Form>
                  <Form.TextArea
                    fluid
                    placeholder="Please Enter Rating comment here"
                    name="text"
                    onChange={handleChange}
                  />
                </Form>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={() => submitRating()}>Submit</Button>
            </Modal.Actions>
          </Modal>
        )}

        <h1>{description}</h1>

        <p>{email}</p>
        <p>{address}</p>
        {/* add job button: */}
        <div>{self && <CreateJob />}</div>
          {userIsWalker && (
            <p>Total Jobs {firstName} Completed: <b>{selectedJobs?.length}</b></p>
          )}
          {/* if user is owner show number of posts: */}
          {!self && !userIsWalker && (
              <p>Total Hires: {orders?.length}</p>
          )}
      </Container>
    </div>
  );
}

export default ProfileData;
