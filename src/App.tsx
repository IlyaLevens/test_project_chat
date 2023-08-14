import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/ChatPage';
import NotFound from './pages/NotFound';
import Paths from './components/utils/constants';
import { useAuthState } from 'react-firebase-hooks/auth'
import { useSelector } from 'react-redux';
import { auth } from '.';
import PrivateRoute from './components/CustomRoutes/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Loading from './components/Loading';
import UserProfile from './pages/UserProfile';
//import { auth } from '.';


function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, loading] = useAuthState(auth as any);

  var logged_in = useSelector<any, boolean>(state => state.AuthSlice.logged_in);

  if (loading) {
    return <Loading />
  } else { 
    return (
      <div>
        <Routes>
          {/* path for main page */}
          <Route path={Paths.MAIN_PAGE_ROUTE} element={<Home />}/>
          {/* private path for chat page */}
          {logged_in && user ?
            <Route path={Paths.CHAT_PAGE_ROUTE} element={<Chat />}/>
            :
            <Route path={Paths.CHAT_PAGE_ROUTE} element={<PrivateRoute path={Paths.LOGIN_PAGE_ROUTE}/>}>
              <Route path={Paths.CHAT_PAGE_ROUTE} element={<Chat />}/>
            </Route>          
          }
          {/* private path for UserProfile page */}
          {logged_in && user ?
            <Route path={Paths.USERPROFILE_PAGE_ROUTE} element={<UserProfile />}/>
            :
            <Route path={Paths.USERPROFILE_PAGE_ROUTE} element={<PrivateRoute path={Paths.LOGIN_PAGE_ROUTE}/>}>
              <Route path={Paths.USERPROFILE_PAGE_ROUTE} element={<UserProfile />}/>
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
