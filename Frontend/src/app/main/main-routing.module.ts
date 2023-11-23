import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputFieldTypeComponent } from './input-field-type/input-field-type.component';
import { FileUploadDailogFormsComponent } from './file-upload-dailog-forms/file-upload-dailog-forms.component';
import { MainComponent } from './main.component';
import { TableComponent } from './table/table.component';
import { SecondTableComponent } from './table/second-table/second-table.component';
import { TabComponent } from './tab/tab.component';
import { StepperComponent } from './stepper/stepper.component';
import { TreeComponent } from './tree/tree.component';
import { VideoComponent } from './video/video.component';
import { TouristRegisterComponent } from '../tourist-register/tourist-register.component';
import { RegisterTabComponent } from '../register-tab/register-tab.component';
import { TourSelectComponent } from '../tour-select/tour-select.component';
import { CampBookingComponent } from '../camp-booking/camp-booking.component';
import { UserDetailsComponent } from '../camp-booking/user-details/user-details.component';
import { TreeViewComponent } from '../tree-view/tree-view.component';
import { CardComponent } from '../tree-view/card/card.component';
import { ClassAssignComponent } from '../Task-2/class-assign/class-assign.component';
import { TreeView2Component } from '../Task-2/Task-3/tree-view2/tree-view2.component';
import { TreeView3Component } from '../Task-2/Task-3/tree-view3/tree-view3.component';
import { Task4Component } from '../Task-4/task4/task4.component';

const routes: Routes = [
  // {
  //   path:'',component:MainComponent,
  //   children:[

  {
    path: 'input-types',
    component: InputFieldTypeComponent,
  },
  {
    path: 'fileUpload-dialog-forms',
    component: FileUploadDailogFormsComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'tabs',
    component: TabComponent,
  },
  {
    path: 'stepper',
    component: StepperComponent,
  },
  {
    path: 'tree-view',
    component: TreeComponent,
  },
  {
    path: 'video',
    component: VideoComponent,
  },
  {
    path: 'Tourist-Register',
    component: RegisterTabComponent,
  },
  {
    path: 'Tourist-Select',
    component: TourSelectComponent,
  },
  {
    path: 'Camp-Booking',
    component: CampBookingComponent,
  },
  {
    path: 'User-Details',
    component: UserDetailsComponent,
  },
  {
    path: 'TreeView',
    component: TreeViewComponent,
  },
  {
    path: 'TreeView1',
    component: CardComponent,
  },
  {
    path: 'ClassAssign',
    component: ClassAssignComponent,
  },
  {
    path: 'Tree_view',
    component: TreeView2Component,
  },
  {
    path: 'Tree_view2',
    component: TreeView3Component,
  },
  {
    path: 'Task4',
    component: Task4Component,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
