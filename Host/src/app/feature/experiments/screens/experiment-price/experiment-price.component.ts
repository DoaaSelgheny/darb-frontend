import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { ProgressService } from '../../../../../shared/ui-components/progress-group/service/progress.service';
import { FormGroup } from '@angular/forms';
import { LookupDto } from '@proxy/shared';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';

@Component({
  selector: 'app-experiment-price',
  templateUrl: './experiment-price.component.html',
  styleUrl: './experiment-price.component.scss',
})
export class ExperimentPriceComponent {
  @Input() form: FormGroup;
  @Input() cancellationAndReturnPolicies: LookupDto<number>[] = [];
  @Input() experienceReservationWays: LookupDto<number>[] = [];
  vaidationTypeEnum = vaidationType;
  constructor() {}

  ngOnInit(): void {}
}
