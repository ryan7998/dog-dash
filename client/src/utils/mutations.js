import gql from 'graphql-tag';

export const ADD_JOB = gql`
    mutation addJob($description: String!, $price: Float!, $date: String, $status: String ) {
      addJob(description: $description, price: $price, date: $date, status: $status) {
        _id
        user_id
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
        appliedUsers : {
          _id: ID
          firstName
          lastName
          email
          address
          description
          image
          type
          receivedRatings:  {
            _id
            rater_id
            ratingNb
            text
          }
        }
        selectedUser : {
          _id: ID
          firstName
          lastName
          email
          address
          description
          image
          type
          receivedRatings:  {
            _id
            rater_id
            ratingNb
            text
          }
        }
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
        appliedUsers : {
          _id: ID
          firstName
          lastName
          email
          address
          description
          image
          type
          receivedRatings:  {
            _id
            rater_id
            ratingNb
            text
          }
        }
        selectedUser : {
          _id: ID
          firstName
          lastName
          email
          address
          description
          image
          type
          receivedRatings:  {
            _id
            rater_id
            ratingNb
            text
          }
        }
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
        appliedUsers : {
          _id: ID
          firstName
          lastName
          email
          address
          description
          image
          type
          receivedRatings:  {
            _id
            rater_id
            ratingNb
            text
          }
        }
        selectedUser : {
          _id: ID
          firstName
          lastName
          email
          address
          description
          image
          type
          receivedRatings:  {
            _id
            rater_id
            ratingNb
            text
          }
        }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
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
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;