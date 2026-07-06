import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistic-item',
  templateUrl: './statistic-item.component.html',
  styleUrl: './statistic-item.component.scss',
})
export class StatisticItemComponent {
  @Input() color: string = '';
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() count: string = '';
  @Input() img: string = '';

}
