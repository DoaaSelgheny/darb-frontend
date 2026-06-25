import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiment-description',
  templateUrl: './experiment-description.component.html',
  styleUrl: './experiment-description.component.scss',
})
export class ExperimentDescriptionComponent {
  @Input() form: FormGroup;
  constructor() {}

  ngOnInit(): void {}
}
