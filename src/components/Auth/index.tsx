import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import firebase from "firebase/compat/app";
import styles from '../../styles/components/Auth.module.scss';
import { auth } from '../../index'
import { IsLoggedin, SetEmail } from '../../redux/Slices/AuthSlice';
import { useNavigate } from 'react-router';
import Paths from '../utils/constants';
import { animated, Spring } from 'react-spring';
import { Link } from 'react-router-dom';

function Auth() {
  //redux
  const dispatch = useDispatch();
  var logged_in = useSelector<any, boolean>(state => state.AuthSlice.logged_in);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const logformRef = useRef<HTMLFormElement>(null);

  const [LogformVisible, setLogformVisibility] = useState(false);

  console.log(`visibility - ${LogformVisible}`);
  //navigation
  const navigate = useNavigate();

  //login functions
  const loginwithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await auth.signInWithPopup(provider);
    logged_in = true;
    dispatch(IsLoggedin(logged_in));   
    dispatch(SetEmail(user.user?.email));
    console.log(user);
    navigate(Paths.MAIN_PAGE_ROUTE);
  }

  const SignupwithEmail = async (event: any) => {
    event?.preventDefault();
    auth.createUserWithEmailAndPassword(
      emailRef?.current?.value ?? 'no-value',
      passwordRef?.current?.value ?? 'no-value',
    ).then(user=>{
      console.log(user);
      logged_in = true;
      dispatch(IsLoggedin(logged_in));  
      dispatch(SetEmail(user.user?.email));
      logformRef?.current?.reset();
    }).catch(err=>{
      console.log(err);
    })
    //navigate(Paths.MAIN_PAGE_ROUTE);
  }

  const SigninwithEmail = async (event: any) => {
    event?.preventDefault();
    auth.signInWithEmailAndPassword(
      emailRef?.current?.value ?? 'no-value',
      passwordRef?.current?.value ?? 'no-value',
    ).then(user=>{
      console.log(user);
      logged_in = true;
      dispatch(IsLoggedin(logged_in));      
      dispatch(SetEmail(user?.user?.email));     
      logformRef?.current?.reset();
    }).catch(err=>{
      console.log(err);
    })
    //navigate(Paths.MAIN_PAGE_ROUTE);
  }

  const logout = async () => {
    auth.signOut();
    logged_in = false;
    dispatch(IsLoggedin(logged_in));
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
      <div className={styles.SignInForm}>
        <div>
          <Spring
            from={{opacity: 0}}
            to={{opacity: 1}}
            config={{duration: 2000}}
            reset={LogformVisible}
          >
            {(props: any) => (
              <animated.form style={props} ref={logformRef} action=''>
                <input type='text' ref={emailRef}/>
                <input type='text' ref={passwordRef}/>
                <button onClick={SignupwithEmail}>Sign up</button>
                <h4>Already registered?</h4> 
                <button onClick={SigninwithEmail}>Sign in</button>                
              </animated.form>
            )}
          </Spring>                
        </div>
      </div>
    </div>
  )
}

export default Auth;