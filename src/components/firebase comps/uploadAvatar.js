import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';
import {api, handleError} from "../../helpers/api";

const UploadAvatar = ({ file, setFile, setAvatarUrl}) => {
  const {url} = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      setAvatarUrl(url);
    }
  }, [url, setFile, setAvatarUrl]);


  return (
   <text>Avatar has been uploaded!</text>
  );
} 

export default UploadAvatar;gi