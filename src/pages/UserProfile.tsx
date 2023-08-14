import { DocumentData } from 'firebase/firestore';
import React, { useState } from 'react'
import Avatar from '../components/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '..';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/pages/UserProfilePage.module.scss';

const UserProfile = () => {
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
    <div className={styles.grid_page}>
      <Header />
      <div className={styles.main_centering}>
        <div className={styles.ProfileCard}>
          <Avatar />
          <h1>friends:</h1>
          {friends?.map((friend: any) => {
            return (
              <div key={friend.id}>
                <div>{friend.username}</div>
              </div>
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile;