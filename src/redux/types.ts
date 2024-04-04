export interface RootState {
  mainButton: {
    isActive: boolean
  }
  isErrorConnection: {
    isError: boolean
    errorMessage: string
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
