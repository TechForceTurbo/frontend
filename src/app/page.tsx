'use client'
import MainButton from '@/components/MainButton/MainButton'
import styles from './page.module.css'

import { Provider } from 'react-redux'
import store from '../store/store'

export default function Home () {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <MainButton />
      </main>
    </Provider>
  )
}
