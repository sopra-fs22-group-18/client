import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';
import deleteFile from '../firebase comps/deleteFile';
import {api, handleError} from "../../helpers/api";

const UploadAvatar = ({ file, setFile, avatarUrl, setAvatarUrl}) => {
  const {url} = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      deleteFile(avatarUrl);
      setAvatarUrl(url);
    }
  }, [url, setFile, setAvatarUrl]);


  return (
    <b>The avatar has been uploaded!</b>
  );
} 

export default UploadAvatar;