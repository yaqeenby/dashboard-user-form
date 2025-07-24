import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { Shift } from '../../../../types/shift.type';
import { FormControl } from '@angular/forms';
import { TableColumn } from '../../../shared/types/table-column.type';
import * as Papa from 'papaparse';
import { catchError, finalize, from, mergeMap, of, tap } from 'rxjs';
import { DashbordService } from '../../services/dashboard.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shifts-history',
  templateUrl: './shifts-history.component.html',
  styleUrl: './shifts-history.component.scss',
  standalone: false,
})
export class ShiftsHistoryComponent implements OnInit {
  @ViewChild('dataTable') dt!: Table;
  @Input() shift: Shift | null = null;
  @Input() showSearchAndActions: boolean = false;
  @Input() stateKey: string = '';
  @Input() searchControl!: FormControl;

  columns: TableColumn[] = [
    { field: 'vehicle', header: 'Vehicle', sortable: true, visible: true },
    { field: 'plateNum', header: 'PlateNum', sortable: true, visible: true },
    { field: 'odometer', header: 'Odometer', visible: true },
    { field: 'GPS', header: 'GPS', visible: true },
    { field: 'device', header: 'Device', visible: true },
    { field: 'SIM', header: 'SIM', visible: true },
    { field: 'fleet', header: 'Fleet', visible: true },
    { field: 'status', header: 'Status', visible: true },
  ];

  globalFilterFields = ['vehicle', 'plateNum'];

  items = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh',
        },
        {
          label: 'Export',
          icon: 'pi pi-upload',
        },
      ],
    },
  ];

  tableStyle = { 'min-width': '50rem' };
  dataKey: string = 'id';

  selectedColumns: TableColumn[] = [];
  maxShiftsAllowed = 5;

  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onExportData: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private dashbordService: DashbordService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    if (this.stateKey && localStorage) {
      const savedState = localStorage.getItem(this.stateKey);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        const colOrder = parsed?.columnOrder;

        if (colOrder?.length) {
          this.selectedColumns = colOrder
            .map((colField: string) =>
              this.columns.find((c) => c.field === colField)
            )
            .filter(Boolean);
        } else {
          this.selectedColumns = [...this.columns];
        }
      } else {
        this.selectedColumns = [...this.columns];
      }
    }
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'Accepted';

      case 2:
        return 'Active';

      case 3:
        return 'Completed';
    }

    return 'Pending';
  }

  export() {
    this.dt.exportCSV();
  }

  onColReorder(event: any) {
    this.selectedColumns = [...event.columns];
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
      const shiftId = row['shiftId'];
      if (!shiftMap.has(shiftId)) {
        shiftMap.set(shiftId, {
          id: shiftId,
          name: row['shiftName'],
          startDate: row['startDate'],
          endDate: row['endDate'],
          trips: [],
        });
      }

      shiftMap.get(shiftId).trips.push({
        id: row['id'],
        vehicle: row['vehicle'],
        plateNum: row['plateNum'],
        odometer: row['odometer'],
        GPS: row['GPS'],
        device: {
          name: row['deviceName'],
          serial: row['deviceSerial'],
        },
        SIM: {
          name: row['SIMName'],
          size: row['SIMSize'],
        },
        fleet: row['fleet'],
        status: row['status'],
      });
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

          this.onExportData.emit(true);
        })
      )
      .subscribe();
  }
}
