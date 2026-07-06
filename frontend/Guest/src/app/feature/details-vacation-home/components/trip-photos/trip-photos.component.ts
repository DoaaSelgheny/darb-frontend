import { Component, Input } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { SharedModule } from 'src/shared/shared.module';
import PhotoViewer from 'photoviewer';

@Component({
  selector: 'app-trip-photos',
  standalone: true,
  imports: [SharedModule,NzCarouselModule],
  templateUrl: './trip-photos.component.html',
  styleUrl: './trip-photos.component.scss',
})
export class TripPhotosComponent  {
  @Input() images=[]; 
  effect = 'scrollx';
  indexFirstImg = 0;
  private photoViewerInstance: PhotoViewer | null = null;
  constructor() {
   
  }


  openPhotoViewer(index: number): void {
    try {
      if (
        !this.images 
      ) {
        return;
      }
      const images = this.images.map(img => ({
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
