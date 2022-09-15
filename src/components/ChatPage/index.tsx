import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore } from '../..';
import { auth } from '../..';
import styles from '../../styles/components/ChatPage/ChatIndex.module.scss'
import input_styles from '../../styles/components/ChatPage/ChatInput.module.scss'
import firebase from "firebase/compat/app";
import Loading from '../Loading';

const Index = () => {
  const [user, loading] = useAuthState(auth as any);
  console.log(user);
  const chatFormRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  //getting data from firebase
  const [messages, setMessages] = useState<{id: string; email:  string; username: string; text: string}[]>([])
  useEffect(() => {
    firestore
    .collection('messages')
    .orderBy('createdAt')
    .onSnapshot((snapshot) =>{
      const messages = snapshot.docs.map((doc) =>({
        id: doc.id,
        email: doc.get('email'),
        username: doc.get('username'),
        text: doc.get('text')
      }))
      setMessages(messages);
    })
  },[]) 
  
  
  //sending message
  const sendMessage = async (event: any) => {   
    event?.preventDefault();
    firestore.collection('messages').add({
      uid: user?.uid,     
      email: user?.email,
      username: user?.displayName,
      text: messageRef.current?.value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).catch(err => {console.log(err)})    
    chatFormRef.current?.reset();
  }
  if (loading) {
    console.log(`loading chat`)
    return <Loading />
  }
 
  return (
    <div className={styles.grid_chat}>
      <div className={styles.chat_zone}>
        {messages.map(message => 
          <div key={message.id}>
            <div>{message.username}</div>
            <div>{message.text}</div>
          </div>
        )}
      </div>
      <div className={styles.bottom_chat_row}>
        <form ref={chatFormRef} onSubmit={sendMessage} action=''>
          <input ref={messageRef} className={input_styles.input} type='text' name='chat_input' placeholder='Enter a massage...' />
          <button type='submit'>send</button>
        </form>
      </div>
    </div>
  )
}

export default Index;

