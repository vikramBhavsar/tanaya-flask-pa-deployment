import { TestBed } from '@angular/core/testing';

import { GalleryProjectIDService } from './gallery-project-id.service';

describe('GalleryProjectIDService', () => {
  let service: GalleryProjectIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryProjectIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
