import React, { useRef, useState } from "react";
import S3 from "react-aws-s3";
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from "./mutations";



// require('dotenv').config();

function Upload() {

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const fileInput = useRef();
  const handleClick = (event) => {
    event.preventDefault();
    let file = fileInput.current.files[0];
    if (file) {
      
    let newFileName = fileInput.current.files[0].name.replace(/\..+$/, "");
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success");
        console.log(data.location);
        try{
          const user = updateUser({
              variables:{
                  image: data.location,
              }
          }) 
        } catch(e){
            console.log(e, error);
        };
      } else {
        console.log("fail");
      }
    });

   
      try{
          const user = updateUser({
              variables:{
                  image: `https://dogdash.s3.us-east-2.amazonaws.com/${newFileName}`,
              }
          }) 
      } catch(e){
          console.log(e, error);
      };
  }


}
    
    
 
  return (
    <>
      <form className='upload-steps'>
        <label>
        ✏
          <input type='file' ref={fileInput} onChange={handleClick} hidden/>
        </label>     
      </form>
    </>
  );
};

export default Upload;
