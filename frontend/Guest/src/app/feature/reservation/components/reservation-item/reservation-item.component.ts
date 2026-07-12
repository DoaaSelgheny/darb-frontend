import { LocalizationService } from '@abp/ng.core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AmountPay, ReservationStatus, ReservationType } from '@proxy/reservation-users';
import { ReservationGuestDto } from '@proxy/reservations';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TimeFormatPipe } from 'src/shared/pipes/time-format.pipe';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.scss'],
  standalone: true,
  imports:[  
    NzBreadCrumbModule, UiComponentsModule, TimeFormatPipe,NzIconModule
  ]
})
export class ReservationItemComponent {
  @Input() item: ReservationGuestDto = null;
  @Input() reservationTime:string = '';
  @Output() ratingEvent = new EventEmitter();
  reserveType = ReservationType
  ReservationStatus = ReservationStatus;
  AmountPay = AmountPay;
  lang = this.localizationService.currentLang;

  constructor(
    private router:Router,    
    private localizationService: LocalizationService,
    private modalService: NzModalService,
    
) {}
  reBooking(type){
    if(type  == this.reserveType.VacationHome ){
      this.router.navigate([`/vacation-home-details/${this.item.vacationHomeId}`])
    }else{
      this.router.navigate([`/experience-details/${this.item.experienceId}`])

    }

  }
  goToDetails(type){
    if(type  == this.reserveType.VacationHome ){
      this.router.navigate([`/reservation/${this.item.id}`,{type:type}])
    }else{
      this.router.navigate([`/reservation/${this.item.id}`,{type:type}])

    }

  }
  pay(){
    if(this.item.paymentUrl){
      window.open(this.item.paymentUrl, '_blank');
    }
  }
  explore(type){
    if(type  == this.reserveType.VacationHome ){
      this.router.navigate([`/explore`,{type:type}])
    }else{
      this.router.navigate([`/explore`,{type:type}])

    }

  }
  rating(item){
    console.log(item)
      const modal = this.modalService.create({
        nzFooter: null,
        nzWidth: 700,
        nzClassName: 'rounded-xl',
        nzContent: RatingComponent,
        nzData:{item:item}
      });

      modal.afterClose.subscribe((data) => {
        this .ratingEvent.emit(true)
        
      });
  }
}
