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
    selectedFiles: FileList | null
  }
}
