import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LayoutModule, Toast, Ripple],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent {}
