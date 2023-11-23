import { Component, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  title = 'GetSterTemplate';
  // ngOnInit(): void {
  //   let a = 1;
  //   if (a == 6) {
  //     console.log('Ok');
  //   }
  // }

  //   ngOnDestroy(): void {
  //     alert("Are you ")
  //   }
  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event:any) {
  // return false;

  // }
}
