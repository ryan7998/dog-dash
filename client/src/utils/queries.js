import gql from 'graphql-tag';


export const QUERY_JOBS = gql`
  {
    jobs {
      _id
      user {
        firstName
        lastName
      }
      description
      price
      date
      status
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