import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { InputFieldTypeComponent } from './main/input-field-type/input-field-type.component';
import { FileUploadDailogFormsComponent } from './main/file-upload-dailog-forms/file-upload-dailog-forms.component';

const routes: Routes = [
  
  // {
  //   path:'input-types', component:InputFieldTypeComponent
  // },
  // {
  //   path:'file-upload-dialog-forms',component:FileUploadDailogFormsComponent
  // },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
