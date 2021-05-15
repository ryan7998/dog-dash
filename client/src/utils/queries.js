import gql from 'graphql-tag';


export const QUERY_JOB_BYID = gql`
  query jobById($id: ID!) {
    jobById(_id: $id) {
      _id
      user_id
<<<<<<< HEAD
=======
      description
      price
      date
      status
      appliedUsers
      selectedUser
    }
  }
`;

export const QUERY_USER_BYID = gql`
  query userById($id: ID!) {
    userById(_id: $id) {
        _id
        firstName
        lastName
        email
        address
        description
        image
        type
        submittedJobs
        appliedJobs
        selectedJobs
        orders {
          _id
          purchaseDate
          jobs {
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
    }
  }
`;


export const QUERY_JOBS = gql`
  {
    jobs {
      _id
      user_id
      title
>>>>>>> neeko
      description
      price
      date
      status
      appliedUsers
      selectedUser
<<<<<<< HEAD
   
=======
>>>>>>> neeko
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      firstName
      lastName
<<<<<<< HEAD
      description
      address
      email
      image
      type
      submittedJobs{
          description
          price
          date
          status
      }
      submittedJobs{
        description
        price
        date
        status
      }
      appliedJobs{
        description
        price
        date
        status
      }
      selectedJobs{
        description
        price
        date
        status
      }
     
=======
      email
      address
      description
      image
      type
      submittedJobs
      appliedJobs
      selectedJobs
>>>>>>> neeko
      orders {
        _id
        purchaseDate
        jobs {
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
    }
  }
`;



export const QUERY_CHECKOUT = gql`
  query getCheckout($jobs: [ID]!) {
    checkout(jobs: $jobs) {
      session
    }
  }
`;



export const QUERY_USER = gql`
{
  user {
    firstName
    lastName
    orders {
      _id
      purchaseDate
    }
  }
}
`;

export const QUERY_ORDER = gql`
{
  order {
        _id
        purchaseDate
        jobs {
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
}
`;