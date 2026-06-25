import { Component, Input, Output } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ExperienceImageType } from '@proxy/experience-images';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-experiment-photos',
  templateUrl: './experiment-photos.component.html',
  styleUrl: './experiment-photos.component.scss',
})
export class ExperimentPhotosComponent {
  @Input() form: FormGroup = new FormGroup({});
  uploadPhotoUrl = `${environment.apis.default.url}/api/app/vacation-home-hosts/upload`;
  downloadPhotoUrl = `${environment.apis.default.url}api/app/vacation-home-hosts/download`;

  constructor() {}

  ngOnInit(): void {
    this.updateValues();
  }
  addImage(event) {
    if (event?.type == 'success') {
      this.images.push(new FormControl(`${this.downloadPhotoUrl}/${event.file.response.name}`));
      this.updateValues();
    }
  }

  addExpImage(event) {
    if (event?.type == 'success') {
      this.expImages.push(new FormControl(`${this.downloadPhotoUrl}/${event.file.response.name}`));
      this.updateValues();
    }
  }

  delete(index) {
    this.images.controls.splice(index, 1);
    this.updateValues();
  }

  deleteExpImages(index) {
    this.expImages.controls.splice(index, 1);
    this.updateValues();
  }

  get images() {
    return this.form.get('primaryImages') as FormArray;
  }

  get expImages() {
    return this.form.get('experienceImages') as FormArray;
  }

  updateValues() {
    this.images.setValue(this.images.controls.map(x => x.value));
    this.expImages.setValue(this.expImages.controls.map(x => x.value));
  }
}
