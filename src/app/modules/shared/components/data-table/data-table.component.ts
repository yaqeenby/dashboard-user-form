import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
  standalone: false,
})
export class DataTableComponent {
  @ViewChild('dataTable') dt!: Table;

  @Input() value: any[] = [];
  @Input() columns: {
    field: string | undefined;
    header: string;
    sortable?: boolean;
  }[] = [];
  @Input() globalFilterFields: string[] = [];
  @Input() dataKey: string = 'id';
  @Input() captionTemplate?: TemplateRef<any> | any;
  @Input() rowTemplate?: TemplateRef<any> | any;
  @Input() showSearchAndActions: boolean = false;

  tableStyle = { 'min-width': '50rem' };
  export() {
    console.log(this.dt);
    this.dt.exportCSV();
  }

  onColReorder(event: any) {
    // PrimeNG بيعدل ترتيب الأعمدة تلقائيًا بـ DOM، بس إحنا لازم نعدل ترتيب الـ columns array كمان
    this.columns = [...event.columns]; // أو حسب ترتيب الحدث
  }
}
