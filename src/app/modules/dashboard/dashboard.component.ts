import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashbordService } from './services/dashboard.service';
import { KPIs, KPIvalue } from './types/kpi.type';
import { Subject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit, OnDestroy {
  KPIs: KPIs | null = null;
  KPIsElements: KPIvalue[] = [];
  loadingKPIs: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(
    private dashbordService: DashbordService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadKPIs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
            value.id = key;
            this.KPIsElements.push(value);
            i++;
          }
        }
        this.loadingKPIs = false;
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something Went Wrong',
        });
        this.loadingKPIs = false;
      }
    );
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

  trackByFn(index: number, item: any): any {
    return item.id;
  }
}
