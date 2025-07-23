import { Component, OnInit } from '@angular/core';
import { DashbordService } from './services/dashboard.service';
import { Shift } from '../../types/shift.type';
import { error } from 'console';
import { KPIs, KPIvalue } from './types/kpi.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  value = 100;

  cards: any[] = [
    {
      per: 100,
      value: 390,
      total: 400,
      label: 'Active Trips',
    },
    {
      per: 100,
      value: 200,
      total: 400,
      label: 'Active Trips',
    },
    {
      per: 100,
      value: 340,
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
      vehicle: 'ABus-9265',
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
      status: 2,
    },
    {
      id: 2,
      vehicle: 'Bus-9265',
      plateNum: '104321',
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
      status: 2,
    },
    {
      id: 3,

      vehicle: 'CBus-9265',
      plateNum: '204321',
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
      status: 2,
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
      status: 2,
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

  loadingShifts = false;
  shifts: Shift[] = [];

  loadingKPIs = false;
  KPIs: KPIs | null = null;
  KPIsElements: KPIvalue[] = [];
  constructor(private dashbordService: DashbordService) {}

  ngOnInit(): void {
    this.loadKPIs();
    this.loadShifts();
  }

  loadKPIs() {
    this.loadingKPIs = true;
    this.dashbordService.getKPIs().subscribe(
      (res) => {
        this.KPIs = res as KPIs;

        if (this.KPIs) {
          let i = 0;
          this.KPIsElements = [];
          for (let [key, value] of Object.entries(this.KPIs)) {
            value.opacity = this.getOpacity(i);
            this.KPIsElements.push(value);
            i++;
          }
        }
        this.loadingKPIs = false;
      },
      (error) => {
        this.loadingKPIs = false;
      }
    );
  }

  loadShifts() {
    this.loadingShifts = true;
    this.dashbordService.getShifts().subscribe(
      (res) => {
        this.shifts = res;
        this.loadingShifts = false;
      },
      (error) => {
        this.loadingShifts = false;
      }
    );
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

  getOpacity(index: number): number {
    const group = Math.floor(index / 3);
    switch (group) {
      case 0:
        return 1;
      case 1:
        return 0.6;
      case 2:
        return 0.35;
      case 3:
        return 0.15;
      default:
        return 0.1; // fallback for more than 12 items
    }
  }
}
