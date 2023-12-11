import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPracticeComponent } from './about-practice.component';

describe('AboutPracticeComponent', () => {
  let component: AboutPracticeComponent;
  let fixture: ComponentFixture<AboutPracticeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutPracticeComponent]
    });
    fixture = TestBed.createComponent(AboutPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
