import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';

const ProgressBar = ({ file, setFile, setImageUrl}) => {
  const { progress, url} = useStorage(file);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
      setImageUrl(url);
    }
  }, [url, setFile]);

  return (
      <img src="" alt="" id="image" >
      </img>
  );
} 

export default ProgressBar;