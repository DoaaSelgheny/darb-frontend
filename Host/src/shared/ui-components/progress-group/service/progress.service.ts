import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  progress: number = 0;
  constructor() {}

  updateProgress(progress: number) {
    this.progress = progress;
  }
}
