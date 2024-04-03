export type RootState = {
  mainButton: {
    isActive: boolean
  }
  dialog: {
    isOpen: boolean
  }
  message: {
    message: string
  }
  files: {
    selectedFiles: FileList | undefined
  }
  setMessages: {
    items: {
      user: boolean
      text: string
      time: string
    }[]
  }
}
