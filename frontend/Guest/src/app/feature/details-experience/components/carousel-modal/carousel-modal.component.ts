import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';

@Component({
  selector: 'app-carousel-modal',
  standalone: true,
  imports: [CommonModule, NzCarouselModule,NzButtonModule,UiComponentsModule,TimeFormatPipe],
  template: `

<div class="relative w-full">
  <div class="flex overflow-x-auto  p-4 mx-2 slider" #slider>
    @if(availableSchedualeDates){

      @if(availableSchedualeDates.length){
  
        <div *ngFor="let item of availableSchedualeDates" class="flex-none w-1/3">
          <div 
            class="rounded-lg border border-[#10205C] text-[#10205C] hover:bg-[#10205C] hover:text-white
                       text-center p-3 text-base font-bold"
           [ngClass]="{'active': selectedDateitem === item}" (click)="selectedDate(item)">
            <p>{{ item }}</p>
          </div>
        </div>
      }@else{
        <p>{{'::noDate'|abpLocalization}}</p>
  
      }
    }@else {

      @if(availableSchedualeTime && availableSchedualeTime.length > 0){
       @for( timeSlot of availableSchedualeTime;track timeSlot){
 
         <div  class="flex-none w-1/3">
           <div 
             class="rounded-lg border border-[#10205C] text-[#10205C] hover:bg-[#10205C] hover:text-white
             text-center py-3 px-2 text-base font-bold"
             [ngClass]="{'active': selectedDateitem === timeSlot}"
             (click)="selectedDate(timeSlot)">
             <p>{{timeSlot.checkInTime | timeFormat}}-{{timeSlot.checkOutTime | timeFormat}}
             </p>
           </div>
         </div>
       }
     }@else {
       <p>{{'::noTime'|abpLocalization}}</p>
     }
    }
  </div>

  <!-- Navigation buttons -->
  <button 
    class="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500  rounded-full hover:bg-gray-300 hover:text-white"
    (click)="scrollLeft(slider)">
    &#10095;
  </button>
  <button 
    class="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 text-gray-500  rounded-full hover:bg-gray-300 hover:text-white"
    (click)="scrollRight(slider)">
    &#10094;
  </button>
</div>
<hr/>
<div class="modal-footer mt-4">
  <button nz-button nzType="primary" nzBlock class="border rounded-sm mx-1" (click)="onOk()">
    {{"::General:Confirm"|abpLocalization}}
  </button>
</div>
  `,
  styleUrls: ['./carousel-modal.component.scss'],
})
export class CarouselModalContentComponent {
  selectedDateitem: any;
  availableSchedualeDates: any[] ;  // List of available dates
  availableSchedualeTime:any[]// List of available times
  effect: string = 'scrollx';

  constructor(@Inject(NZ_MODAL_DATA) public data: any,private modalRef: NzModalRef) {
    if(data.data) this.availableSchedualeDates = data.data;
    if(data.selectedDate) this.selectedDateitem = data.selectedDate
    if(data.time) this.availableSchedualeTime = data.time
    console.log(this.availableSchedualeTime)
    console.log(this.availableSchedualeDates)

  }

  // Helper function to chunk the available dates into groups of 5
    // Function to chunk the available dates into groups of 5 items
    chunkedScheduleDates(dates: string[], chunkSize: number = 3): string[][] {
      const chunks = [];
      for (let i = 0; i < dates.length; i += chunkSize) {
        chunks.push(dates.slice(i, i + chunkSize));
      }
      return chunks;
    }
  

  // Function to handle date selection
  selectedDate(item: any) {
    this.selectedDateitem = item;
  }
 

  scrollLeft(slider: HTMLElement): void {
    slider.scrollBy({ left: -slider.offsetWidth / 3, behavior: 'smooth' });
  }

  scrollRight(slider: HTMLElement): void {
    slider.scrollBy({ left: slider.offsetWidth / 3, behavior: 'smooth' });
  }

  onOk(): void {
    this.modalRef.close(this.selectedDateitem); // Send the selected date back to the parent
  }

  onCancel(): void {
    this.modalRef.close(null); // Close the modal without sending any data
  }
}
