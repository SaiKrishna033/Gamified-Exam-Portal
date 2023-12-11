import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAccComponent } from './teacher-acc.component';

describe('TeacherAccComponent', () => {
  let component: TeacherAccComponent;
  let fixture: ComponentFixture<TeacherAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherAccComponent]
    });
    fixture = TestBed.createComponent(TeacherAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
