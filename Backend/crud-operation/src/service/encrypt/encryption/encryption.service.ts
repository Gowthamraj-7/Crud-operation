/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';


@Injectable()
export class EncryptionService {
    private key: string; // Store your key securely

    constructor() {
      // In a real-world scenario, load the key securely (e.g., from environment variables)
      this.key = 'fehfgefheg37y3e8';
    }
  
    encryptionAES(plainText: string): { ciphertext: string; iv: string } {
      const iv = crypto.randomBytes(16); // Initialization Vector
      const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(this.key), iv);
      let encryptedText = cipher.update(plainText, 'utf-8', 'base64');
      encryptedText += cipher.final('base64');
  
      return {
        ciphertext: encryptedText,
        iv: iv.toString('base64'),
      };
    }
  
    decryptionAES(ciphertext: string, iv: string): string {
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(this.key), Buffer.from(iv, 'base64'));
      let decryptedText = decipher.update(ciphertext, 'base64', 'utf-8');
      decryptedText += decipher.final('utf-8');
  
      return decryptedText;
    }
}
