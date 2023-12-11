import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appApplyNumberOnly]'
})
export class ApplyNumberOnlyDirective {

  constructor(private el: ElementRef) { }
	@HostListener('input', ['$event']) onKeyDown(event:any) {
		const initalValue = this.el.nativeElement.value;
		this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
		if (initalValue !== this.el.nativeElement.value) {
			event.stopPropagation();
		}
	}

}
