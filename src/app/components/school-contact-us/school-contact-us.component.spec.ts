import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolContactUsComponent } from './school-contact-us.component';

describe('SchoolContactUsComponent', () => {
  let component: SchoolContactUsComponent;
  let fixture: ComponentFixture<SchoolContactUsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolContactUsComponent]
    });
    fixture = TestBed.createComponent(SchoolContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
