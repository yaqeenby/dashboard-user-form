import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashbordService } from './services/dashboard.service';
import { Shift } from '../../types/shift.type';
import { error } from 'console';
import { KPIs, KPIvalue } from './types/kpi.type';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  shifts: Shift[] = [];
  KPIs: KPIs | null = null;
  KPIsElements: KPIvalue[] = [];
  searchControl = new FormControl();
  private destroy$ = new Subject<void>();

  constructor(
    private dashbordService: DashbordService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadKPIs();
    this.loadShifts();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchText: string) => this.getFilteredShifts(searchText)),
        takeUntil(this.destroy$)
      )
      .subscribe((filtered) => {
        this.shifts = filtered;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadShifts() {
    this.getFilteredShifts().subscribe(
      (res) => {
        this.shifts = res;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something Went Wrong',
        });
      }
    );
  }

  getFilteredShifts(searchText: string = ''): Observable<any[]> {
    return this.dashbordService
      .getShifts()
      .pipe(map((shifts) => this.filterShifts(shifts, searchText)));
  }

  filterShifts(shifts: Shift[], search: string): any[] {
    if (!search) return shifts;
    const lower = search.toLowerCase();

    for (let sh of shifts) {
      sh.trips = sh.trips.filter(
        (trip) =>
          trip.vehicle.toLocaleLowerCase().includes(lower) ||
          trip.plateNum.toLocaleLowerCase().includes(lower) ||
          trip.odometer.toLocaleLowerCase().includes(lower) ||
          trip.GPS.toLocaleLowerCase().includes(lower) ||
          trip.status.toLocaleLowerCase().includes(lower) ||
          trip.fleet.toLocaleLowerCase().includes(lower) ||
          trip.device?.name?.toLocaleLowerCase().includes(lower) ||
          trip.device?.serial?.toLocaleLowerCase().includes(lower) ||
          trip.SIM?.name?.toLocaleLowerCase().includes(lower)
      );
    }

    return shifts;
  }

  loadKPIs() {
    this.dashbordService.getKPIs().subscribe(
      (res) => {
        this.KPIs = res as KPIs;

        if (this.KPIs) {
          let i = 0;
          this.KPIsElements = [];
          for (let [key, value] of Object.entries(this.KPIs)) {
            value.opacity = this.getOpacity(i);
            this.KPIsElements.push(value);
            i++;
          }
        }
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something Went Wrong',
        });
      }
    );
  }

  getOpacity(index: number): number {
    const group = Math.floor(index / 3);
    switch (group) {
      case 0:
        return 1;
      case 1:
        return 0.6;
      case 2:
        return 0.35;
      case 3:
        return 0.15;
      default:
        return 0.1; // fallback for more than 12 items
    }
  }
}
