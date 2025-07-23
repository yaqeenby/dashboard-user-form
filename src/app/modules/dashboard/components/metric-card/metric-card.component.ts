import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrl: './metric-card.component.scss',
  standalone: false,
})
export class MetricCardComponent {
  @Input() title: string = '';
  @Input() value?: number = 0;
  @Input() total?: number;
  @Input() showProgress: boolean = false;
  @Input() bgOpacity: number = 1;

  get percentage(): number | null {
    if (this.total && this.value != null && this.value != undefined) {
      return Math.round((this.value / this.total) * 100);
    }
    return 0;
  }
}
