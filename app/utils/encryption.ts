import CryptoJS from 'crypto-js'

export const encryptData = (data: string, secretKey: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString()
}

export const decryptData = (encryptedData: string, secretKey: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}

