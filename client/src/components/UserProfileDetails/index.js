import React from 'react';
import ProfileData from '../ProfileData';

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

    console.log(_id,
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
        orders);

  return (
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
  );
}

export default UserProfileDetails;