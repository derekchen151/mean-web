import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipetest'
})
export class PipetestPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
