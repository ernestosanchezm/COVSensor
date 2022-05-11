import { TestBed } from '@angular/core/testing';

import { AirbombService } from './airbomb.service';

describe('AirbombService', () => {
  let service: AirbombService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirbombService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
