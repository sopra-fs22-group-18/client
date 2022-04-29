import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';

const ProgressBar = ({ file, setFile, setImageUrl}) => {
  const { url} = useStorage(file);
  console.log(url);

  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url, setFile, setImageUrl]);

  return (
      <img src="" alt="" id="image">
      </img>
  );
} 

export default ProgressBar;