import { addDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { getStorage, ref, deleteObject } from "firebase/storage";

const deleteFile = (fileUrl) => {

    if (fileUrl != null) {
    const storage = getStorage();

    // Create a reference to the file to delete
    const fileRef = ref(storage, fileUrl);
    

    // Delete the file
    deleteObject(fileRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });

  }
}

export default deleteFile;