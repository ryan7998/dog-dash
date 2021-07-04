import gql from 'graphql-tag';

 export const ADD_JOB = gql`
    mutation addJob($title: String!, $description: String!, $price: Float!, $date: String!, $status: String! ) {
      addJob(title: $title, description: $description, price: $price, date: $date, status: $status) {
        _id
        title
        description
        price
        date
        status
      }
    }
   `;

 export const APPLY_JOB = gql`
   mutation applyJob($job_id: ID!) {
     applyJob(job_id: $job_id) {
         _id
         user_id
         description
         price
         date
         status
     }
   }
 `;

 export const WITHDRAW_JOB = gql`
   mutation withdrawJob($job_id: ID!) {
     withdrawJob(job_id: $job_id) {
         _id
         user_id
         description
         price
         date
         status
         appliedUsers
        selectedUser

     }
   }
 `;

 export const SELECT_WALKER = gql`
   mutation selectWalker($walker_id: ID!, $job_id: ID!) {
     selectWalker(walker_id: $walker_id, job_id: $job_id) {
         _id
         user_id
         description
         price
         date
         status
         appliedUsers
        selectedUser
        
     }
   }
 `;


export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        image
        firstName
        lastName
        email
        address
        description
        type
      }
    }
  }
`;

 export const ADD_ORDER = gql`
   mutation addOrder($jobs: [ID]!) {
     addOrder(jobs: $jobs) {
       purchaseDate
       jobs {
         _id
         description
         price
         date
         status
       }
     }
   }
 `;
 
export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!, $address: String!, $description: String, $image: String, $type: String!) {
  addUser(
    firstName: $firstName, 
    lastName: $lastName, 
    email: $email, 
    password: $password, 
    address: $address, 
    description: $description, 
    image: $image,
    type: $type
  ){
    token
    user {
      _id
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation updateUser($firstName: String, $lastName: String, $email: String, $password: String, $image: String) {
  updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password, image: $image) {
    _id
    firstName
    image
  }
}
`;

export const UPDATE_JOB = gql`
  mutation updateJob($job_id: ID!, $newStatus: String!){
    updateJob(job_id: $job_id, newStatus: $newStatus){
      status,
      _id,
      description,
    }
  }
`;

export const DELETE_JOB = gql`
  mutation deleteJob($job_id: ID!){
    deleteJob(job_id: $job_id){
      title,
      _id,
      description
    }
  }
`;

export const RATE_USER = gql`
  mutation rateUser($rated_id: ID!, $ratingNb:Float!, $text:String) {
    rateUser(rated_id: $rated_id, ratingNb: $ratingNb, text: $text) {
      _id
      rated_id
      rater_id
      text
   }
  }
 `;