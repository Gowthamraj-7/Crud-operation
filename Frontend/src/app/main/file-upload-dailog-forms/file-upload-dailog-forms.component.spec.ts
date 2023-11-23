import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDailogFormsComponent } from './file-upload-dailog-forms.component';

describe('FileUploadDailogFormsComponent', () => {
  let component: FileUploadDailogFormsComponent;
  let fixture: ComponentFixture<FileUploadDailogFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUploadDailogFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadDailogFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
