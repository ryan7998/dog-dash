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
  }

  type Job {
    _id: ID
    title: String!
    image: String
    description: String!
    price: Float!
    date: String!
    status: String!
    appliedUsers : [ID]
    selectedUser : ID
    comments: [Comment]
    user: User
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
    email: String!
    address: String
    description: String
    image: String
    type: String
    submittedJobs : [ID]
    appliedJobs : [ID]
    selectedJobs : [ID]
    dogs: [Dog]
    doneRatings: [Rating]
    receivedRatings: [Rating]
    comments: [Comment]
    orders: [Order]
    ratingAvg: Float
  }

  type Rating {
    _id: ID
    rater_id: User
    rated_id: User
    ratingNb: String!
    text: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    jobs: [Job]
    users: [User]
    walkerjobs: [WalkerJob]
    jobById(_id: ID!): Job
    jobByUserId(user: ID!): [Job]
    jobByStatus(status: String!) : [Job]
    userById(_id: ID!): User
    ratings: [Rating]
    
    user: User
    order(_id: ID!): Order
    checkout(jobs: [ID]!): Checkout
  }

  type Mutation {
    addJob(title: String!, description: String!, price: Float!, date: String!, status: String!): Job
    applyJob(job_id: ID!): Job
    withdrawJob(job_id: ID!): Job
    selectWalker(walker_id: ID!, job_id: ID!): Job
    updateJob(job_id: ID!, newStatus: String!): Job
    deleteJob(job_id: ID!): Job
    
    rateUser(rated_id: ID!, ratingNb:Float!, text:String): Rating
    commentJob(user_id: ID!, job_id: ID, text:String!): Job

    addUser(firstName: String!, lastName: String!, email: String!, password: String!, address: String!, description: String, image: String, type: String!): Auth
    addOrder(jobs: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String, image: String ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
