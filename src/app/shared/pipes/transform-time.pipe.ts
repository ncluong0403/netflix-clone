import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformtime',
  standalone: true,
})
export class TransformTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return hours + 'h ' + minutes + 'm';
  }
}
