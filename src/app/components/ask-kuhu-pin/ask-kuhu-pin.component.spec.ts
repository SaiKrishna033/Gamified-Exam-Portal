import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskKuhuPinComponent } from './ask-kuhu-pin.component';

describe('AskKuhuPinComponent', () => {
  let component: AskKuhuPinComponent;
  let fixture: ComponentFixture<AskKuhuPinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AskKuhuPinComponent]
    });
    fixture = TestBed.createComponent(AskKuhuPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
