import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolAppComponent } from './school-app.component';

describe('SchoolAppComponent', () => {
  let component: SchoolAppComponent;
  let fixture: ComponentFixture<SchoolAppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolAppComponent]
    });
    fixture = TestBed.createComponent(SchoolAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
