import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../..';


const PrivateRoute = ({path}: {path: string}) => {
  const [user] = useAuthState(auth as any); 
  var logged_in = useSelector<any, boolean>(state => state.AuthSlice.logged_in);

  console.log(logged_in);
  return (    
    <>
      {logged_in && user ?
          <Outlet />
        :
          <>
            <Navigate to={path} replace/>
          </>
      } 
    </>   
  )
}

export default PrivateRoute;