import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockApiService } from '../../../core/api/mock-api';
import { KPIs } from '../types/kpi.type';
import { Shift } from '../../../types/shift.type';

@Injectable({
  providedIn: 'root',
})
export class DashbordService {
  constructor(private mockApiService: MockApiService) {}

  getShifts(): Observable<Array<Shift>> {
    return this.mockApiService.get<Array<Shift>>('/shifts');
  }

  getKPIs(): Observable<KPIs> {
    return this.mockApiService.get<KPIs>('/kpis');
  }

  addShift(shift: Shift): Observable<Shift> {
    return this.mockApiService.post<Shift>('/shifts', shift);
  }
}
