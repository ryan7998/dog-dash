import gql from 'graphql-tag';


export const QUERY_JOB_BYID = gql`
  query jobById($_id: ID!) {
    jobById(_id: $_id) {
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

export const QUERY_USER_BYID = gql`
  query userById($_id: ID!) {
    userById(_id: $_id) {
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
      description
      price
      date
      status
      appliedUsers
      selectedUser
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
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