import { Directive,ElementRef,AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocusOnLoad]'
})
export class AutoFocusOnLoadDirective {

  constructor(private el:ElementRef) { }

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
}
