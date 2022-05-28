import { TestBed } from '@angular/core/testing';

import { ArtEducationService } from './art-education.service';

describe('ArtEducationService', () => {
  let service: ArtEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
