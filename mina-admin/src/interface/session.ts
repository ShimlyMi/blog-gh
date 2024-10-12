import {AesEncryption, EncryptionParams} from "@/utils/encipher";
import {cacheCipher} from "@/config/encryption";
import {isNullOrUnDef} from "@/utils/is";

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string
  storage: Storage
  hasEncrypt: boolean
  localDrSessionStorage: boolean
  timeout?: Nullable<number>
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.SECRET_KEY,
  iv = cacheCipher.SECRET_IV,
  timeout = null
}: Partial<CreateStorageParams> = {}) => {

  if ([key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
  }
  const encryption = new AesEncryption()
  const LocalCache =  class LocalCache {
    private getKey(key: string) {
      return `${prefixKey}${key}`.toUpperCase()
    }

    setCache<T = any>(key: string, value: T, expire: number | null = timeout) {
     try {
       const stringData = JSON.stringify({
         value,
         time: Date.now(),
         expire: isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
       })
       const stringifyValue = encryption.encryptByAES(stringData)
       storage.setItem(this.getKey(key), stringifyValue)
       return true
     } catch (error) {
       return false
     }
    }

    getCache<T>(key: string, def: any = null): T {
      const val = storage.getItem(this.getKey(key))
      if (!val) return def
      console.log("getItem", val)
      try {
        const decVal = encryption.decryptByAES(val)
        const data = JSON.parse(decVal)
        const { value, expire } = data
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.deleteCache(key)
      } catch (error) {
        return def
      }
    }
    deleteCache(key: string): void {
      storage.removeItem(key)
    }
    clearCache(): void {
      storage.clear()
    }
  }

  return new LocalCache()
}
