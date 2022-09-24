import React from 'react'
import styles from '../styles/pages/Chat.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chat from '../components/Chat';
import FriendSearchEngine from '../components/Chat/FriendSearchEngine';
import FriendList from '../components/Chat/FriendList';

function ChatPage()  {
  return (
    <div className={styles.grid_page}>
      <Header />
      <div className={styles.grid_main}>
        <div className={styles.friend_list}>
          <FriendSearchEngine />
          <FriendList />
        </div>       
        <div className={styles.chat_container}>
          <Chat />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ChatPage;