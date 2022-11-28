import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'thanks' })
export class ThanksPipe implements PipeTransform {
  transform(value: string, thanksNote = 'Thank You!'): string {
    return value + ' ' + thanksNote;
  }
}
