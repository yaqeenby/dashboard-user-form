import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashbordService } from './services/dashboard.service';
import { KPIs, KPIvalue } from './types/kpi.type';
import { FormControl } from '@angular/forms';
import * as Papa from 'papaparse';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MessageService } from 'primeng/api';
import { Shift } from './types/shift.type';
import { TripExportedData } from './types/trip-exported-data.type';

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
      .getShifts(false)
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
            value.id = key;
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

  reloadShifts() {
    this.searchControl.reset();
    this.loadShifts();
  }

  exportMultipleShifts() {
    const allTrips = this.shifts.flatMap((shift) =>
      shift.trips.map((trip) => {
        let exportedTrip: TripExportedData = new TripExportedData(trip, shift);
        return exportedTrip;
      })
    );

    let combinedCsv = Papa.unparse(allTrips as any);

    const blob = new Blob([combinedCsv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'shifts.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
