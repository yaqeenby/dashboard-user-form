import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { KnobModule } from 'primeng/knob';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Tag } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    FormsModule,
    ButtonModule,
    KnobModule,
    CardModule,
    CommonModule,
    TableModule,
    Tag,
    InputTextModule,
    IconField,
    InputIcon,
    MenuModule,
    PanelMenuModule,
    MenubarModule,
    MegaMenuModule,
    TieredMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard-user-form';
  value = 100;

  cards = [
    {
      per: 100,
      value: 300,
      total: 400,
      label: 'Active Trips',
    },
    {
      per: 100,
      value: 300,
      total: 400,
      label: 'Active Trips',
    },
    {
      per: 100,
      value: 300,
      total: 400,
      label: 'Active Trips',
    },
    {
      value: 300,
      label: 'Active Trips',
    },
    {
      value: 300,
      label: 'Active Trips',
    },
    {
      value: 300,
      label: 'Active Trips',
    },
    {
      value: 300,
      label: 'Active Trips',
    },
    {
      value: 300,
      label: 'Active Trips',
    },
    {
      value: 300,
      label: 'Active Trips',
    },
  ];

  cols = [
    { header: 'col1', field: 'code' },
    { header: 'col1', field: 'name' },
    { header: 'col1', field: 'category' },
    { header: 'col1', field: 'quantity' },
  ];
  products = [
    {
      id: 1,
      vehicle: 'Bus-9265',
      plateNum: '04321',
      odometer: '55,956 KM',
      GPS: '3-Nov-2024 13:05:50',
      device: {
        name: 'Teltonika',
        serial: 'C03-96321',
      },
      SIM: {
        name: 'Allowance',
        size: '1.5GB',
      },
      fleet: 'Q22',
      status: 4,
    },
    {
      id: 2,
      vehicle: 'Bus-9265',
      plateNum: '04321',
      odometer: '55,956 KM',
      GPS: '3-Nov-2024 13:05:50',
      device: {
        name: 'Teltonika',
        serial: 'C03-96321',
      },
      SIM: {
        name: 'Allowance',
        size: '1.5GB',
      },
      fleet: 'Q22',
      status: 4,
    },
    {
      id: 3,

      vehicle: 'Bus-9265',
      plateNum: '04321',
      odometer: '55,956 KM',
      GPS: '3-Nov-2024 13:05:50',
      device: {
        name: 'Teltonika',
        serial: 'C03-96321',
      },
      SIM: {
        name: 'Allowance',
        size: '1.5GB',
      },
      fleet: 'Q22',
      status: 4,
    },
    {
      id: 4,

      vehicle: 'Bus-9265',
      plateNum: '04321',
      odometer: '55,956 KM',
      GPS: '3-Nov-2024 13:05:50',
      device: {
        name: 'Teltonika',
        serial: 'C03-96321',
      },
      SIM: {
        name: 'Allowance',
        size: '1.5GB',
      },
      fleet: 'Q22',
      status: 4,
    },
  ];

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

  exportColumns = [{ title: 'id', dataKey: 'id' }];

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
}
