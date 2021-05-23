import React, { useState, useEffect } from "react";
//import ProfileData from "../ProfileData";
//import { useStoreContext } from "../../utils/GlobalState";
import { useParams } from 'react-router-dom'
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_RATINGS } from "../../utils/queries";
import RatingItem from "../RatingItem";
import {
    List
  } from 'semantic-ui-react';

function RatingList() {
  //  GET LOGGED IN USER INFO
  let [rating, setRating] = useState({});
  let data0 = useQuery(QUERY_RATINGS);

  const userID = Auth.getProfile().data._id;
  const urlID = useParams().id;
  //console.log(_id);
  useEffect(() => {
    setRating(data0?.data || {});
    //console.log(data0?.data);
  }, [data0], urlID);

  console.log(rating);
  console.log(data0?.data);
  const ratings = rating;

  function filterRatings(ratings) {
    if (!ratings) {
      return rating;
    }
    console.log("Start");
    return ratings.ratings.filter(obj => {
        console.log(obj);
        return obj.rated_id._id == userID
    });
  }

console.log(filterRatings(data0?.data));
  return (
    <div className="flex-row">  
       {data0?.data ? (
           <div className='ratingList'>
               <List divided relaxed verticalAlign="middle" >
               
               </List>
            </div>
       ) : (
        <h3>No ratings yet!</h3>
       )}
       
    </div>
  );
}
export default RatingList;