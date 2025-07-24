import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableColumn } from '../../types/table-column.type';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

@Component({
  selector: 'app-table-columns-plus',
  templateUrl: './table-columns-plus.component.html',
  styleUrl: './table-columns-plus.component.scss',
  standalone: false,
})
export class TableColumnsPlusComponent {
  @Input() columns: TableColumn[] = [];

  @Input() selectedColumns: TableColumn[] = [];

  @Output() onChange: EventEmitter<TableColumn[]> = new EventEmitter<
    TableColumn[]
  >();

  onChangeFire(event: MultiSelectChangeEvent) {
    this.onChange.emit(event.value as TableColumn[]);
  }
}
