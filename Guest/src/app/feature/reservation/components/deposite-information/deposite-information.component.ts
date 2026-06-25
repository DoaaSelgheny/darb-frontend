import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-deposite-information',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './deposite-information.component.html',
  styleUrl: './deposite-information.component.scss'
})
export class DepositeInformationComponent {
@Input() data: any;

}
