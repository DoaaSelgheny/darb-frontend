import { Component, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MeanDto } from '@proxy/means';

@Component({
  selector: 'app-experiment-means-included',
  templateUrl: './experiment-means-included.component.html',
  styleUrl: './experiment-means-included.component.scss',
})
export class ExperimentMeansIncludedComponent {
  @Input() form: FormGroup = new FormGroup({});
  @Input() means: MeanDto[];

  constructor() {}

  ngOnInit(): void {
    this.updateValues();
  }

  setValue($event, meanId: number) {
    if ($event) {
      if (!this.selectedMeans.controls.map(x => x.value).some(x => x == meanId)) {
        this.selectedMeans.push(new FormControl(meanId));
      }
    } else {
      const ix = this.selectedMeans.controls.findIndex(x => x.value == meanId);
      this.selectedMeans.controls.splice(ix, 1);
    }
    // ensure values get updated for validation
    this.updateValues();
  }

  get selectedMeans() {
    return this.form.get('meanIds') as FormArray;
  }

  getValue(meanId: number) {
    return this.selectedMeans.controls.map(x => x.value).some(x => x == meanId);
  }

  updateValues() {
    this.selectedMeans.setValue(this.selectedMeans.controls.map(x => x.value));
  }
}
