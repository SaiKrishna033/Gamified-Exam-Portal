import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuhedSignupComponent } from './kuhed-signup.component';

describe('KuhedSignupComponent', () => {
  let component: KuhedSignupComponent;
  let fixture: ComponentFixture<KuhedSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuhedSignupComponent]
    });
    fixture = TestBed.createComponent(KuhedSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
