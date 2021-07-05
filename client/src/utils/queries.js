import gql from 'graphql-tag';


export const QUERY_JOB_BYID = gql`
  query jobById($id: ID!) {
    jobById(_id: $id) {
      _id
      user
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

export const QUERY_JOB_BY_STATUS = gql`
  query jobByStatus($status: String!){
    jobByStatus(status: $status){
      _id
      title
      image
      description
      price
      date
      status
      appliedUsers
      selectedUser
      user{
        _id
        firstName
        lastName
      }
    }
  }
`

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
        receivedRatings {_id}
        orders {
          _id
          purchaseDate
          jobs {
            _id
            
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

export const QUERY_JOB_BY_USER_ID = gql`
  query jobByUserId($id: ID!) {
    jobByUserId(user: $id) {
      _id
      title
      status
      appliedUsers
      description
      price
      date
      comments {
        _id
      }
    }
  }
`

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
      user
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

// export const QUERY_LIVE_JOBS = gql``;

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
    rater_id {_id firstName lastName image}
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
    receivedRatings {_id}
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