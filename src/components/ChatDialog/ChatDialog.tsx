import React, { useEffect, useState } from 'react'
import styles from './ChatDialog.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { closeDialog } from '@/store/dialogSlice'

const ChatDialog: React.FC = () => {
  const isOpen: boolean = useSelector((state: RootState) => state.dialog.isOpen)
  const dispatch = useDispatch()

  // Добавить в редакс
  const [message, setMessage] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (message.trim() !== '') {
      // dispatch(sendMessage(message))
      setMessage('')
    }
  }

  const handleCloseDialog = (): void => {
    dispatch(closeDialog())
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        handleCloseDialog()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <dialog open className={styles.dialog}>
          <button type='button' onClick={handleCloseDialog} className={styles.closeButton} />
          <form onSubmit={handleSendMessage} className={styles.form}>
            {/* Отрисовка сообщений */}
            <textarea
              placeholder='Введите сообщение'
              className={styles.area}
              value={message}
              onChange={handleChange}
            />
            <button type='submit' className={styles.sendButton}>
              Отправить
            </button>
          </form>
        </dialog>
      )}
    </>
  )
}

export default ChatDialog
