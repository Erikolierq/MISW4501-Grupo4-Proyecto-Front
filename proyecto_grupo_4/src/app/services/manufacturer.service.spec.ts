import { TestBed, async, inject } from '@angular/core/testing';
import { ManufacturerService } from './manufacturer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { after } from 'node:test';

describe('Service: Manufacturer', () => {

  let service: ManufacturerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ManufacturerService]
    });
    service = TestBed.inject(ManufacturerService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => httpMock.verify());

  it('should be created', () => {
    const dummy = { nombre: 'New', pais_origen: 'Test', categoria: 'Test' };
    service.createManufacturer(dummy).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpMock.expectOne('http://34.55.129.65/manufacturer/manufacturers');
    expect(req.request.method).toBe('POST');
    req.flush({});

  });
  
});
