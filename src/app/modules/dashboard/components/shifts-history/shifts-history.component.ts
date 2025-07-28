import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Papa from 'papaparse';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  from,
  map,
  mergeMap,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { DashbordService } from '../../services/dashboard.service';
import { MessageService } from 'primeng/api';
import { Shift } from '../../types/shift.type';
import { TripExportedData } from '../../types/trip-exported-data.type';

@Component({
  selector: 'app-shifts-history',
  templateUrl: './shifts-history.component.html',
  styleUrl: './shifts-history.component.scss',
  standalone: false,
})
export class ShiftsHistoryComponent implements OnInit, OnDestroy {
  shifts: Shift[] = [];
  searchControl = new FormControl();

  maxShiftsAllowed = 5;

  private destroy$ = new Subject<void>();

  constructor(
    private dashbordService: DashbordService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadShifts();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((searchText: string) => this.getFilteredShifts(searchText)),
        takeUntil(this.destroy$)
      )
      .subscribe((filtered) => {
        this.shifts = filtered as Shift[];
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadShifts() {
    this.dashbordService.getShifts().subscribe(
      (res: Shift[]) => {
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

  reloadShifts() {
    this.searchControl.reset();
    this.loadShifts();
  }

  onCSVImport(event: any): void {
    const file = event.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const csvData = result.data;

          if (csvData.length > this.maxShiftsAllowed) {
            this.messageService.add({
              severity: 'error',
              summary: 'Too many records',
              detail: 'Only 5 shifts max are allowed per upload.',
            });
            return;
          }

          const shifts: Shift[] = this.transformToShifts(csvData);
          this.saveShiftsBulk(shifts);
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
          // Show message to user
        },
      });
    }
  }

  transformToShifts(data: any[]) {
    const shiftMap = new Map<string, any>();

    data.forEach((row) => {
      const shiftId = row.shiftId;
      if (!shiftMap.has(shiftId)) {
        shiftMap.set(shiftId, {
          id: shiftId,
          name: row.shiftName,
          startDate: row.startDate,
          endDate: row.endDate,
          trips: [],
        });
      }

      let trip: TripExportedData = Object.assign(
        new TripExportedData(row, shiftMap.get(shiftId)),
        row
      );
      shiftMap.get(shiftId).trips.push(trip.toTrip());
    });

    return Array.from(shiftMap.values());
  }

  saveShiftsBulk(shifts: Shift[]) {
    if (!shifts?.length) return;
    from(shifts)
      .pipe(
        mergeMap(
          (shift) =>
            this.dashbordService.addShift(shift).pipe(
              tap(() => {}),
              catchError((err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Something Went Wrong',
                });
                return of(null);
              })
            ),
          3
        ),
        finalize(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'All Shifts Added Successfully',
          });

          this.reloadShifts();
        })
      )
      .subscribe();
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
