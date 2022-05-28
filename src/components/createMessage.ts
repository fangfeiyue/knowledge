import { createApp } from 'vue'
// Module '"*.vue"' has no exported member 'MsgType'.
// import Message, { MsgType } from './Message.vue'
import Message from './Message.vue'

export type MsgType = 'error' | 'success' | 'default'

const createMessage = (msg:string, type: MsgType, timeout = 2000): void => {
  const instance = createApp(Message, {
    msg,
    type
  })
  const node = document.createElement('div')
  document.body.appendChild(node)

  instance.mount(node)
  setTimeout(() => {
    instance.unmount()
    document.body.removeChild(node)
  }, timeout)
}

export default createMessage
