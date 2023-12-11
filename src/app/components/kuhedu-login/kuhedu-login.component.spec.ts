import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuheduLoginComponent } from './kuhedu-login.component';

describe('KuheduLoginComponent', () => {
  let component: KuheduLoginComponent;
  let fixture: ComponentFixture<KuheduLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuheduLoginComponent]
    });
    fixture = TestBed.createComponent(KuheduLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
