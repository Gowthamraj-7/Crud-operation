import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  srcResult: any;
  selectedFile: any = null;

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event: any):void {
    const inputNode: any = document.querySelector('#file');
    this.selectedFile = event.target.files[0] ?? null;
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }


}
