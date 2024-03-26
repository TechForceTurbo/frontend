interface MessageItem {
  user: boolean
  text: string
  time: string
}

export interface RootState {
  mainButton: {
    isActive: boolean
  }
  dialog: {
    isOpen: boolean
  }
  message: {
    message: string
  }
  file: {
    selectedFiles: FileList | undefined
  }
  messages: {
    items: MessageItem[]
  }
}
