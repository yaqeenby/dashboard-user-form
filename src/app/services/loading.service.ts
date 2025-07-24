// loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  private loadingCounter = 0;

  show() {
    this.loadingCounter++;
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingCounter--;
    if (this.loadingCounter <= 0) {
      this.loadingSubject.next(false);
      this.loadingCounter = 0;
    }
  }
}
