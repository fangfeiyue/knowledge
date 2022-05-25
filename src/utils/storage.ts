const namespace = 'knowledge'
export default {
  setItem(key: string, val: string):void {
    const storage = this.getStorage()
    storage[key] = val
    localStorage.setItem(namespace, JSON.stringify(storage))
  },
  getItem(key:string): any {
    return this.getStorage()[key]
  },
  getStorage(): any {
    return JSON.parse(localStorage.getItem(namespace) || '{}')
  },
  clearItem(key: string):void {
    const storage = this.getStorage()
    delete storage[key]
    localStorage.setItem(namespace, JSON.stringify(storage))
  },
  clear():void {
    localStorage.clear()
  }
}
