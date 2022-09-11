import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({path}: {path: string}) => {
    
  var logged_in = useSelector<any, boolean>(state => state.AuthSlice.logged_in);

  console.log(logged_in);
  return (    
    <>
      {logged_in ?
          <Outlet />
        :
          <>
            <Navigate to={path} replace/>
          </>
      } 
    </>   
  )
}

export default PrivateRoute