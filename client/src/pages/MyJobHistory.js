import React from "react";
import { Redirect } from 'react-router-dom';
import { useQuery } from "@apollo/react-hooks";
import OwnersJobHistory from '../components/OwnersJobHistory';
import JobList from "../components/JobList";
import CreateJob from "../components/CreateJob";

import { QUERY_USER } from "../utils/queries";
import { Container, Grid, Dimmer, Loader, Message } from "semantic-ui-react";
import Auth from "../utils/auth";

import { useDispatch } from "react-redux";
import { UPDATE_TITLE, UPDATE_ME } from "../utils/actions";



function MyJobHistory() {
  
  const dispatch = useDispatch();
  dispatch({
    type: UPDATE_TITLE,
    title: 'Job History'
  });
  
  //  gets the current user details:
  const {loading, error, data} = useQuery(QUERY_USER);
  if(loading){return <Dimmer active> <Loader content='Loading' /></Dimmer>}
  const me = data?.user || {};

  // update redux state of me:
  dispatch({
    type: UPDATE_ME,
    me: me
  });
  
  // redirect to login if user not logged in:
  if(!Auth.loggedIn()){
    return <Redirect to="/login" />;
  }

  return(
      <Container className="ourjobcontainer">
        {/* if there is a error */}
         {error  && 
           <Message negative>
             <Message.Header>Error Occured</Message.Header>
             <p>{error}</p>
           </Message>
         }
         {(me.type === 'Dog Owner') ? 
            <OwnersJobHistory /> 
          : 
          'test2'
         }
      </Container>
  );

//   if (me.type === "Dog Walker") {
//     return (
//       <Container className="ourjobcontainer">
//         {error  && 
//           <Message negative>
//             <Message.Header>Error Occured</Message.Header>
//             <p>error</p>
//           </Message>
//         }
//         <Grid stackable>
//           <Grid.Row>
//             {/* <Grid.Column width={8}> */}
//               <h2>Active Jobs:</h2>
//                       
//               <JobList
//                 status="Live"
//                 submit="any"
//                 apply="true"
//                 select="false"
//                 selectme="false"
//                 walker="false"
//                 itemsPerRow={4}
//               />
//               <JobList
//                 status="Live"
//                 submit="any"
//                 apply="true"
//                 select="true"
//                 selectme="true"
//                 walker="false"
//                 itemsPerRow={4}
//               />
//               <JobList
//                 status="Live"
//                 submit="any"
//                 apply="true"
//                 select="true"
//                 selectme="false"
//                 walker="false"
//                 itemsPerRow={4}
//               />
//             {/* </Grid.Column> */}
//           </Grid.Row>
//           <Grid.Row>

//             {/* <Grid.Column width={8}> */}
//               <h2>Previous Jobs:</h2>
//                       
//               <JobList
//                 status="Done"
//                 submit="any"
//                 apply="true"
//                 select="true"
//                 selectme="true"
//                 walker="false"
//                 itemsPerRow={4}
//               />
//               <JobList
//                 status="Done"
//                 submit="any"
//                 apply="true"
//                 select="true"
//                 selectme="false"
//                 walker="false"
//                 itemsPerRow={4}
//               />
//             {/* </Grid.Column> */}
//           </Grid.Row>
//         </Grid>
//       </Container>
//     );
//   } else {
//     // Dog Owner
//     return (
//       <Container className="ourjobcontainer">
//         {error  && 
//           <Message negative>
//             <Message.Header>Error Occured</Message.Header>
//             <p>error</p>
//           </Message>
//         }
//         <Grid stackable>
//           <Grid.Column width={10}>
//             <div className="postjobbtn">
//               <CreateJob />
//             </div>
//           </Grid.Column>
//           <Grid.Row>
//             <Grid.Column width={8}>
//               <h2>Active Jobs:</h2>
//               <JobList
//                 status="Live"
//                 submit="true"
//                 apply="true"
//                 select="false"
//                 selectme="any"
//                 walker="true"
//               />
//               <JobList
//                 status="Live"
//                 submit="true"
//                 apply="true"
//                 select="true"
//                 selectme="any"
//                 walker="true"
//               />
//               <JobList
//                 status="Live"
//                 submit="true"
//                 apply="false"
//                 select="false"
//                 selectme="any"
//                 walker="true"
//               />
//             </Grid.Column>
//             <Grid.Column width={8}>
//               <h2>Previous Jobs:</h2>
//                 
//               <JobList
//                 status="Done"
//                 submit="true"
//                 apply="true"
//                 select="true"
//                 selectme="any"
//                 walker="true"
//               />
//               <JobList
//                 status="Done"
//                 submit="true"
//                 apply="true"
//                 select="false"
//                 selectme="any"
//                 walker="true"
//               />
//               <JobList
//                 status="Done"
//                 submit="true"
//                 apply="false"
//                 select="false"
//                 selectme="any"
//                 walker="true"
//               />
//                
//             </Grid.Column>
//              
//           </Grid.Row>
//         </Grid>
//       </Container>
//     );
//   }
}

export default MyJobHistory;
