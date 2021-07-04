import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";
import { QUERY_JOB_BY_STATUS } from "../../utils/queries";


import {
    APPLY_JOB,
    WITHDRAW_JOB
  } from "../../utils/mutations";

function WalkerBtn({_id, applied}){

    const [applyJob] = useMutation(APPLY_JOB);
    const [withdrawJob] = useMutation(WITHDRAW_JOB);

    const applyForJob = async () => {
        // console.log(_id);
        try{
          await applyJob({
            variables: { job_id: _id },
            refetchQueries: [{query: QUERY_JOB_BY_STATUS, variables: { status: 'Live' }}]
          });
        } catch (e) {
          console.error(e);
        }
      };
    
      const withdrawFromJob = async () => {
        try {
          await withdrawJob({
            variables: { job_id: _id },
            refetchQueries: [{query: QUERY_JOB_BY_STATUS, variables: { status: 'Live' }}]
          });
        } catch (e) {
          console.error(e);
        }
      };
    return(
        <>{!applied ? 
            <>
                <Button color="green" onClick={applyForJob}>
                    Apply
                </Button>
            </> :
            <>
                <div>You have already applied</div>
                <Button color="red" onClick={withdrawFromJob}>
                    Withdraw
                </Button>      
            </>
        }
        </>
        )
}
export default WalkerBtn;
