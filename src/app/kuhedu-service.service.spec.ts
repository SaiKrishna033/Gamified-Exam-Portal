import { TestBed } from '@angular/core/testing';

import { KuheduServiceService } from './kuhedu-service.service';

describe('KuheduServiceService', () => {
  let service: KuheduServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KuheduServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
