import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import Paths from './components/utils/constants';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch, useSelector } from 'react-redux';
import { IsLoggedin } from './redux/Slices/AuthSlice';
import { auth } from '.';
import PrivateRoute from './components/CustomRoutes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Loading from './components/Loading';
//import { auth } from '.';


function App() {
  const dispatch = useDispatch();
 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading] = useAuthState(auth as any);

  var logged_in = useSelector<any, boolean>(state => state.AuthSlice.logged_in);
  
  function Change_logged_in_(boolean: boolean) {
    logged_in = !boolean;
  }
  
  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {      
      if (loading) {
        console.log(`loading`)
      }      
      if (user) {           
        Change_logged_in_(logged_in);
        dispatch(IsLoggedin(logged_in));    
      } else {
        console.log(`not logged_in`);
      }         
    })                
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Loading />
  } else { 
    return (
      <div>
        <Routes>
          {/* path for main page */}
          <Route path={Paths.MAIN_PAGE_ROUTE} element={<Home />}/>
          {/* private path for chat page */}
          {logged_in ?
            <Route path={Paths.CHAT_PAGE_ROUTE} element={<Chat />}/>
            :
            <Route path={Paths.CHAT_PAGE_ROUTE} element={<PrivateRoute path={Paths.LOGIN_PAGE_ROUTE}/>}>
              <Route path={Paths.CHAT_PAGE_ROUTE} element={<Chat />}/>
            </Route>          
          }
          {/* path for login page */}
          <Route path={Paths.LOGIN_PAGE_ROUTE} element={<LoginPage />}/>
          <Route path='*' element={<NotFound />}/>       
        </Routes>     
      </div>
    );
  }
}

export default App;
