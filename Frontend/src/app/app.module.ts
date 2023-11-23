import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MainRoutingModule } from './main/main-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FooterComponent } from './footer/footer.component';
import { InputFieldTypeComponent } from './main/input-field-type/input-field-type.component';
import { FileUploadDailogFormsComponent } from './main/file-upload-dailog-forms/file-upload-dailog-forms.component';
import { FileUploadComponent } from './main/file-upload-dailog-forms/file-upload/file-upload.component';
import { FormsComponent } from './main/file-upload-dailog-forms/forms/forms.component';
import { DialogComponent } from './main/file-upload-dailog-forms/dialog/dialog.component';
import { AlertDialogComponent } from './main/file-upload-dailog-forms/dialog/alert-dialog/alert-dialog.component';
import { TableComponent } from './main/table/table.component';
import { SecondTableComponent } from './main/table/second-table/second-table.component';
import { TabComponent } from './main/tab/tab.component';
import { StepperComponent } from './main/stepper/stepper.component';
import { TreeComponent } from './main/tree/tree.component';
import { SampleComponent } from './sample/sample.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { VideoComponent } from './main/video/video.component';
import { UserUploadComponent } from './main/video/user-upload/user-upload.component';
import { UserPreviewComponent } from './main/video/user-preview/user-preview.component';
import { UserViewComponent } from './main/video/user-view/user-view.component';
import { DragAndDropComponent } from './main/tree/drag-and-drop/drag-and-drop.component';
import { CheckboxWithParentComponent } from './main/tree/checkbox-with-parent/checkbox-with-parent.component';
import { RadioWithoutParentComponent } from './main/tree/radio-without-parent/radio-without-parent.component';
import { TouristRegisterComponent } from './tourist-register/tourist-register.component';
import { RegisterTabComponent } from './register-tab/register-tab.component';
import { DeleteComponent } from './main/table/second-table/delete/delete.component';
import { RegisterTableComponent } from './register-table/register-table.component';
import { TourSelectComponent } from './tour-select/tour-select.component';
import { AddTourComponent } from './tour-select/add-tour/add-tour.component';
import { CampBookingComponent } from './camp-booking/camp-booking.component';
import { BookingUsersComponent } from './camp-booking/booking-users/booking-users.component';
import { UserDetailsComponent } from './camp-booking/user-details/user-details.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { EllipsisPipe } from './shared/styles/pipes/ellipsis/ellipsis.pipe';
import { CardComponent } from './tree-view/card/card.component';
import { ClassAssignComponent } from './Task-2/class-assign/class-assign.component';
import { AssignClassComponent } from './Task-2/assign-class/assign-class.component';
import { AddClassComponent } from './Task-2/add-class/add-class.component';
import { AssignClass1Component } from './Task-2/assign-class1/assign-class1.component';
import { AlertComponent } from './Task-2/assign-class1/alert/alert.component';
import { WarningComponent } from './Task-2/assign-class1/warning/warning.component';
import { Alert1Component } from './Task-2/assign-class1/alert1/alert1.component';
import { TreeView2Component } from './Task-2/Task-3/tree-view2/tree-view2.component';
import { TextComponent } from './Task-2/Task-3/text/text.component';
import { TreeView3Component } from './Task-2/Task-3/tree-view3/tree-view3.component';
import { Task4Component } from './Task-4/task4/task4.component';
import { AddComponent } from './Task-4/add/add.component';
import { NotificationComponent } from './Task-4/notification/notification.component';
import { DayOfWeekPipe } from './shared/styles/pipes/day-of-week.pipe';
import { SearchFilterPipe } from './shared/styles/pipes/search-filter.pipe';
import { FilterPipe } from './shared/styles/pipes/filter.pipe';
import { SnackBarService } from './services/snack-bar/snackbar.service';
import { EncryptionServiceService } from './services/encrypt/encryption-service.service.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    InputFieldTypeComponent,
    FileUploadDailogFormsComponent,
    FileUploadComponent,
    FormsComponent,
    DialogComponent,
    AlertDialogComponent,
    TableComponent,
    SecondTableComponent,
    TabComponent,
    StepperComponent,
    TreeComponent,
    EllipsisPipe,
    DayOfWeekPipe,
    SearchFilterPipe,
    FilterPipe,

    SampleComponent,
     VideoComponent,
     UserUploadComponent,
     UserPreviewComponent,
     UserViewComponent,
     DragAndDropComponent,
     CheckboxWithParentComponent,
     RadioWithoutParentComponent,
     TouristRegisterComponent,
     RegisterTabComponent,
     DeleteComponent,
     RegisterTableComponent,
     TourSelectComponent,
     AddTourComponent,
     CampBookingComponent,
     BookingUsersComponent,
     UserDetailsComponent,
     AuditTrailComponent,
     TreeViewComponent,
     CardComponent,
     ClassAssignComponent,
     AssignClassComponent,
     AddClassComponent,
     AssignClass1Component,
     AlertComponent,
     WarningComponent,
     Alert1Component,
     TreeView2Component,
     TextComponent,
     TreeView3Component,
     Task4Component,
     AddComponent,
     NotificationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MainRoutingModule,
    MaterialFileInputModule,
    
    
  ],
  providers: [SnackBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
