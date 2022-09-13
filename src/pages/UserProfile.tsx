import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '..';
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/pages/UserProfilePage.module.scss';

const UserProfile = () => {
  const [user] = useAuthState(auth as any);


  return (
    <div className={styles.grid_page}>
      <Header />
      <div className={styles.main_centering}>
        <div className={styles.ProfileCard}>
          <div></div>
          <div>{user?.email}</div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserProfile;