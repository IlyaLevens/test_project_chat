import React from 'react'
import styles from '../styles/pages/Chat.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatPage from '../components/ChatPage';

function Chat()  {
  return (
    <div className={styles.grid_page}>
      <Header />
      <div className={styles.grid_main}>
        <div>friends</div>
        <div className={styles.chat_container}>
          <ChatPage />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Chat;