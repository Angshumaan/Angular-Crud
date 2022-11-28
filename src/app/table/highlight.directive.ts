import { Directive, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() criticalAccount: string;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.criticalAccount === 'Yes') {
      console.log(this.criticalAccount);
      this.el.nativeElement.style.backgroundColor = '#78f351c4';
    } else {
      this.el.nativeElement.style.backgroundColor = '#6cdce085';
    }
  }
}
