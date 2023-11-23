import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  constructor() {}

  private submitStatus = new BehaviorSubject<any>(undefined);
  return_submit_status = this.submitStatus.asObservable();

  updateSubmitStatus(data: any) {
    this.submitStatus.next(data);
  }
}
