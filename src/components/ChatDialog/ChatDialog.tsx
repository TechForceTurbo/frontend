import React, { useEffect, useRef, useState } from 'react'
import styles from './ChatDialog.module.css'
import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/types'
import { closeDialog } from '@/store/dialogSlice'
const inter = Inter({ subsets: ['latin'] })

const ChatDialog: React.FC = () => {
  const isOpen: boolean = useSelector((state: RootState) => state.dialog.isOpen)
  const dispatch = useDispatch()
  const blockRef = useRef<HTMLDivElement>(null)

  // Добавить в редакс
  const [message, setMessage] = useState<string>('')

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    const startX = event.clientX
    const startY = event.clientY
    const startWidth = blockRef.current!.offsetWidth
    const startHeight = blockRef.current!.offsetHeight

    const handleMouseMove = (event: MouseEvent) => {
      const diffX = startX - event.clientX
      const diffY = startY - event.clientY

      const newWidth = startWidth + diffX
      const newHeight = startHeight + diffY

      blockRef.current!.style.width = `${newWidth}px`
      blockRef.current!.style.height = `${newHeight}px`
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setMessage(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // dispatch(sendMessage(message))
      setMessage('')
    }
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
        <div className={styles.dialog} ref={blockRef}>
          <div className={styles.buttonsBox}>
            <button type='button' onMouseDown={handleMouseDown} className={styles.resizeButton} />
            <button type='button' onClick={handleCloseDialog} className={styles.closeButton} />
          </div>

          <form onSubmit={handleSendMessage} className={styles.form}>
            {/* Отрисовка сообщений */}
            <textarea
              placeholder='Введите сообщение'
              className={`${styles.area} ${inter.className}`}
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <button type='submit' className={styles.sendButton}>
              Отправить
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatDialog
