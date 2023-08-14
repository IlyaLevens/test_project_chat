import React, { useEffect, useState } from 'react'
import styles from '../styles/components/Footer.module.scss'

function Footer()  {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    function handleOnlineStatus() {
      setOnlineStatus(navigator.onLine);
    }

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  return (
    <div className={styles.background}>
      <div>
        <h1>{onlineStatus ? 'Online' : 'Offline'}</h1>
      </div>
    </div>
  )
}

export default Footer;