import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { PortalModule } from '@angular/cdk/portal';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTreeModule} from '@angular/material/tree';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {
  NGX_MAT_DATE_FORMATS,
  NgxMatDateAdapter,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, NgxMatMomentAdapter, NgxMatMomentModule, NgxMomentDateModule } from '@angular-material-components/moment-adapter';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MomentDatetimeAdapter } from '@ng-matero/extensions-moment-adapter';
import { DatetimeAdapter, MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import {LayoutModule} from '@angular/cdk/layout';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

export const Material_Date_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const Mtx_Date_FORMATs = {
  parse: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'DD MMM YYYY HH:mm A',
    monthYearLabel: 'YYYY MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    popupHeaderDateLabel: 'MMM DD, ddd',
  },
};

export const ngx_Date_FORMATs = {
  parse: {
    dateInput: 'DD MMM YYYY',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'YYYY-MM-DD HH:mm',
  },
  display: {
    dateInput: 'DD MMM YYYY HH:mm A',
    monthInput: 'MMMM',
    timeInput: 'HH:mm',
    datetimeInput: 'DD MMM YYYY HH:mm A',
    monthYearLabel: 'YYYY MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
    popupHeaderDateLabel: 'MMM DD, ddd',
  },
};


let materials: any[] = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
  MatButtonModule,
  MatListModule,
  MatRippleModule,
  FormsModule,
  ReactiveFormsModule,
  MatInputModule,
  MatCheckboxModule,
  MatTabsModule,
  PortalModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatRadioModule,
  MatStepperModule,
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatIntlTelInputComponent,
  MatTreeModule,
  LayoutModule,
  MatExpansionModule,
  NgxMomentDateModule,
NgxMatMomentModule,
HttpClientModule,
MatMenuModule,
MatCardModule,MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, materials],
  exports: [materials],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: Material_Date_FORMATS },
    {
      provide: DatetimeAdapter,
      useClass: MomentDatetimeAdapter,
    },
    {
      provide: MTX_DATETIME_FORMATS,
      useValue: Mtx_Date_FORMATs,
    },
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: NGX_MAT_DATE_FORMATS, useValue: ngx_Date_FORMATs },
  ],
})
export class MaterialModule {}
