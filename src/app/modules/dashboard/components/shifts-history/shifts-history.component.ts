import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Shift } from '../../../../types/shift.type';

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

  columns = [
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

  selectedColumns: any[] = [];

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
    console.log(this.dt);
    this.dt.exportCSV();
  }

  onColReorder(event: any) {
    this.selectedColumns = [...event.columns];
  }
}
