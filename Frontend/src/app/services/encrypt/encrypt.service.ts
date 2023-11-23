
import { Injectable } from '@angular/core';
// import * as JsCrypto from "jscrypto/es6"; 
// import { AES } from "jscrypto/es6/AES"; 
import * as CryptoJS from 'crypto-js'; 
 
// const secretKey = CryptoJS.lib.WordArray.random(16); 
const secretKey = '12345678900987654q'; 
 
 
@Injectable({ 
    providedIn: 'root', 
}) 
export class EncryptService{ 
    constructor() { } 
 
 
  

 
    encryptionAES(data1:any) { 
        // Encrypt 
        const data = JSON.stringify(data1);
        const secretKey = '12345678900987654q'; 
        const ciphertext = CryptoJS.AES.encrypt(data, secretKey); 
        console.log(ciphertext); 
        const encrypted = ciphertext.toString(); 
   
    console.log(encrypted);
    
     return encrypted
    } 
 
 

decryptionAES(decryptStr: any) { 
    // Decrypt 
    const bytes = CryptoJS.AES.decrypt(decryptStr, secretKey); 
    const plaintext = bytes.toString(CryptoJS.enc.Utf8); 
    console.log(plaintext); 
    return plaintext; 
} 

}