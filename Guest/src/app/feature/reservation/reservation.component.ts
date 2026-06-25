
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationGuestDto, ReservationsGuestService } from '@proxy/reservations';
import { ReservationTimeFrame } from '@proxy/shared/enums';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
})
export class ReservationComponent implements OnInit {
  constructor(
    private reservationService: ReservationsGuestService,
    private route:ActivatedRoute

  ) {}
  totalCount = 0;
  page = 1;
  itemsPerPage = 4;
  ReservationTimeFrame = ReservationTimeFrame;
  reserveTimeType: ReservationTimeFrame = ReservationTimeFrame.Upcoming;
  reservations: ReservationGuestDto[] = [];
    confrontationTypesEnum = ConfrontationTypes;
    isVisibleCongratulationReservation: boolean = false;
  
  ngOnInit(): void {
    const isSucces = this.route.snapshot.params['isSuccess'];
    if(isSucces == "true"){
      this.isVisibleCongratulationReservation = true
    }

   this.getReservationList(this.page,this.reserveTimeType);
  }
    getReservationList(e,reserveTimeType){
    this.page = e;
    this.reservationService.getReservationListByFilter({
      maxResultCount: this.itemsPerPage,
      skipCount: (this.page - 1) * this.itemsPerPage,
      reservationTimeFrame: reserveTimeType,
   }).subscribe({
    next:next=>{
      this.reservations = next.items;
      this.totalCount = next.totalCount;
    }
   })
  }
  
}
