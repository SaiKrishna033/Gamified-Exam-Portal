import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KuhuComponent } from './kuhu.component';

describe('KuhuComponent', () => {
  let component: KuhuComponent;
  let fixture: ComponentFixture<KuhuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KuhuComponent]
    });
    fixture = TestBed.createComponent(KuhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
