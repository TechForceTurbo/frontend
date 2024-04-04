'use client'
import MainButton from '@/components/MainButton/MainButton'
import styles from './page.module.css'

import { Provider } from 'react-redux'
import store from '@/redux/store'
import MainMenu from '@/components/MainMenu/MainMenu'
import ChatDialog from '@/components/ChatDialog/ChatDialog'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import Advertisement from '../components/Advertisement/Advertisement'

export default function Home() {
  return (
    <Provider store={store}>
      <Header />
      <main className={styles.main}>
        <Advertisement />
        <MainMenu />
        <MainButton />
        <ChatDialog />
      </main>
      <Footer />
    </Provider>
  )
}
