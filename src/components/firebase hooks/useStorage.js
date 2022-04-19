import { addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { storage, ref, uploadBytes, getDownloadURL, firestore, timestamp, collection} from '../../firebase/config';

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);


  useEffect(() => {
    // references

    const storageRef = ref(storage, file.name);
    const collectionRef = collection(firestore, 'images');


    uploadBytes(storageRef, file).then(
      () =>{
        getDownloadURL(storageRef).then(function(url){
          console.log(url);

        const img = document.getElementById('image');
        img.src = url
          
        const createdAt = timestamp
        addDoc(collectionRef, {
          url, 
          createdAt
        });

      }
    );
    });
  }, [file]);

  return { progress, url, error};
}

export default useStorage;