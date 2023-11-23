import { BreakpointObserver } from '@angular/cdk/layout';
import { NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  ThemePalette,
} from '@angular/material/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
  ],
})
export class StepperComponent implements OnInit {
  showSpinners: boolean = true;
  showSeconds: boolean = true;
  stepHour!: any;
  stepMinute !: any;
  stepSecond: number = 1;
  touchUi: boolean = false;
  color: ThemePalette;
  enableMeridian: boolean = false;
  disableMinute: boolean = false;
  hideTime: boolean = false;
  disabled: boolean = true;

  isLinear: boolean = true;

  orientation: any;

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    dob: ['', Validators.required],
    // time: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    address1: ['', Validators.required],
    address2: ['', Validators.required],
    address3: ['', Validators.required],
    qualification: ['', Validators.required],
    gender: ['', Validators.required],
  });

  qualification: any[] = [
    '--',
    'SSC',
    'HSC',
    'Under Graduate',
    'Poster Graduate',
  ];
  constructor(
    private _formBuilder: FormBuilder,
    private _observer: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.stepperOrientation();
    this.currentTime();
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }


  stepperOrientation() {
    this._observer.observe(['(max-width: 768px)']).subscribe((res: any) => {
      if (res.matches) {
        this.orientation = 'vertical';
      } else {
        this.orientation = 'horizontal';
      }
    });
  }

  // Current Time 
  currentTime(){
   const time=new Date();
   const hours= time.getHours();
   this.stepHour=hours;
   console.log(this.stepHour);
   console.log(typeof(this.stepHour));
   
   const minutes= time.getMinutes();
   this.stepMinute=minutes;
   console.log(this.stepMinute);
   console.log(typeof(this.stepMinute));
   
  }
}
