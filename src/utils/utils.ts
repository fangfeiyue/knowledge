import { IColumnProps, IImageProps, IUserProps } from '../store/index'

export function generateFitUrl(data: IImageProps, width: number, height: number, format = ['m_pad']): void {
  if (data && data.url) {
    const formatStr = format.reduce((prev, current) => {
      return current + ',' + prev
    }, '')
    data.fitUrl = data.url + `?x-oss-process=image/resize,${formatStr}h_${height},w_${width}`
  }
}

export function objToArr<T>(obj: {[key: string]: T}): T[] {
  return Object.keys(obj).map(key => obj[key])
}

export function addColumnAvatar(data: IColumnProps | IUserProps, width: number, height: number):void {
  if (data.avatar) {
    generateFitUrl(data.avatar, width, height)
  } else {
    const parseCol = data as IColumnProps

    // const parseCol = data
    data.avatar = {
      fitUrl: require(parseCol.title ? '@/assets/img/column.jpg' : '@/assets/img/avatar.jpg')
    }
  }
}

export function arrToObj<T extends { _id?: string }>(arr: Array<T>): T {
  return arr.reduce((pre: any, cur: any) => {
    if (cur._id) {
      pre[cur._id] = cur
    }
    return pre
  }, {} as { [key: string]: T })
}

type Conditon = {
  size?: number,
  format?: string[]
}
type ErrorType = 'format' | 'size' | null
type CheckRes = {
  passed: boolean,
  error: ErrorType
}
export function beforeUploadCheck(file:File, conditon: Conditon): CheckRes {
  const { size, format } = conditon
  const isValidFormat = format ? format.includes(file.type) : true
  const isValidSize = size ? (file.size / 1024 / 1024) < size : true

  let error: ErrorType = null

  if (!isValidFormat) {
    error = 'format'
  } else if (!isValidSize) {
    error = 'size'
  }

  return {
    passed: isValidFormat && isValidSize,
    error
  }
}
