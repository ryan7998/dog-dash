const db = require('./connection');
const { WalkerJob, Comment, Job, Rating, Dog, User } = require('../models');

db.once('open', async () => {
  
  await WalkerJob.deleteMany();
  await Comment.deleteMany();
  await Job.deleteMany();
  await Rating.deleteMany();
  await Dog.deleteMany();
  await User.deleteMany();

//    category: categories[4]._id,
  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    address: '105 Eastwod Ave. Sacarborough M1N 3H4',
    description: 'Loves cats more than dogs!',
    image: './images/user1.JPG',
    type: 'owner'/*,
    orders: [
      {
        jobs: [jobs[0]._id]
      }
    ]*/
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    address: '103 Eastwod Ave. Sacarborough M1N 3H4',
    description: 'Loves dogs!',
    image: './images/user1.JPG',
    type: 'owner'
  });

  await User.create({
    firstName: 'Max',
    lastName: 'Ryan',
    email: 'mryan@testmail.com',
    password: 'password12345',
    address: '100 Eastwod Ave. Sacarborough M1N 3H4',
    description: 'Loves wolves!',
    image: './images/user1.JPG',
    type: 'walker'
  });

  console.log('users seeded');

  await Dog.create({
    user_id: 0,
    name: 'Doggy1',
    description: 'white dog',
    image: './images/user1.JPG',
    breed: 'Unknown'
  });

  await Dog.create({
    user_id: 1,
    name: 'Doggy2',
    description: 'brown dog',
    image: './images/user1.JPG',
    breed: 'Unknown'
  });

  console.log('dogs seeded');

  await Job.create({
    user_id: 0,
    description: 'walk my white dog',
    price: 7.00,
    date: '06-06-2021',
    Status: 'Live'
  });

  await Job.create({
    user_id: 1,
    description: 'walk my brown dog',
    price: 8.00,
    date: '07-06-2021',
    Status: 'Live'
  });

  console.log('jobs seeded');

  await WalkerJob.create({
    walker_id: 2,
    job_id: 0,
    apply: 1,
    select: 0
  });

  await WalkerJob.create({
    walker_id: 2,
    job_id: 1,
    apply: 1,
    select: 1
  });

  console.log('walker-jobs seeded');

  process.exit();
});
