import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuhuKLogoComponent } from './kuhu-k-logo.component';

describe('KuhuKLogoComponent', () => {
  let component: KuhuKLogoComponent;
  let fixture: ComponentFixture<KuhuKLogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuhuKLogoComponent]
    });
    fixture = TestBed.createComponent(KuhuKLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
