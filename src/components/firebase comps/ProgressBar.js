import React, { useEffect } from 'react';
import useStorage from '../firebase hooks/useStorage';

const ProgressBar = ({ file, setFile}) => {
  const { progress, url} = useStorage(file);
  console.log(progress, url);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <h1>posted</h1>
  );
} 

export default ProgressBar;