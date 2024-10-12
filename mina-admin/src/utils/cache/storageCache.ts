import {AesEncryption, EncryptionParams} from "@/utils/encipher";
import {cacheCipher} from "@/config/encryption";
import {isNullOrUnDef} from "@/utils/is";

export interface CreateStorageParams extends EncryptionParams {
    prefixKey: string
    storage: Storage
    hasEncrypt: boolean
    localDrSessionStorage: boolean
}

export const createStorage = ({
                                  prefixKey = '',
                                  storage = sessionStorage,
                                  key = cacheCipher.SECRET_KEY,
                                  iv = cacheCipher.SECRET_IV,
                                  hasEncrypt = true
                              }: Partial<CreateStorageParams> = {}) => {

    if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
        throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
    }
    const encryption = new AesEncryption()
    const LocalCache =  class LocalCache {
        private prefixKey: string
        private storage: Storage
        private encryption: AesEncryption
        private readonly hasEncrypt: boolean

        constructor() {
            this.storage = storage
            this.prefixKey = prefixKey
            this.encryption = encryption
            this.hasEncrypt = hasEncrypt
        }
        private getKey(key: string) {
            return `${this.prefixKey}${key}`.toUpperCase()
        }

        setCache<T = any>(key: string, value: T): boolean
        setCache<T = any>(key: string, value: T, localDrSessionStorage: boolean): boolean

        setCache<T = any>(key: string, value: T) {
            const stringData = JSON.stringify(value)
            const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
            this.storage.setItem(this.getKey(key), stringifyValue)
            return true
        }

        getCache<T = any>(key: string): T
        getCache<T = any>(key: string, localDrSessionStorage: boolean): T

        getCache<T>(key: string): T {
            const val = this.storage.getItem(this.getKey(key))
            if (!val) return
            try {
                const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
                const data = JSON.parse(decVal)
                this.remove()
                return data as T
            } catch (error) {

            }
        }

        deleteCache(key: string): void
        deleteCache(key: string, localDrSessionStorage: boolean): void
        deleteCache(key: string, localDrSessionStorage = true): void {
            if (localDrSessionStorage) window.localStorage.removeItem(key)
            else window.sessionStorage.removeItem(key)
        }

        clearCache(): void
        clearCache(localDrSessionStorage: boolean): void
        clearCache(localDrSessionStorage = true): void {
            if (localDrSessionStorage) window.localStorage.clear()
            else window.sessionStorage.clear()
        }
    }
}

export const localCache =  new LocalCache()
