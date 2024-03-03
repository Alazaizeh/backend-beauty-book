import CryptoJS from "crypto-js"
// Encryption function
export function encrypt(text) {
  // Ensure the key and IV are in the correct format (WordArray)
  const key = CryptoJS.enc.Hex.parse(process.env.customKey);
  const iv = CryptoJS.enc.Hex.parse(process.env.customIV);

  // Encrypt the text with AES using the key and IV
  const ciphertext = CryptoJS.AES.encrypt(text, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return ciphertext.toString();
}

// Decryption function
export function decrypt(ciphertext) {
  // Ensure the key and IV are in the correct format (WordArray)
  const key = CryptoJS.enc.Hex.parse(process.env.customKey);
  const iv = CryptoJS.enc.Hex.parse(process.env.customIV);

  // Decrypt the ciphertext with AES using the key and IV
  const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return bytes.toString(CryptoJS.enc.Utf8);
}

 