import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Options, ApiResponse, ApiError } from './types';

@Injectable({
  providedIn: 'root'
})
export class Api {
  // Make sure this matches your Express.js server URL
  private baseUrl = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', {
      url: error.url,
      status: error.status,
      statusText: error.statusText,
      error: error.error,
      message: error.message
    });

    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  // Helper function to wrap response in ApiResponse format if needed
  private wrapResponse<T>(response: T | ApiResponse<T>): ApiResponse<T> {
    if (response && typeof response === 'object' && 'data' in response) {
      return response as ApiResponse<T>;
    }
    return { data: response as T };
  }

  get<T>(endpoint: string, options?: Options): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making GET request to:', url);
    return this.httpClient.get<T>(url, options)
      .pipe(
        map(response => this.wrapResponse(response)),
        catchError(this.handleError)
      );
  }

  post<T>(endpoint: string, body: Partial<T>, options?: Options): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making POST request to:', url, 'with body:', body);
    return this.httpClient.post<T>(url, body, options)
      .pipe(
        map(response => this.wrapResponse(response)),
        catchError(this.handleError)
      );
  }

  put<T>(endpoint: string, body: Partial<T>, options?: Options): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making PUT request to:', url, 'with body:', body);
    return this.httpClient.put<T>(url, body, options)
      .pipe(
        map(response => this.wrapResponse(response)),
        catchError(this.handleError)
      );
  }

  delete<T>(endpoint: string, options?: Options): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making DELETE request to:', url);
    return this.httpClient.delete<T>(url, options)
      .pipe(
        map(response => this.wrapResponse(response)),
        catchError(this.handleError)
      );
  }

  patch<T>(endpoint: string, body: Partial<T>, options?: Options): Observable<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    console.log('Making PATCH request to:', url, 'with body:', body);
    return this.httpClient.patch<T>(url, body, options)
      .pipe(
        map(response => this.wrapResponse(response)),
        catchError(this.handleError)
      );
  }
}
