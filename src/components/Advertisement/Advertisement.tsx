import React, { FC } from 'react';
import styles from './Advertisement.module.css';
import Image from 'next/image';

const Advertisement: FC = () => {
  return (
    <section className={styles.section}>
      <div className={styles.imgContainer}>
        <div className={styles.bigImage}>
          <Image
            src="/images/Artboard-52.webp"
            alt="пленки"
            width={800}
            height={600}
            priority={true}
          />
        </div>
        <div className={styles.smallImage}>
          <Image src="/images/dippa_gw1.webp" alt="чернила" width={300} height={200} />
        </div>
        <div className={styles.smallImage}>
          <Image src="/images/smchemi1.webp" alt="скотч" width={300} height={200} />
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
