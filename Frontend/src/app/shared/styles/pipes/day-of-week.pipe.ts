import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayOfWeek',
})
export class DayOfWeekPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    } else {
      const daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      // console.log(value,'value');

      const final_date = new Date(value);
      const dayIndex = final_date.getDay();
      // console.log(dayIndex,'dayIndex');
      return daysOfWeek[dayIndex];
    }
  }
}
