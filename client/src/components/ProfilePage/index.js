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



  return (
    <div>
      <ProfileData profileData={me}/>
      <RatingList _id={me._id}/>
    </div>
  );
}
export default ProfilePage;
