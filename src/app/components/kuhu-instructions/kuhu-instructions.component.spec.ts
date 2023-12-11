import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuhuInstructionsComponent } from './kuhu-instructions.component';

describe('KuhuInstructionsComponent', () => {
  let component: KuhuInstructionsComponent;
  let fixture: ComponentFixture<KuhuInstructionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuhuInstructionsComponent]
    });
    fixture = TestBed.createComponent(KuhuInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
