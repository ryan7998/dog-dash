const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Dog {
    _id: ID
    user_id: ID
    name: String
    description: String
    image: String
    breed: String
  }

  type Rating {
    _id: ID
    owner_id: ID
    walker_id: ID
    ratingNb: String
    text: String
  }

  type Comment {
    _id: ID
    user_id: ID
    job_id: ID
    text: String
  }

  type WalkerJob {
    _id: ID
  }

  type Job {
    _id: ID
    user_id: ID
    description: String
    price: Float
    date: Date
    status: String
    comments: [Comment]
  }

  type Order {
    _id: ID
    purchaseDate: String
    jobs: [Job]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    address: String
    description: String
    image: String
    type: String
    jobs: [Job]
    dogs: [Dog]
    doneRatings: [Rating]
    receivedRatings: [Rating]
    comments: [Comment]
    orders: [Order]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    job(_id: ID!): Job
    user: User
    order(_id: ID!): Order
    checkout(jobs: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(jobs: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
