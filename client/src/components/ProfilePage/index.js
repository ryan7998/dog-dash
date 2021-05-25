import React, { useState, useEffect } from "react";
import ProfileData from "../ProfileData";

import { useQuery } from "@apollo/react-hooks";
import { QUERY_USER } from "../../utils/queries";

import RatingList from "../RatingList";


function ProfilePage() {
  //  GET LOGGED IN USER INFO
  let [me, setMe] = useState({});
  let userMe = useQuery(QUERY_USER);

  useEffect(() => {
    // console.log("This is me: ", me);
    setMe(userMe?.data?.user || {});
  }, [userMe]);


  // const me = userMe?.data?.user || {};

  return (
    <div className="flex-row">
      <ProfileData
        key={me._id}
        _id={me._id}
        firstName={me.firstName}
        lastName={me.lastName}
        description={me.description}
        address={me.address}
        email={me.email}
        image={me.image}
        receivedRate={me.receivedRatings}
        ratingAvg={me.ratingAvg}
        type={me.type}
      />
      {me._id && (
          <div>
            <RatingList _id={me._id}/>
          </div>
        )}
    </div>
  );
}
export default ProfilePage;
