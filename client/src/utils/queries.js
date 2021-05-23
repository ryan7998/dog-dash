import gql from 'graphql-tag';



export const QUERY_JOB_BYID = gql`
  query jobById($id: ID!) {
    jobById(_id: $id) {
      _id
      user_id
      image
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
        ratingAvg
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

export const QUERY_WALKERJOBS = gql`
  {
    walkerjobs {
      _id
      walker_id
      job_id
      apply
      select
    }
  }
`;

export const QUERY_JOBS = gql`
  {
    jobs {
      _id
      user_id
      title
      image
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
      ratingAvg
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

export const QUERY_RATINGS = gql`
{
  ratings {
    _id
    rated_id {_id firstName lastName}
    rater_id {_id firstName lastName}
    text
    ratingNb
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
    _id
    firstName
    lastName
    type
    description
    address
    email
    image
    ratingAvg
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