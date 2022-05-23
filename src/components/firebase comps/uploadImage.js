import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';
import deleteFile from '../firebase comps/deleteFile';

const ProgressBar = ({ file, setFile, imageUrl, setImageUrl}) => {
  const { url} = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      deleteFile(imageUrl);
      setImageUrl(url);
    }
  }, [url, setFile, setImageUrl]);

  return (
      <img src="" alt="" id="image">
      </img>
  );
} 

export default ProgressBar;