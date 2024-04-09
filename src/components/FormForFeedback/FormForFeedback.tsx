import React, { useState } from 'react';
import styles from './FormForFeedback.module.css';
import { useDispatch } from 'react-redux';
import { closeFeedbackForm } from '@/redux/reducers/feedbackFormSlice';
import { sendFormData } from '@/utils/sendFormData';

const FormForFeedback: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isChecked) {
      return;
    }
    const session_id = localStorage.getItem('session_id');
    const data = {
      name,
      phone,
      session_uuid: session_id,
    };
    sendFormData(data)
      .then()
      .catch((error) => {
        console.log(error);
      });

    setFormSubmitted(true);
    setTimeout(() => {
      dispatch(closeFeedbackForm());
    }, 3000);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const pattern = /^[+]{0,1}[0-9]*$/;
    if (input === '' || pattern.test(input)) {
      setPhone(input);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${formSubmitted ? styles.formSubmitted : ''}`}
    >
      <button
        type="button"
        className={styles.closeButton}
        aria-label="закрыть форму сбора пд"
        onClick={() => {
          dispatch(closeFeedbackForm());
        }}
      />
      <h3 className={styles.title}>Давайте свяжемся и найдем более точный ответ!</h3>
      <input
        type="text"
        placeholder="Введите ваше имя"
        value={name}
        onChange={handleNameChange}
        required
        maxLength={30}
        minLength={2}
        className={styles.input}
      />
      <input
        type="tel"
        placeholder="Введите ваш телефон"
        value={phone}
        onChange={handlePhoneChange}
        required
        className={styles.input}
        maxLength={15}
        minLength={2}
      />
      <label className={styles.label}>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} required />
        <p>
          Я согласен с&nbsp;
          <a
            href="https://www.consultant.ru/document/cons_doc_LAW_61801/
            315f051396c88f1e4f827ba3f2ae313d999a1873/"
            target="_blank"
            rel="noopener noreferrer"
          >
            условиями обработки персональных данных
          </a>
        </p>
      </label>
      {formSubmitted ? (
        <span className={styles.successIcon}>✓</span>
      ) : (
        <button
          type="submit"
          className={`${styles.button} ${!isChecked ? styles.inActiveButton : ''}`}
          disabled={!isChecked}
        >
          Позвоните мне!
        </button>
      )}
    </form>
  );
};

export default FormForFeedback;
