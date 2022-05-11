import { TestBed } from '@angular/core/testing';

import { ClosedspaceService } from './closedspace.service';

describe('ClosedspaceService', () => {
  let service: ClosedspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClosedspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
