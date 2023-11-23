import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService implements OnInit {
public title=new BehaviorSubject("Angular Template");

  constructor() { 
    
  }
  ngOnInit(): void {
      
  }
  setTitle(title: string) {    
    this.title.next(title);
  }
 
}
