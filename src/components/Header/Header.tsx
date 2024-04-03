import { FC } from 'react'

import styles from './Header.module.css'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logo} aria-label="mainpage"></a>
      </div>
    </header>
  )
}

export default Header
