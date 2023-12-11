import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuhuQuizDashboardComponent } from './kuhu-quiz-dashboard.component';

describe('KuhuQuizDashboardComponent', () => {
  let component: KuhuQuizDashboardComponent;
  let fixture: ComponentFixture<KuhuQuizDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuhuQuizDashboardComponent]
    });
    fixture = TestBed.createComponent(KuhuQuizDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
