import React from 'react'
import Footer from '../components/Footer';
import Header from '../components/Header';
import styles from '../styles/pages/Home.module.scss';

function Home()  {
  
  return (
    <div className={styles.grid_page}>
      <Header />
      <div className={styles.enterPhrase}>
        {/* <Loading /> */}
      </div>
      <Footer />
    </div>
  )
}

export default Home;