import { TestBed } from '@angular/core/testing';

import { AwsApiService } from './aws-api.service';

describe('AwsApiService', () => {
  let service: AwsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
