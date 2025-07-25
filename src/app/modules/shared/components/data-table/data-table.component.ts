import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Table } from 'primeng/table';
import { TableColumn } from '../../types/table-column.type';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  standalone: false,
})
export class DataTableComponent implements OnInit {
  @ViewChild('dataTable') dt!: Table;

  @Input() value: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() dataKey: string = 'id';
  @Input() captionTemplate?: TemplateRef<any> | any;
  @Input() rowTemplate?: TemplateRef<any> | any;
  @Input() showSearch: boolean = true;
  @Input() showExport: boolean = true;
  @Input() showImport: boolean = true;

  @Input() stateKey = 'generic-state-key';

  tableStyle = { 'min-width': '50rem' };

  selectedColumns: TableColumn[] = [];

  ngOnInit() {
    this.selectedColumns = [...this.columns];
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
  export() {
    console.log(this.dt);
    this.dt.exportCSV();
  }

  onColReorder(event: any) {
    this.selectedColumns = [...event.columns];
  }
}
