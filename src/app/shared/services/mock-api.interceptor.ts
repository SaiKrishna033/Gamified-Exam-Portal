import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MockDataService } from './mock-data.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class MockApiInterceptor implements HttpInterceptor {
  constructor(private mockDataService: MockDataService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Only use mock data if configured in environment
    if (environment.useMockData && request.url.includes('/api-dev/')) {
      console.log('Intercepting API call with mock data:', request.url);
      
      // Initialize mock data lazily to avoid circular dependencies
      this.mockDataService.initializeMockData();
      
      return this.handleMockRequest(request);
    }
    
    // If not a mock API call or mock data is disabled, pass it through
    return next.handle(request);
  }

  private handleMockRequest(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    let responseBody: any;
    let responseStatus = 200;
    
    // Parse the endpoint from the URL
    const urlParts = request.url.split('/api-dev/');
    const endpoint = urlParts[1];

    console.log('Intercepting request to:', endpoint, 'Method:', request.method);
    
    // Handle different API endpoints based on the URL and method
    if (request.method === 'POST' && endpoint.includes('user/login')) {
      const body = request.body as any;
      responseBody = this.mockDataService.login(body.email, body.password);
      responseStatus = responseBody.status || 200;
    } 
    else if (request.method === 'POST' && endpoint.includes('user/register')) {
      responseBody = this.mockDataService.register(request.body);
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'GET' && endpoint.includes('user/details')) {
      responseBody = this.mockDataService.getUserDetails();
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'GET' && endpoint.includes('question/validate-pincode')) {
      // Extract PIN from path
      const pinMatch = endpoint.match(/validate-pincode\/(\d+)/);
      const pin = pinMatch ? pinMatch[1] : null;
      if (pin) {
        responseBody = this.mockDataService.validatePincode(pin);
      } else {
        responseBody = { 
          status: 400, 
          message: 'PIN required',
          error: 'Missing PIN parameter',
          data: false
        };
      }
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'GET' && endpoint.includes('question/get-all-questions-using-pin')) {
      // Extract PIN from query parameters
      const url = new URL(request.url);
      const pin = url.searchParams.get('pin');
      if (pin) {
        responseBody = this.mockDataService.getQuizByPin(pin);
      } else {
        responseBody = { 
          status: 400, 
          message: 'PIN required',
          error: 'Missing PIN parameter' 
        };
      }
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'GET' && endpoint.includes('question/fetch-one-practice-set-using-pincode')) {
      // Extract PIN from path
      const pinMatch = endpoint.match(/pincode\/(\d+)/);
      const pin = pinMatch ? pinMatch[1] : null;
      if (pin) {
        responseBody = this.mockDataService.getPracticeSetByPin(pin);
      } else {
        responseBody = { 
          status: 400, 
          message: 'PIN required',
          error: 'Missing PIN parameter' 
        };
      }
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'PUT' && endpoint.includes('question/update-practice-set-metadata')) {
      // Extract ID from path
      const idMatch = endpoint.match(/metadata\/([^\/]+)/);
      const id = idMatch ? idMatch[1] : null;
      if (id) {
        responseBody = this.mockDataService.updatePracticeSetMetadata(id, request.body);
      } else {
        responseBody = { 
          status: 400, 
          message: 'ID required',
          error: 'Missing ID parameter' 
        };
      }
      responseStatus = responseBody.status || 200;
    }
    // Report endpoints
    else if (request.method === 'GET' && endpoint.includes('report/list')) {
      responseBody = this.mockDataService.getReports();
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'GET' && endpoint.includes('report/get/')) {
      // Extract ID from path
      const idMatch = endpoint.match(/get\/([^\/]+)/);
      const id = idMatch ? idMatch[1] : null;
      if (id) {
        responseBody = this.mockDataService.getReportById(id);
      } else {
        responseBody = { 
          status: 400, 
          message: 'Report ID required',
          error: 'Missing report ID parameter' 
        };
      }
      responseStatus = responseBody.status || 200;
    }
    else if (request.method === 'POST' && endpoint.includes('report/save')) {
      responseBody = this.mockDataService.saveReport(request.body);
      responseStatus = responseBody.status || 200;
    }
    else {
      // Default mock response for unhandled endpoints
      console.warn('Unhandled mock endpoint:', endpoint);
      responseBody = { 
        status: 501,
        message: 'Not implemented',
        error: 'Mock API response for unhandled endpoint: ' + request.url 
      };
      responseStatus = 501;
    }
    
    // Create and return HTTP response with appropriate status
    return of(new HttpResponse({
      status: responseStatus,
      body: responseBody
    }));
  }
}