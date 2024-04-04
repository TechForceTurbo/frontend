import React, { FC } from 'react'
import styles from './Advertisement.module.css'

const Advertisement: FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.imgContainer}>
        <div className={styles.bigImage}>
          <img src="/images/Artboard-52.webp" alt="пленки" />
        </div>
        <div className={styles.smallImage}>
          <img src="/images/dippa_gw1.webp" alt="чернила" />
        </div>
        <div className={styles.smallImage}>
          <img src="/images/smchemi1.webp" alt="скотч" />
        </div>
      </div>
    </section>
  )
}

export default Advertisement
