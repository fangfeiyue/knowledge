import mitt from 'mitt'
export type ValidateFunc = () => boolean | undefined
export type Events = {
  'form-item-created': ValidateFunc
}
export const emitter = mitt<Events>()
