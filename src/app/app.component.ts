import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutModule } from './modules/layout/layout.module';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
