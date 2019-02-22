import { TestBed } from '@angular/core/testing';

import { YummlyService } from './yummly.service';

describe('YummlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YummlyService = TestBed.get(YummlyService);
    expect(service).toBeTruthy();
  });
});
