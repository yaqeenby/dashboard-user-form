import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-shifts-history',
  templateUrl: './shifts-history.component.html',
  styleUrl: './shifts-history.component.scss',
  standalone: false,
})
export class ShiftsHistoryComponent implements OnInit {
  @ViewChild('dataTable') dt!: Table;
  @Input() products: any[] = [];
  @Input() showSearchAndActions: boolean = false;
  @Input() stateKey: string = '';

  allColumns = [
    { field: 'vehicle', header: 'Vehicle', sortable: true },
    { field: 'plateNum', header: 'PlateNum', sortable: true },
    { field: 'odometer', header: 'Odometer' },
    { field: 'GPS', header: 'GPS' },
    { field: 'device', header: 'Device' },
    { field: 'SIM', header: 'SIM' },
    { field: 'fleet', header: 'Fleet' },
    { field: 'status', header: 'Status' },
    { field: 'actions', header: '' },
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

  columns: any[] = [...this.allColumns];

  ngOnInit() {
    if (this.stateKey && localStorage) {
      const savedState = localStorage.getItem(this.stateKey);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        const colOrder = parsed?.columnOrder;

        if (colOrder?.length) {
          this.columns = colOrder
            .map((colField: string) =>
              this.allColumns.find((c) => c.field === colField)
            )
            .filter(Boolean);
        } else {
          this.columns = [...this.allColumns];
        }
      } else {
        this.columns = [...this.allColumns];
      }
    }
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'danger';

      case 2:
        return 'success';

      case 3:
        return 'info';

      case 4:
        return 'warn';

      case 5:
        return 'pending';
    }

    return 'pending';
  }

  export() {
    console.log(this.dt);
    this.dt.exportCSV();
  }

  onColReorder(event: any) {
    this.columns = [...event.columns]; // أو حسب ترتيب الحدث
  }
}
