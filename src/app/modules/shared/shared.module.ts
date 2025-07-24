import { NgModule } from '@angular/core';
import { DataTableComponent } from './components/data-table/data-table.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { FileUpload } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableColumnsPlusComponent } from './components/table-columns-plus/table-columns-plus.component';

@NgModule({
  declarations: [DataTableComponent, TableColumnsPlusComponent],
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    CommonModule,
    TableModule,
    Tag,
    InputTextModule,
    IconField,
    InputIcon,
    MenuModule,
    FileUpload,
    MultiSelectModule,
  ],
  exports: [
    DataTableComponent,
    TableColumnsPlusComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CommonModule,
    TableModule,
    Tag,
    InputTextModule,
    IconField,
    InputIcon,
    MenuModule,
    FileUpload,
    MultiSelectModule,
  ],
})
export class SharedModule {}
