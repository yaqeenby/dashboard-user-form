import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    CommonModule,
    LayoutModule,
    Toast,
    Ripple,
    BlockUIModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;

  constructor(
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges();
    });
  }
}
