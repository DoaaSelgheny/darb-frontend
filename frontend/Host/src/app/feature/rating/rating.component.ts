import { LocalizationService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { RatingsHostService } from '@proxy/ratings/ratings-host.service';
import { ServiceType } from '@proxy/ratings/service-type.enum';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent implements OnInit  {
 ratings:any;
 serviceType:any;
  selectedStatus=null;
  hasGuestOpinion=null;
  filterText: string;
  currentPage = 1;
  itemsPerPage = 8;
  totalCount = 0;
  loading: boolean = false;
  pageIndex = 1;
  serviceTypeEnum=ServiceType;
  downloadToken:any;
  constructor(private service: RatingsHostService,
        private localizationService: LocalizationService,
            private titleService: Title,
            private router:Router
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:rating'));
        this.serviceType = Object.keys(ServiceType)
        .filter((key) => !isNaN(Number(ServiceType[key as keyof typeof ServiceType])))
        .map((key) => ({ id: Number(ServiceType[key as keyof typeof ServiceType]), displayName: this.localizationService.instant("::Enum:ServiceType."+Number(ServiceType[key as keyof typeof ServiceType])) }));
    this.getReservation(this.currentPage);

  }
getReservation(pageIndex: number)
{
  let dataSearch = JSON.parse(sessionStorage.getItem('dataSearch'))
    if(dataSearch){
      this.selectedStatus = dataSearch.serviceType
      this.hasGuestOpinion = dataSearch.hasGuestOpinion
      this.filterText = dataSearch.filterText
      pageIndex =dataSearch.currentPage
    }
  this.loading = true;
  this.service.getRatingListByFilter({

    serviceType:this.selectedStatus,
    hasGuestOpinion:this.hasGuestOpinion,
    filterText:this.filterText,
    maxResultCount: this.itemsPerPage,
    skipCount: (pageIndex - 1) * this.itemsPerPage,
    sorting: 'isRead asc',

  } as any).subscribe(data => {
    this.ratings = data.items;
    this.totalCount = data.totalCount;
  });
  sessionStorage.removeItem('dataSearch')
  setTimeout(() => {
    this.currentPage = pageIndex
  }, 2000);
}


  listOfColumn = [

    {
      title: this.localizationService.instant("::nameOfService"),

      priority: 1,
    },
    {
      title: this.localizationService.instant("::serviceTitle"),

      priority: 2,
    },
    {
      title: this.localizationService.instant("::reservationNumber"),

      priority: 3,
    },
    {
      title: this.localizationService.instant("::guestName"),

      priority: 4,
    },
    {
      title: this.localizationService.instant("::reply"),

      priority: 5,
    },
    {
      title: this.localizationService.instant("::BookingRating"),

      priority: 6,
    },
    {
      title: this.localizationService.instant("::details"),

      priority: 7,
    },
  ];
  changeFilter() {
    this.getReservation(this.currentPage);
  }
  goToDetails(id:number){
    let dataSearch ={
      serviceType:this.selectedStatus,
      hasGuestOpinion:this.hasGuestOpinion,
      filterText:this.filterText,
      currentPage: this.currentPage
    }
    this.router.navigate(['/rating-details/',id])
    sessionStorage.setItem('dataSearch',JSON.stringify(dataSearch))
  }
}
