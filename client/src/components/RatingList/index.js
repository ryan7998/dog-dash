import React, { useState, useEffect } from "react";
//import ProfileData from "../ProfileData";
//import { useStoreContext } from "../../utils/GlobalState";
import { useParams } from 'react-router-dom'
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_RATINGS } from "../../utils/queries";


function RatingList({ _id }) {
  //  GET LOGGED IN USER INFO
  let [rating, setRating] = useState({});
  let data0 = useQuery(QUERY_RATINGS);

  const userID = Auth.getProfile().data._id;
  const urlID = useParams().id;
  console.log(_id);
  useEffect(() => {
    setRating(data0?.data?.ratings || {});
    console.log(data0?.data?.ratings);
  }, [data0], urlID);

  console.log(rating);

  function filterRatings() {
    // if (!currentCategory) {
    //   return state.products;
    // }
    if (rating){
       //const ratings = rating.filter(rating => rating._id == "60a4609e18870a3cecf3fece");
    //    const ratings = rating.filter(function (el) {
    //     return el.rated_id  
    //   });
       const ratings = rating;
    console.log(ratings); 
    }
    
    return
  }

  //console.log(filterRatings());
 

  return (
    <div className="flex-row">
       Rating Test
    </div>
  );
}
export default RatingList;