import { updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat';
import React, { useState } from 'react'
import Avatar from 'react-avatar-edit';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '..';

function UserAvatar() {
  const [user] = useAuthState(auth as any);
  const [preview, setPreview] = useState(null);
  function onClose() {
    setPreview(null);
  }
  function onCrop(pv: any) {
    setPreview(pv);
  }
  function onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 1026800) {
      alert("File is too big!");
      elem.target.value = "";
    }
  }
  function onFileLoad(elem:any) {
    updateProfile(user!, {
      photoURL: elem.target.value,
    })
    console.log(user);
  }
  
  return (
    <div>
      <Avatar
        width={300}
        height={300}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        onFileLoad={onFileLoad}
        src={null as unknown as string}
      />
      {preview && <img src={preview} alt="Preview" />}
    </div>
  );
}

export default UserAvatar;