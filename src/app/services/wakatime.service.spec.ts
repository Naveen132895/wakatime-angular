import { TestBed } from '@angular/core/testing';

import { WakatimeService } from './wakatime.service';

describe('WakatimeService', () => {
  let service: WakatimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WakatimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
