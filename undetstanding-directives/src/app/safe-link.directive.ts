import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'a[safeLink]',
  standalone: true,
  host: {
    '(click)': 'leavePage($event)'
  }
})
export class SafeLinkDirective {
  @Input({alias: 'safeLink'}) queryParam!: string;

  constructor() { 
    console.log("Directive Works!");
   }

  leavePage(event: MouseEvent){
    const wantsToLeave = window.confirm("Do you want to leave the page?");

    if(wantsToLeave){
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam;
      return;
    }
    else{
      event.preventDefault();
    }
  } 
}
