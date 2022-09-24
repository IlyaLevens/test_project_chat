import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth } from '..';
import styles from '../styles/components/Header.module.scss';

function Header()  {
  const [user] = useAuthState(auth as any);

  return (
    <div className={`${styles.grid_header} ${styles.background}`}>
      <p>title</p>
      <div className={styles.links}>
        <Link to='/'>Main page</Link>
        <Link to='/chat'>start chatting</Link>       
      </div>
      <div className={styles.links}>
        <Link to='/login'>Log in page</Link>
        {user ?
          <Link to='/profile'>{user.displayName}</Link>
          :
          <>
            <div>no user</div>
          </>
        }
        <div></div>
      </div>
    </div>
  )
}

export default Header;