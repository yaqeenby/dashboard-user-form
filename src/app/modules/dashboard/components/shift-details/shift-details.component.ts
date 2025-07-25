import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Shift } from '../../types/shift.type';
import { TableColumn } from '../../../shared/types/table-column.type';

@Component({
  selector: 'app-shift-details',
  templateUrl: './shift-details.component.html',
  styleUrl: './shift-details.component.scss',
  standalone: false,
})
export class ShiftDetailsComponent implements OnInit {
  @ViewChild('dataTable') dt!: Table;
  @Input() shift!: Shift;
  @Input() stateKey: string = '';

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

  tableStyle = { 'min-width': '50rem' };
  dataKey: string = 'id';

  selectedColumns: TableColumn[] = [];

  constructor() {}

  ngOnInit(): void {
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

  onColReorder(event: any) {
    this.selectedColumns = [...event.columns];
  }
}
