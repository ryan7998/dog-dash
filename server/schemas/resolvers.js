const { AuthenticationError } = require('apollo-server-express');
const { User, Job, Dog, Comment, Rating, WalkerJob, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    jobs: async (parent) => {
      return await Job.find().populate('user');
    },
    users: async (parent) => {
        const users = await User.find().populate({
          path: 'orders.jobs',
          populate: 'job'
        });
        return users;
    },

    job: async (parent, { _id }) => {
      return await Job.findById(_id).populate('user');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.jobs',
          populate: 'job'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.jobs'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ jobs: args.jobs });
      const line_items = [];

      const { jobs } = await order.populate('jobs').execPopulate();

      for (let i = 0; i < jobs.length; i++) {
        const job = await stripe.jobs.create({
          description: jobs[i].description
        });

        const price = await stripe.prices.create({
          job: job.id,
          unit_amount: jobs[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {
    applyJob: async (parent, {job_id}, context) => {
      if (context.user) {
        const updatedWalkerJob = await WalkerJob.findOneAndUpdate(
          { walker_id: context.user._id },
          { job_id: job_id },
          { $push: { apply: 1 } },
          { new: true }
        );
        return updatedWalkerJob;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { jobs }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ jobs });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
