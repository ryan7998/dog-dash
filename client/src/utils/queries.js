import gql from 'graphql-tag';


export const QUERY_JOBS = gql`
  {
    jobs {
      _id
      user_id
      title
      description
      price
      date
      status
      appliedUsers
      selectedUser
      user{
        image
        firstName
        lastName
        receivedRatings{
          text
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      firstName
      lastName
      description
      address
      email
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
          description
          price
          date
          status
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