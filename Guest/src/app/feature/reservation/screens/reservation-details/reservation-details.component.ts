import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationType } from '@proxy/reservation-users/reservation-type.enum';
import { ReservationStatus } from '@proxy/reservation-users/reservation-status.enum';
import { ReservationSummaryComponent } from '../../components/reservation-summary/reservation-summary.component';
import { ReservationsGuestService } from '@proxy/reservations';
import { PaymentInformationComponent } from '../../components/payment-information/payment-information.component';
import { TermsInformationComponent } from "../../components/terms-information/terms-information.component";
import { DepositeInformationComponent } from '../../components/deposite-information/deposite-information.component';
import { MapInformationComponent } from '../../components/map-information/map-information.component';
import { GuestInformationComponent } from '../../components/guest-information/guest-information.component';
import { SliderInformationComponent } from '../../components/slider-information/slider-information.component';
import { SimilarVacationHomeComponent } from 'src/app/feature/details-vacation-home/components/similar-home/similar-home.component';
import { SimilarHomeComponent } from 'src/app/feature/details-experience/components/similar-home/similar-home.component';
import { ReasonCancellationComponent } from '../../components/reason-cancellation/reason-cancellation.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-reservation-details',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    ReservationSummaryComponent,
    PaymentInformationComponent,
    TermsInformationComponent,
    TermsInformationComponent,
    DepositeInformationComponent,
    MapInformationComponent,
    GuestInformationComponent,
    SliderInformationComponent,
    SimilarVacationHomeComponent,
    SimilarHomeComponent,
    ReasonCancellationComponent
],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.scss',
})
export class ReservationDetailsComponent implements OnInit {
  id: number;
  type:any;
  data = null;
  reservationTypeEnum=ReservationType;
  isVaction:boolean=false;
  ReservationStatus=ReservationStatus;
  copied:boolean=false;
  constructor(
    private service: ReservationsGuestService,
    private route: ActivatedRoute,
    private modalService: NzModalService,
    private router:Router
  ) {
    this.id = +this.route.snapshot.params['id'];
    this.type = +this.route.snapshot.params['type'];
    
  }
 
  images=[]
  ngOnInit(): void {
    
   
    this.getDate();
  }
  getDate(){
    if(this.type===this.reservationTypeEnum.VacationHome){
      this.service.getVacationHomeReservationDetailsById(this.id).subscribe(x => {
        this.data = x;
        this.images=this.data?.vacationHomeSummary.images
        this.images = [...this.images, this.data.vacationHomeSummary.primaryImage]
      });
      this.isVaction=true;
  }
    if(this.type===this.reservationTypeEnum.Experience){
      this.service.getExperienceReservationDetailsById(this.id).subscribe(x => {
        this.data = x;
        this.images=this.data.experienceSummary.images
      });
      this.isVaction=false;
              

    }
  }
  copyToClipboard(number:any)
  {
    navigator.clipboard.writeText(number).then(
      () => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
      }
    );
  }
   rating(item){
    if(this.isVaction){

      let data = {
        id:item.id,
        reservationType:item.summary.reservationType,
        vacationHomeName:item.vacationHomeSummary.name,
        image:item.vacationHomeSummary.primaryImage,
        city:{name:item.vacationHomeSummary.location.cityName},
        district:{name:item.vacationHomeSummary.location.districtName},
        ratingsAverage:item.summary.ratingsAverage,
        ratingsCount:item.summary.ratingsCount,
      }
      const modal = this.modalService.create({
        nzFooter: null,
        nzWidth: 700,
        nzClassName: 'rounded-xl',
        nzContent: RatingComponent,
        nzData:{item:data}
      });

      modal.afterClose.subscribe((data) => {
        this.getDate();
        
      });
    }else{
      let data = {
        id:item.id,
        reservationType:item.summary.reservationType,
        experienceName:item.experienceSummary.name,
        image:item.experienceSummary.primaryImage,
        city:{name:item.experienceSummary.location.cityName},
        district:{name:item.experienceSummary.location.districtName},
        ratingsAverage:item.summary.ratingsAverage,
        ratingsCount:item.summary.ratingsCount,
        
      }
      const modal = this.modalService.create({
        nzFooter: null,
        nzWidth: 700,
        nzClassName: 'rounded-xl',
        nzContent: RatingComponent,
        nzData:{item:data}
      });

      modal.afterClose.subscribe((data) => {
        this.getDate();
        
      });
    }
    }
        
    }

