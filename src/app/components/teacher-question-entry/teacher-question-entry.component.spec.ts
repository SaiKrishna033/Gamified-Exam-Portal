import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherQuestionEntryComponent } from './teacher-question-entry.component';

describe('TeacherQuestionEntryComponent', () => {
  let component: TeacherQuestionEntryComponent;
  let fixture: ComponentFixture<TeacherQuestionEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherQuestionEntryComponent]
    });
    fixture = TestBed.createComponent(TeacherQuestionEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
