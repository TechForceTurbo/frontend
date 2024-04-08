import { useDispatch } from 'react-redux';
import styles from './FeedbackButtons.module.css';
import React, { FC, useState } from 'react';
import { openFeedbackForm } from '@/redux/reducers/feedbackFormSlice';

const FeedbackButtons: FC = () => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeClick = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
    } else {
      setLiked(false);
    }
  };

  const handleDislikeClick = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      dispatch(openFeedbackForm());
    } else {
      setDisliked(false);
    }
  };

  return (
    <div className={styles.box}>
      <p className={styles.question}>Ответ был полезен?</p>
      <button
        type="button"
        className={`${styles.likeButton} ${liked ? styles.active : ''}`}
        onClick={handleLikeClick}
        aria-label="Ответ понравился"
      />
      <button
        type="button"
        className={`${styles.dislikeButton} ${disliked ? styles.active : ''}`}
        onClick={handleDislikeClick}
        aria-label="Ответ не понравился"
      />
    </div>
  );
};

export default FeedbackButtons;
