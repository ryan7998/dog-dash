import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";

import {
    APPLY_JOB,
    WITHDRAW_JOB
  } from "../../utils/mutations";

function WalkerBtn({_id}){

    const [applyJob] = useMutation(APPLY_JOB);
    const [withdrawJob] = useMutation(WITHDRAW_JOB);

    const applyForJob = async () => {
        // console.log(_id);
        try{
          await applyJob({
            variables: { job_id: _id },
          });
        } catch (e) {
          console.error(e);
        }
        // window.location.reload(false);
      };
    
      const withdrawFromJob = async () => {
        try {
          await withdrawJob({
            variables: { job_id: _id },
          });
        } catch (e) {
          console.error(e);
        }
        window.location.reload(false);
      };
    return(
        <>
            <Button color="green" onClick={applyForJob}>
                Apply
            </Button>
            <Button color="red" onClick={withdrawFromJob}>
                Withdraw
            </Button>
        </>
        )
}
export default WalkerBtn;
