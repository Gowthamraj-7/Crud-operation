/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';

import * as CryptoJS from 'crypto-js';

// const secretKey = CryptoJS.lib.WordArray.random(16);
const secretKey = '12345678900987654q';

@Injectable()
export class EncryptService {
  encrypted: any;
  encryptionAES(encryptStr: any) {
    // Encrypt
    const data = JSON.stringify(encryptStr);
    const ciphertext = CryptoJS.AES.encrypt(data, secretKey);
    console.log(ciphertext);
    const encrypted = ciphertext.toString();

    return encrypted;
  }

//   decryptionAES(decryptStr: string) {
//     const secretKey = '1234567890098765cd';
//     const bytes = CryptoJS.AES.decrypt(decryptStr, secretKey); 
//     console.log(bytes)
//     const plaintext = bytes.toString(CryptoJS.enc.Utf8); 
//     console.log(plaintext); 
//     return plaintext; 
// } 
decryptionAES(decryptStr: string) {
  if (!decryptStr) {
    console.error('Input for decryption is empty.');
    return null;
}
const secretKey = '12345678900987654q';
// Ensure secretKey is defined

if (!secretKey) {
    console.error('Secret key is not defined.');
    return null;
}

try {
    // Decrypt 
    const bytes = CryptoJS.AES.decrypt(decryptStr, secretKey);
    console.log(bytes);
    
    const plaintext = bytes.toString(CryptoJS.enc.Utf8); 
    console.log('Decrypted Data:', plaintext);
    if (!plaintext.trim()) {
      console.error('Decrypted data is empty.');
    }
    return plaintext;
    // if (!plaintext.trim()) {
    //   console.error('Decrypted data is empty.');
    // }
} catch (error) {
    console.error('Decryption failed:', error);
    return null;
}

}
}
