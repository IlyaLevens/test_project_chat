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
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView(
        {
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest'
        })
    }
  }

  //getting data from firebase
  const [messages, setMessages] = useState<{id: string; email:  string; username: string; text: string; uid: string}[]>([]);
  const getMessages = async () => {
    firestore
    .collection('messages')
    .orderBy('createdAt')
    .onSnapshot((snapshot) =>{
      const messages = snapshot.docs.map((doc) =>({
        id: doc.id,
        uid: doc.get('uid'),
        email: doc.get('email'),
        username: doc.get('username'),
        text: doc.get('text')
      }))
      setMessages(messages);
      scrollToBottom();
    }) 
  }
  useEffect(() => {
    getMessages(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) 
  useEffect(() => {
    scrollToBottom();
  },[messages]) 
  
  //sending message
  const sendMessage = async (event: any) => {   
    event?.preventDefault();
    if (messageRef.current?.value) {
      firestore.collection('messages').add({
        uid: user?.uid,     
        email: user?.email,
        username: user?.displayName,
        text: messageRef.current?.value,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {scrollToBottom();}).catch(err => {console.log(err)});
      chatFormRef.current?.reset();
    }
  }
  if (loading) {
    console.log(`loading chat`);
    return <Loading />
  }
 
  return (
    <div className={styles.grid_chat}>
      <div className={styles.chat_zone}>
        <div className={styles.grid_chatzone}>
            <div className={styles.outer_border}>
              <div className={styles.inner_border}>
                  <div className={styles.content}>
                    {messages.map(message => {
                      return (
                        message.uid === user?.uid
                        ?
                          <div key={message?.id} className={styles.UserMessage}>
                            <div className={styles.UserMessageBox}>
                              <div>{message.username}</div>
                              <div className={styles.UserMessageText}>{message.text}</div>
                            </div>
                          </div>              
                        :
                          <div key={message?.id} className={styles.OtherMessage}>
                            <div className={styles.OtherMessageBox}>
                              <div>{message.username}</div>
                              <div className={styles.OtherMessageText}>{message.text}</div>
                            </div>                
                          </div> 
                      )
                      })
                    }
                    <div ref={messagesEndRef}></div>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <div className={styles.bottom_chat_row}>
        <form ref={chatFormRef} onSubmit={sendMessage} style={{display: 'flex', width: 400}}action=''>
          <input ref={messageRef} className={input_styles.input} type='text' name='chat_input' placeholder='Enter a massage...' />
          <button type='submit'>send</button>
        </form>
      </div>
    </div>
  )
}

export default Index;

