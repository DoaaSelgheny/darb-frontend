import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-item.component.html',
  styleUrl: './info-item.component.scss',
})
export class InfoItemComponent {
  @Input({ required: true }) label: string;
  @Input() value?: string = null;
  @Input() img?: string = null;

}
