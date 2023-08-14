import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../..';

const FriendList = () => {
  const [user] = useAuthState(auth as any);
  //get user friends
  const [friends, setFriends] = useState<DocumentData>();
  firestore.collection('UserData').doc(user?.uid).collection('UserFriends').onSnapshot((snapshot) => {

    const friends = snapshot.docs.map((doc) => ({
      id: doc.id,
      uid: doc.get('uid'),
      username: doc.get('username')
    }));
    setFriends(friends);
  })


  return (
    <div>
      {friends?.map((friend: any) => {
        return (
          <div key={friend.id}>
            <div>{friend.username}</div>
          </div>
        )
      })}
    </div>
  )
}

export default FriendList;