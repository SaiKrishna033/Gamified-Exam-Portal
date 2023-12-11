import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuhedunewlogoComponent } from './kuhedunewlogo.component';

describe('KuhedunewlogoComponent', () => {
  let component: KuhedunewlogoComponent;
  let fixture: ComponentFixture<KuhedunewlogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuhedunewlogoComponent]
    });
    fixture = TestBed.createComponent(KuhedunewlogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
