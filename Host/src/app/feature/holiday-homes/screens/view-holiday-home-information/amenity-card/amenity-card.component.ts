import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-amenity-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './amenity-card.component.html',
  styleUrl: './amenity-card.component.scss',
})
export class AmenityCardComponent {
  @Input({ required: true }) name: string;
  @Input() symbol: string;
  @Input() description?: string = null;
  @Input() count?: string = null;
  @Input() guests?: string = null;
}
