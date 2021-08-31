import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { Data } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';


describe('Http Service', () => {
  let service: HttpService; 
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return a result from getAll', () => {
    const testData: Data = { name: 'Test Data' };

    service.getAll('http://localhost:8010/api/branches')
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne('http://localhost:8010/api/branches');

    //Assert that it is a GET request
    expect(req.request.method).toEqual('GET');

    //Respond with mock data to resolve observable
    req.flush(testData);

    //Assert that there are no more requests
    httpTestingController.verify();
  });

  afterEach(() => {
    //Assert that there are no more requests
    httpTestingController.verify();
  });
});