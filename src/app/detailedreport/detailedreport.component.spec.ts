import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedreportComponent } from './detailedreport.component';

describe('DetailedreportComponent', () => {
  let component: DetailedreportComponent;
  let fixture: ComponentFixture<DetailedreportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedreportComponent]
    });
    fixture = TestBed.createComponent(DetailedreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
