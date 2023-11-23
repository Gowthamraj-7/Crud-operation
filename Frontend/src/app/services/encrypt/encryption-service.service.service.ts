import { Injectable, NgZone } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncryptionServiceService {

  // Replace 'secret key 123' with a strong, randomly generated key
  key: string = CryptoJS.lib.WordArray.random(256 / 8).toString(CryptoJS.enc.Base64);
  encryptedData: any;


  // Use different IVs for each encryption operation
  generateIV(): string {
    return CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Base64);
  }

  constructor(private http: HttpClient,  private encryptionService: EncryptionServiceService,private zone: NgZone) {}

//   dataToEncrypt:any=[
    
//     {
//         "task_id": 40,
//         "task_name": "Demo",
//         "syllabus_name": [
//             "Tamil",
//             "Unit-1",
//             "Urainadai",
//             "unit-2",
//             "ilakanam",
//             "unit-3",
//             "thunaipadam"
//         ],
//         "due_datetime": "2023-11-10T12:07:28.000Z",
//         "task_completion_status": 1,
//         "updated_datetime": "2023-11-21T04:39:57.000Z",
//         "relevent_subject": "Tamil",
//         "relevent_syllabus_ids": [
//             "t1",
//             "t2",
//             "t4",
//             "t6",
//             "t3",
//             "t5",
//             "t7"
//         ],
//         "relevent_institutional_course_subject_id": 1,
//         "days": "11"
//     },
//     {
//         "task_id": 41,
//         "task_name": "test",
//         "syllabus_name": [
//             "unit-1",
//             "Poem"
//         ],
//         "due_datetime": "2023-11-16T12:22:20.000Z",
//         "task_completion_status": 1,
//         "updated_datetime": "2023-11-08T04:00:14.000Z",
//         "relevent_subject": "English",
//         "relevent_syllabus_ids": [
//             "e2",
//             "e3"
//         ],
//         "relevent_institutional_course_subject_id": 2,
//         "days": "5"
//     },
//     {
//         "task_id": 42,
//         "task_name": "www",
//         "syllabus_name": [
//             "English",
//             "unit-1",
//             "Poem",
//             "unit-2",
//             "Prose",
//             "unit-3",
//             "Supplumentry",
//             "unit-4",
//             "Grammer"
//         ],
//         "due_datetime": "2023-11-21T03:37:48.000Z",
//         "task_completion_status": 1,
//         "updated_datetime": "2023-11-08T05:24:16.000Z",
//         "relevent_subject": "English",
//         "relevent_syllabus_ids": [
//             "e2",
//             "e3",
//             "e1",
//             "e4",
//             "e5",
//             "e6",
//             "e7",
//             "e8",
//             "e9"
//         ],
//         "relevent_institutional_course_subject_id": 2,
//         "days": "0"
//     },
//     {
//         "task_id": 43,
//         "task_name": "ushdgsfhg",
//         "syllabus_name": [
//             "Unit-1",
//             "Urainadai"
//         ],
//         "due_datetime": "2023-11-22T16:04:02.000Z",
//         "task_completion_status": 1,
//         "updated_datetime": "2023-11-07T16:04:17.000Z",
//         "relevent_subject": "Tamil",
//         "relevent_syllabus_ids": [
//             "t2",
//             "t3"
//         ],
//         "relevent_institutional_course_subject_id": 1,
//         "days": "1"
//     }


// ]
  encryptionAES(data:any) {
    // Generate a new IV for each encryption
      // const data = this.dataToEncrypt;

    // Perform encryption outside Angular's zone
    this.zone.runOutsideAngular(() => {
      const encryptedData = this.encryptionService.encryptionAES(data);
      
      Promise.resolve().then(() => {
        const encryptedData = this.encryptionService.encryptionAES(data);
  
        // Update the component property
        this.encryptedData = encryptedData;
    });
  })
}

}

//   decryptionAES(ciphertext: any, iv: any) {
//     // Decrypt
//     const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Base64.parse(this.key), {
//       iv: CryptoJS.enc.Base64.parse(iv)
//     });

//     const plaintext = bytes.toString(CryptoJS.enc.Utf8);
//     return plaintext;
//   }
  
// receiveEncryptedData(): void {
//   this.http.get('/get-encrypted-data').subscribe((encryptedData: any) => {
//     // Handle the received encrypted data
//     console.log('Received Encrypted Data:', encryptedData);

//     // Perform decryption
//     const decryptedData = this.encryptionService.decryptionAES(
//       encryptedData.ciphertext,
//       encryptedData.iv
//     );

//     // Log the decrypted data (for demonstration purposes)
//     console.log('Decrypted Data:', decryptedData);
//   });
// }




