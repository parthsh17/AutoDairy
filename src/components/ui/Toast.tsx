import { Toast as AstryxToast } from '@astryxdesign/core/Toast'

interface ToastProps {
  title: string
  message?: string
}

export function Toast({ title, message }: ToastProps) {
  return (
    <AstryxToast type="info" body={message ?? title} isAutoHide autoHideDuration={3000} onDismiss={() => undefined} />
  )
}
