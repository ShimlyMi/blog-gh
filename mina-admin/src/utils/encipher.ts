import CryptoJS from 'crypto-js'

const SECRET_KEY = CryptoJS.enc.Utf8.parse("2024032711441346");// utf8 > WordArray对象
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("2024032711441346");

/**
 * AES 加密方法
 * 字符串 SECRET_KEY，SECRET_IV
 * 返回 base64
 */
export function encrypt(data: any) {
    if (typeof data === 'object') {
        try {
            data = JSON.stringify(data)
        } catch (error) {
            console.log("encrypt error:", error)
        }
    }
    const dataHex = CryptoJS.enc.Utf8.parse(data)
    const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
export function decrypt(data: any) {
    const base64 = CryptoJS.enc.Base64.parse(data);
    const str = CryptoJS.enc.Base64.stringify(base64);
    const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
        iv: SECRET_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding,
    });
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    // console.log("decryptedStr", decrypt)
    return decryptedStr.toString();

}
