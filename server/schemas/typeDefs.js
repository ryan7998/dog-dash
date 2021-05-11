const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Dog {
    _id: ID
    user_id: ID!
    name: String!
    description: String
    image: String
    breed: String
  }

  type Rating {
    _id: ID
    owner_id: ID!
    walker_id: ID!
    ratingNb: String!
    text: String
  }

  type Comment {
    _id: ID
    user_id: ID!
    job_id: ID!
    text: String!
  }

  type WalkerJob {
    _id: ID
    walker_id: ID!
    job_id: ID!
    apply: Boolean
    select: Boolean
    walker: User
    job: Job
  }

  type Job {
    _id: ID
    user_id: ID!
    description: String!
    price: Float!
    date: Date
    status: String
    comments: [Comment]
    applyedWalkers : [WalkerJob]
    selectedWalker : WalkerJob
  }

  type Order {
    _id: ID
    purchaseDate: String
    jobs: [Job]
  }

  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    address: String!
    description: String
    image: String
    type: String!
    dogs: [Dog]
    doneRatings: [Rating]
    receivedRatings: [Rating]
    comments: [Comment]
    orders: [Order]
    submittedJobs : [WalkerJob]
    applyedJobs : [WalkerJob]
    selectededJobs : [WalkerJob]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    jobs: [Job]
    users: [User]

    job(_id: ID!): Job
    user: User
    order(_id: ID!): Order
    checkout(jobs: [ID]!): Checkout
  }

  type Mutation {
    applyJob(job_id: ID!): WalkerJob
    withdrawJob(job_id: ID!): WalkerJob
    selectWalker(walker_id: ID!, job_id: ID!): WalkerJob
    
    rateUser(owner_id: ID!, walker_id: ID!, ratingNb!:String, text:String): User
    commentJob(user_id:ID!, job_id: ID, text:String!): Job

    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(jobs: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
