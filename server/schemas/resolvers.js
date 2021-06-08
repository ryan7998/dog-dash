const { AuthenticationError } = require('apollo-server-express');
const { User, Job, Dog, Comment, Rating, WalkerJob, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    walkerjobs: async () => {
      const walkerjobs= await WalkerJob.find();
      return walkerjobs;
    },

    jobs: async () => {
      const jobs= await Job.find().populate({
        path:'orders.user',
        populate:'user'
      });
      return jobs;
    },
    
    users: async (parent) => {
        const users = await User.find().populate({
          path: 'orders.jobs',
          populate: 'job',
          populate: 'doneRatings',
        })
        .populate('doneRatings')
        .populate('receivedRatings');
        return users;
    },

    ratings: async (parent) => {
        const ratings = await Rating.find().populate('rater_id').populate('rated_id');

        return ratings;
    },
    
    jobById: async (parent, { _id }) => {
      return await Job.findById(_id).populate('user');
    },

    jobByUserId: async(parent, {user_id})=>{
      const jobs = await Job.find({
        user_id: user_id
      })
      // console.log(jobs);
      return jobs;
    },

    jobByStatus: async(parent, {status})=>{
      return await Job.find({status: status}).populate({
        path:'orders.user',
        populate:'user'
      });
    },

    userById: async (parent, { _id }) => {
        const users = await User.findById(_id).populate({
          path: 'orders.jobs',
          populate: 'job'
        })
        .populate('receivedRatings');
        return users;
    },

    
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.jobs',
          populate: 'job'
        })
        .populate('receivedRatings');
        
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
        const job = await stripe.products.create({
          name: jobs[i].description,
          description: jobs[i].description
        });

        const price = await stripe.prices.create({
          product: job.id,
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

    addJob: async (parent, {title, description, price, date, status,}, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const newJob = await Job.create(
          { user_id: user._id,
           image: user.image,
           title: title,
           description: description,
           price: price,
           date: date,
           status: status,
           new: true }
        );
    
        await User.findByIdAndUpdate(context.user._id, { $push: { submittedJobs: newJob._id } });
        return newJob;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    
    applyJob: async (parent, {job_id}, context) => {
      let currentWalkerJob = await WalkerJob.find(
        { walker_id: context.user._id ,
          job_id: job_id ,
          apply: 1 
        }
      )
     
        if (context.user) {
      
              await WalkerJob.create(
                  { walker_id: context.user._id ,
                  job_id: job_id ,
                  apply: 1 , 
                  new: true }
                );
                await User.findByIdAndUpdate(context.user._id, { $push: { appliedJobs: job_id } });
                let updatedJob = await Job.findByIdAndUpdate(job_id, { $push: { appliedUsers: context.user._id } , new: true});
            
          return updatedJob;
        }
        throw new AuthenticationError('You need to be logged in!');
      
    },

    withdrawJob: async (parent, {job_id}, context) => {
      if (context.user) {
       await WalkerJob.deleteOne(
          { walker_id: context.user._id, 
            job_id: job_id  }
        );
       
        await User.findByIdAndUpdate(context.user._id, { $pull: { appliedJobs: job_id }  });
        let updatedJob = await Job.findByIdAndUpdate(job_id, { $pull: { appliedUsers: context.user._id } , new: true });
        return updatedJob;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    selectWalker: async (parent, {walker_id, job_id}, context) => {
      if (context.user) {
        const previouslySelected = await WalkerJob.updateMany(
          {job_id: job_id },
          {$set: { select: 0 } }
         ); 
       
        await WalkerJob.findOneAndUpdate(
          { walker_id: walker_id ,job_id: job_id },
          { $set: { select: 1 } }
        );
        let updatedJob = await Job.find({ _id: job_id });
        
        for (i = 0; i < previouslySelected.length; i++) {
        await User.updateMany(
          { user_id: previouslySelected[i].walker_id },
          {$pull: { selectedJobs: ujob_idpdatedJob }} 
         ); 
        }
   
        await User.findByIdAndUpdate(walker_id, { $push: { selectedJobs: job_id } });
        
        updatedJob = await Job.findByIdAndUpdate(job_id, { $set: { selectedUser: walker_id } });
        return updatedJob;
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
    },

    rateUser: async (parent, {rated_id, ratingNb, text,}, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const newrating = await Rating.create(
          { rater_id: user._id,
           rated_id: rated_id,
           ratingNb: ratingNb,
           text: text
          }
        );
        await User.findByIdAndUpdate(context.user._id, { $push: { doneRatings: newrating._id } });
        await User.findByIdAndUpdate(rated_id, { $push: { receivedRatings: newrating._id } });
        return newrating;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateJob: async (parent, {job_id, newStatus}) => {
      const jobsDone = await Job.findByIdAndUpdate(job_id, {$set:{status: newStatus}}, { new: true })
      return jobsDone;
    },

    deleteJob: async(parent, {job_id}) =>{
      const jobDeleted = await Job.findByIdAndDelete(job_id);
      return jobDeleted;
    }
  }
};

module.exports = resolvers;
