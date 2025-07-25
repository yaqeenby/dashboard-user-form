import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              errorMsg = 'Network error. Please check your connection.';
              break;
            case 400:
              errorMsg = error.error?.message || 'Bad request.';
              break;
            case 401:
              errorMsg = 'Unauthorized. Please login again.';
              // this.router.navigate(['/login']);
              break;
            case 403:
              errorMsg = 'Access denied.';
              break;
            case 404:
              errorMsg = 'Resource not found.';
              break;
            case 500:
              errorMsg = 'Internal server error.';
              break;
            default:
              errorMsg = error.error?.message || `Error ${error.status}`;
          }
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMsg,
        });

        return throwError(() => error);
      })
    );
  }
}
