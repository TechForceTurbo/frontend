'use client'
import MainButton from '@/components/MainButton/MainButton'
import styles from './page.module.css'

import { Provider } from 'react-redux'
import store from '@/redux/store'
import MainMenu from '@/components/MainMenu/MainMenu'
import ChatDialog from '@/components/ChatDialog/ChatDialog'
import Header from '../components/Header/Header'

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <Header />
        <MainMenu />
        <MainButton />
        <ChatDialog />
      </main>
    </Provider>
  )
}
