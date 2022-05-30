import { h, render } from 'vue'
// Module '"*.vue"' has no exported member 'MsgType'.
// import Message, { MsgType } from './Message.vue'
import Message from './Message.vue'

export type MsgType = 'error' | 'success' | 'default'
interface Fn {
  destroy:()=>void
}
const createMessage = (msg:string, type: MsgType, timeout?: number):Fn => {
  const instance = h(Message, {
    msg,
    type
  })
  const node = document.createElement('div')
  document.body.appendChild(node)

  const destroy = ():void => {
    render(null, node)
    document.body.removeChild(node)
  }

  render(instance, node)

  if (timeout) {
    setTimeout(() => {
      destroy()
    }, timeout)
  }

  return {
    destroy
  }
}

export default createMessage
