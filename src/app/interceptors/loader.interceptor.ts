import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loader: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const showLoader = req.headers.get('X-Show-Loader') === 'true';

    if (showLoader) {
      this.loader.show();
    }

    return next.handle(req).pipe(
      finalize(() => {
        if (showLoader) {
          this.loader.hide();
        }
      })
    );
  }
}
