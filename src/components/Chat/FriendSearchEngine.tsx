import { DocumentData } from 'firebase/firestore';
import React, { useCallback, useRef, useState } from 'react'
import { auth, firestore } from '../..';
import styles from '../../styles/components/ChatPage/FriendSearchEngine.module.scss'
import { useAuthState } from 'react-firebase-hooks/auth';
import debounce from 'lodash/debounce'

const FriendSearchEngine = () => {
  const [inputValue, setinputValue] = useState('');
  const SearchBarRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<DocumentData>();
  const [user] = useAuthState(auth as any);

  const onChangeInput = (event: any) => {
    event?.preventDefault();
    setinputValue(event.target.value);
    UpdateSearchValue(event.target.value);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const UpdateSearchValue = useCallback(
    debounce((value) => {
      Search(value);
    }, 500),
    []
  )

  const Search = async (value: any) => {
    if (value) {
      try {
        firestore
        .collection('UserData')
        .where('username', '==', value)
        .onSnapshot(snapshot => {
          const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.get('uid'),    
            username: doc.get('username')    
          }))
          setUsers(users);
          console.log(users)
        })  
      }catch(err) {
        console.log(err);
      }
    }
  }

  const AddFriend = async (friend_user: any) => {
    firestore.collection('UserData').doc(user?.uid).collection('UserFriends').doc(friend_user.uid).set({
      uid: friend_user.uid,
      username: friend_user.username
    })
  }
  

  return (
    <div>
      <div style={{display: 'flex'}}>
        {/*<input type='text' value={inputValue} ref={SearchBarRef} onChange={e => onChangeInput(e)} className={styles.input} placeholder='Search for friends...'/>*/}    
        <form className="search">
	        <label className="search__label" htmlFor="search">Search</label>
	        <div className="search__input-wrap">
		      <input className={styles.search__input} value={inputValue} id="search" ref={SearchBarRef} onChange={e => onChangeInput(e)} type="text" name="search" placeholder="Search…"/>
	</div>
</form>
      </div>
      <div className={styles.found_users}>       
        {users?.length !== 0 ? 
            users?.map((user: any) => {
              return (
                <div key={user.id} style={{display: 'flex'}}>
                  {user.username}
                  <button onClick={() => AddFriend(user)}></button>
                </div>
              )
            })
          : 
            <div>no users</div>
        }
      </div>
    </div>
  )
}

export default FriendSearchEngine;