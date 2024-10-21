import { cacheCipher } from '@/config/encryption'
import CryptoJS from "crypto-js";

const KEY = cacheCipher.SECRET_KEY
const IV = cacheCipher.SECRET_IV

const _encrypt = (data: any, keyStr = KEY, ivStr = IV) => {
  data = typeof data === 'object' ? JSON.stringify(data) : data

  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  const secret = CryptoJS.enc.Utf8.parse(data)
  const encrypted = CryptoJS.AES.encrypt(secret, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}

const _decrypt = (info: any, keyStr = KEY, ivStr = IV) => {
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)
  const decryptData = CryptoJS.AES.decrypt(info, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const CryptoJsDecrypt = CryptoJS.enc.Utf8.stringify(decryptData).toString()
  let resultData: any
  try {
    resultData = JSON.parse(CryptoJsDecrypt)
  } catch (error) {
    resultData = CryptoJsDecrypt
  }
  return resultData
}

export { _encrypt, _decrypt }
