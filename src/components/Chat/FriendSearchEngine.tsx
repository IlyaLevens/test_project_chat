import React from 'react'
import styles from '../../styles/components/ChatPage/FriendSearchEngine.module.scss'

const FriendSearchEngine = () => {
  return (
    <input type='text' className={styles.input} placeholder='Search for friends...'/>
  )
}

export default FriendSearchEngine;