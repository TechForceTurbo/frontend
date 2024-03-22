'use client';
import MainButton from '@/components/MainButton/MainButton';
import styles from './page.module.css';

import { Provider } from 'react-redux';
import store from '@/store/store';
import MainMenu from '@/components/MainMenu/MainMenu';

export default function Home() {
  return (
    <Provider store={store}>
      <main className={styles.main}>
        <MainMenu />
        <MainButton />
      </main>
    </Provider>
  );
}
