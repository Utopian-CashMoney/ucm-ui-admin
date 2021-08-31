// Importing http module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Importing testbed, httpclient, error response, and data
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';

describe('Http tests', () => {
  //Add HttpClientTestingModule to the TestBed
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject http service and test controller per test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('test httpclient.get', () => {
    const testData: Data = { name: 'Test Data' };

    //Make http get request
    httpClient.get<Data>('http://localhost:8010/api/branches')
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

  it('test if 404', () => {
    const emsg = '404 error';

    httpClient.get<Data[]>('http://localhost:8010/api/branches').subscribe(
      data => fail('should fail with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne('http://localhost:8010/api/branches');

    // Respond with mock error
    req.flush(emsg, { status: 404, statusText: 'Not Found' });
  });

  afterEach(() => {
    //Assert that there are no more requests
    httpTestingController.verify();
  });
});