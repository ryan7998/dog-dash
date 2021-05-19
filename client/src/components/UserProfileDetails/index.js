import React from 'react';
import ProfileData from '../ProfileData';
import JobItem from '../JobItem';

const UserProfileDetails = ({profileData}) =>{

    // Destructure profile Data:
    const {
        _id,
        firstName,
        lastName,
        email,
        address,
        description,
        image,
        ratingAvg,
        type,
        submittedJobs,
        appliedJobs,
        selectedJobs,
        orders
    } = profileData;

    // get the type of user:
    const userIsWalker = (type === 'Dog Walker');
    
  return (
      <>
    <div className="flex-row">
    
      <ProfileData
        key={_id}
        _id={_id}
        firstName={firstName}
        lastName={lastName}
        description={description}
        address={address}
        email={email}
        image={image}
        ratingAvg={ratingAvg}
        type={type}
        hideJobButton = {true}
      />
    </div>
    {/* if user is a walker show number of jobs completed: */}
    {userIsWalker && (
        <div className="flex-row">
            Total Jobs, {firstName} Completed: <b>{selectedJobs.length}</b>
        </div>
    )}
    {/* if user is owner show number of posts: */}
    {!userIsWalker && (
        <div>Total Hires: {orders.length}</div>
    )}
    </>
  );
}

export default UserProfileDetails;