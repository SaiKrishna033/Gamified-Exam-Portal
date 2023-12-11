import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAssessmentComponent } from './about-assessment.component';

describe('AboutAssessmentComponent', () => {
  let component: AboutAssessmentComponent;
  let fixture: ComponentFixture<AboutAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutAssessmentComponent]
    });
    fixture = TestBed.createComponent(AboutAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
