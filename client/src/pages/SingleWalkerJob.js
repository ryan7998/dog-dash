import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_JOB_BYID } from '../utils/queries';


const SingleWalkerJob = props => {
  const { id: walkerJobId } = useParams();

  const { loading, data } = useQuery(QUERY_JOB_BYID, {
    variables: { id: walkerJobId }
  });

  const walkerjob = data?.jobById || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <h2> Made it to the singe user page</h2>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {walkerjob.title}
          </span>
          <br />
          <p>Job description: {walkerjob.description}</p>
        </p>
        <div className="card-body">
          <p>Status: {walkerjob.status}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleWalkerJob;