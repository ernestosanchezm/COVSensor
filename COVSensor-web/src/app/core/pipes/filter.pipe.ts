import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg:any): any {
    const results = [];

    for(const post of value){
      if(post.apellido.toLowerCase().indexOf(arg) > -1){
        results.push(post);
      };
    };
    return results;
  }

}
