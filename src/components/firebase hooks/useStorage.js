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
    uploadBytes(storageRef, file).then((snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, getDownloadURL(storageRef)
    .then((url) => {

      const createdAt = timestamp
      addDoc(collectionRef, { url: url, createdAt: createdAt})
      setUrl(url);
    }));
  }, [file]);

  return { progress, url, error};
}

export default useStorage;