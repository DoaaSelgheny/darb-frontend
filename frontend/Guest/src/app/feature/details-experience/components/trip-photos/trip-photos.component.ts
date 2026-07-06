import { Component, Input } from '@angular/core';
import { GetExperienceDetailsForGuestResponseDto } from '@proxy/experiences';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { SharedModule } from 'src/shared/shared.module';
import PhotoViewer from 'photoviewer';

@Component({
  selector: 'app-trip-photos',
  standalone: true,
  imports: [SharedModule, NzCarouselModule],
  templateUrl: './trip-photos.component.html',
  styleUrl: './trip-photos.component.scss',
})
export class TripPhotosComponent {
  effect = 'scrollx';
  @Input() experience: GetExperienceDetailsForGuestResponseDto = null;
  indexFirstImg = 0;
  private photoViewerInstance: PhotoViewer | null = null;
  constructor() {}

  openPhotoViewer(index: number): void {
    try {
      if (
        !this.experience ||
        !this.experience.experience ||
        !this.experience.experience.experienceImages
      ) {
        return;
      }

      const images = this.experience.experience.experienceImages.map(img => ({
        title: '',
        src: img.imagePath,
      }));

      const options: PhotoViewer.Options = {
        index: index,
        title: false,
        movable: true,
        keyboard: true,
      };
      if (this.photoViewerInstance) {
        this.photoViewerInstance.close();
        this.photoViewerInstance = null;
      }
  
    
      this.photoViewerInstance = new PhotoViewer(images, options);


      // const viewer = new PhotoViewer(images, options);
    } catch (error) {
      console.error('Error initializing PhotoViewer:', error);
    }
  }
}
