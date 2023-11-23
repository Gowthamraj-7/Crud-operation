/* eslint-disable prettier/prettier */
// encryption.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { EncryptionService } from './encryption.service';

@Controller('api')
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('encrypt-data')
  encryptData(@Body('data') data: string): { ciphertext: string; iv: string } {
    return this.encryptionService.encryptionAES(data);
  }

  @Post('decrypt-data')
  decryptData(@Body() encryptedData: { ciphertext: string; iv: string }): string {
    return this.encryptionService.decryptionAES(encryptedData.ciphertext, encryptedData.iv);
  }
}

