import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import firebase from "firebase/compat/app";
import styles from '../../styles/components/Auth.module.scss';
import { auth, firestore } from '../../index'
import { IsLoggedin, SetEmail, Setusername } from '../../redux/Slices/AuthSlice';
import { useNavigate } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import Paths from '../utils/constants';
import { animated, Spring } from 'react-spring';
import { Link } from 'react-router-dom';
import page_styles from '../../styles/pages/LoginPage.module.scss';

function Auth() {
  //redux
  const dispatch = useDispatch();
  var logged_in = useSelector<any, boolean>(state => state.AuthSlice.logged_in);

  //signinRefs
  const signinemailRef = useRef<HTMLInputElement>(null);
  const signinpasswordRef = useRef<HTMLInputElement>(null);
  //signupRefs  
  const signupemailRef = useRef<HTMLInputElement>(null); 
  const signuppasswordRef = useRef<HTMLInputElement>(null);
  const SigninformRef = useRef<HTMLFormElement>(null);
  const SignupformRef = useRef<HTMLFormElement>(null);
  const UserNameRef = useRef<HTMLInputElement>(null);

  const [LogformVisible, setLogformVisibility] = useState(false);

  //navigation
  const navigate = useNavigate();

  //login functions
  const loginwithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider);
    logged_in = true;
    dispatch(Setusername(user.user?.displayName));
    dispatch(IsLoggedin(logged_in));   
    dispatch(SetEmail(user.user?.email));
    console.log(user);
    navigate(Paths.MAIN_PAGE_ROUTE);
  }
  
  const SignupwithEmail = async (event: any) => {
    event?.preventDefault();
    const Username = UserNameRef?.current?.value;
    auth.createUserWithEmailAndPassword(
      signupemailRef?.current?.value ?? 'no-value',
      signuppasswordRef?.current?.value ?? 'no-value',
    ).then(user=>{
      console.log(user);
      user.user?.updateProfile({
        displayName: Username
      })
      logged_in = true;  
      // firestore.collection('UserData').add({
      //   uid: user.user?.uid,
      //   username: Friends
      // })
      // .catch(err => {console.log(err)}); 
      dispatch(Setusername(Username));     
      dispatch(IsLoggedin(logged_in));  
      dispatch(SetEmail(user.user?.email)); 
      SignupformRef?.current?.reset();    
    }).catch(err=>{
      console.log(err);     
    })    
  }
  
  // const docRef = doc(firestore, 'UserData', 'JkikGs60L2QowD7TdvS9');
  // getDoc(docRef).then((doc) => {
  //   console.log(doc);
  // });


  const SigninwithEmail = async (event: any) => {
    event?.preventDefault();
    auth.signInWithEmailAndPassword(
      signinemailRef?.current?.value ?? 'no-value',
      signinpasswordRef?.current?.value ?? 'no-value',
    ).then(user=>{
      console.log(user);
      logged_in = true;
      dispatch(IsLoggedin(logged_in));      
      dispatch(SetEmail(user?.user?.email));
      SigninformRef?.current?.reset();          
    }).catch(err=>{
      console.log(err);
    })   
  }

  const logout = async () => {
    auth.signOut();
    logged_in = false;
    dispatch(IsLoggedin(logged_in));
    dispatch(Setusername(''));
    dispatch(SetEmail('')); 
    navigate(Paths.MAIN_PAGE_ROUTE);
  } 


  return (
    <div>
      <Link to={Paths.MAIN_PAGE_ROUTE}>Main Page</Link>
      <div className={styles.auth_button}>      
        {logged_in ?
          <button onClick={logout}>sign out</button>
          :
          <>
            <button onClick={() => setLogformVisibility(!LogformVisible)}>sign in with email</button>          
            <button onClick={loginwithGoogle}>sign in with Google</button>
          </>       
        }        
      </div>
      {logged_in ?
          <div></div>
        :
        <div className={page_styles.main_centering}>
          <Spring
            from={{opacity: 0}}
            to={{opacity: 1}}
            config={{duration: 2000}}
            reset={LogformVisible}
          >
            {(props: any) => (
              <div style={{display: 'flex'}}>   
                <div className={page_styles.si_form}>          
                  <animated.form style={props} ref={SigninformRef} action='' className={page_styles.form}>
                    <label htmlFor="si-email">Email</label>
                    <input type='email' ref={signinemailRef}/>
                    <label htmlFor="password">Password</label>
                    <input type='password' ref={signinpasswordRef}/>
                    <button className={page_styles.btn} onClick={SigninwithEmail}>Sign in</button>                
                  </animated.form>
                </div> 
                <div className={page_styles.su_form}>
                  <animated.form style={props} ref={SignupformRef} action='' className={page_styles.form}>
                    <label htmlFor="su-name">Name</label>
                    <input type='text' ref={UserNameRef}/>
                    <label htmlFor="su-email">Email</label>
                    <input type='email' ref={signupemailRef} required/>
                    <label htmlFor="su-password">Password</label>
                    <input type='password' ref={signuppasswordRef} required/>
                    <button className={page_styles.btn} onClick={SignupwithEmail}>Sign up</button>           
                  </animated.form>
                </div>                                                             
              </div>
            )}
          </Spring>                
        </div>
      }
    </div>
  )
}

export default Auth;