import { TestBed } from '@angular/core/testing';
import {ImgResourceService} from './img.resource.service';

describe('ImgResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgResourceService = TestBed.get(ImgResourceService);

    expect(service).toBeTruthy();
  });
});
