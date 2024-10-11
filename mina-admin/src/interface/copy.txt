export interface ProxyStorage {
    setItem<T>(k: string, v: T): void;
    getItem<T>(k: string): T;
    removeItem(k: string): void;
    clear(): void;
}

export const storageSession: ProxyStorage = {
  setItem<T> (k: string, v: T) {
    sessionStorage.setItem(k, JSON.stringify(v))
  },
  getItem<T> (k: string):T {
    const value = sessionStorage.getItem(k)
    return value ? JSON.parse(value) : null
  },
  removeItem (k: string) {
    sessionStorage.removeItem(k)
  },
  clear () {
    sessionStorage.clear()
  },
}

export const storageLocal: ProxyStorage = {
  setItem<T> (k: string, v: T) {
    sessionStorage.setItem(k, JSON.stringify(v))
  },
  getItem<T> (k: string):T {
    const value = sessionStorage.getItem(k)
    return value ? JSON.parse(value) : null
  },
  removeItem (k: string) {
    sessionStorage.removeItem(k)
  },
  clear () {
    sessionStorage.clear()
  }
}
