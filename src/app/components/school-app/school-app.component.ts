import { Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-school-app',
  templateUrl: './school-app.component.html',
  styleUrls: ['./school-app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchoolAppComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  onLoadHandler() {
    console.log("Suprotik")
    setTimeout(() => {
      const myDiv = this.el.nativeElement.querySelector('.hide');
      if (myDiv) {
        // Set the height for the div using Renderer2
        this.renderer.setStyle(myDiv, 'height', '8vh');
      }
    }, 30000);
  }
}
