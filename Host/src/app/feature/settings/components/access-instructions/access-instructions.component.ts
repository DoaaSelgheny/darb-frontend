import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-access-instructions',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './access-instructions.component.html',
  styleUrl: './access-instructions.component.scss',
})
export class AccessInstructionsComponent {}
