import React from 'react';
import Auth from '../components/Auth';
import Footer from '../components/Footer';
import styles from '../styles/pages/LoginPage.module.scss'

const LoginPage = () => {
  return (    
    <div className={styles.grid_loginpage}>
      <Auth />
      <Footer />
    </div>
  )
}

export default LoginPage