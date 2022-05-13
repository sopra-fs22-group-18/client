import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';
import {api, handleError} from "../../helpers/api";

const UploadAvatar = ({ file, setFile, setAvatarUrl, userId}) => {
  const {url} = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      setAvatarUrl(url);
      
      const updateAvatar = async () => {
        try {
            const requestBody = JSON.stringify({url});
            const response = await api.put('/users/' + userId, requestBody);
    

        } catch (error) {
            alert(`Something went wrong when trying to update the avatarUrl: \n${handleError(error)}`);
        }
        updateAvatar();
      }
    }
  }, [url, setFile, setAvatarUrl]);


  return (
      <img src="" alt="" id="image">
      </img>
  );
} 

export default UploadAvatar;