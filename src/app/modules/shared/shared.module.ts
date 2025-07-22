import { NgModule } from '@angular/core';
import { DataTableComponent } from './components/data-table/data-table.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { MenuModule } from 'primeng/menu';
import { FileUpload } from 'primeng/fileupload';

@NgModule({
  declarations: [DataTableComponent],
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
  ],
  exports: [
    DataTableComponent,
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
  ],
})
export class SharedModule {}
