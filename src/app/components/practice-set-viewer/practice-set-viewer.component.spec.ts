import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeSetViewerComponent } from './practice-set-viewer.component';

describe('PracticeSetViewerComponent', () => {
  let component: PracticeSetViewerComponent;
  let fixture: ComponentFixture<PracticeSetViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeSetViewerComponent]
    });
    fixture = TestBed.createComponent(PracticeSetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
