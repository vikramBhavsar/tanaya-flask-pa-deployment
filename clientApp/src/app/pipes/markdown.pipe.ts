import { Pipe, PipeTransform } from '@angular/core';
import { marked } from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {

    if(value && value.length > 0){
      return marked(value);
    }
    return "";
  }
}
