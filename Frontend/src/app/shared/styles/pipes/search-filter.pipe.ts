import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
  
    searchText = searchText.toLowerCase();
  
    return items.filter(item => {
      if (item && item.name && item.description) {
        return item.name.toLowerCase().includes(searchText) || item.description.toLowerCase().includes(searchText);
      }
      return false;
    });
  }
  
}
