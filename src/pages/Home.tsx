import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import styles from '../styles/pages/Home.module.scss';

function Home()  {
  
  return (
    <div className={styles.grid_page}>
      <Header />
      <div className={styles.enterPhrase}>
        <div>Welcome!</div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;