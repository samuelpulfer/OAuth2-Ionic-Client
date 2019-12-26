import { TestBed } from '@angular/core/testing';

import { LocalPersistenceService } from './local-persistence.service';

describe('LocalPersistenceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalPersistenceService = TestBed.get(LocalPersistenceService);
    expect(service).toBeTruthy();
  });
});
