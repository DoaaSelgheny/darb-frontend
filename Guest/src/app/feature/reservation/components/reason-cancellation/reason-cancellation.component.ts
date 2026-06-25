import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-reason-cancellation',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reason-cancellation.component.html',
  styleUrl: './reason-cancellation.component.scss'
})
export class ReasonCancellationComponent {
@Input() data: any;
}
