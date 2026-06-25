import { LocalizationService } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { ServiceType, RatingsHostService } from '@proxy/ratings';
import { VacationHomeHostCalendarDto, VacationHomeHostService, VacationHomePublishStatus } from '@proxy/vacation-homes';
import { SharedModule } from 'src/shared/shared.module';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [SharedModule, CommonModule, RouterModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
 calendarList:VacationHomeHostCalendarDto[]=[];
 publishStatus=null;
 publishStatusEnum = VacationHomePublishStatus
  typeId=null
  filterText: string;
  currentPage = 1;
  itemsPerPage = 8;
  totalCount = 0;
  loading: boolean = false;
  pageIndex = 1;
  categories:any
  serviceTypeEnum=ServiceType;
  downloadToken:any;
  lang = this.localizationService.currentLang;
  constructor(
    private service: VacationHomeHostService,
    private localizationService: LocalizationService,
    private titleService: Title,
    private router:Router
  ) {

  }

  ngOnInit(): void {
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:calendar'));
    this.getCalendarList(this.currentPage);
    this.getCategories()

  }
  getCategories(){
    this.service.getVacationHomeTypes({maxResultCount:1000}).subscribe({
      next:next=>{
        this.categories = next
      }
    })
  }
  getCalendarList(pageIndex: number)
{
  let dataSearch = JSON.parse(sessionStorage.getItem('dataSearch'))
    if(dataSearch){
      this.publishStatus = dataSearch.publishStatus
      this.filterText = dataSearch.filterText
      this.typeId =dataSearch.typeId
      pageIndex =dataSearch.currentPage
    }
  this.loading = true;
  this.service.getCalendarListByFilter({

    publishStatus:this.publishStatus,
    filterText:this.filterText,
    typeId:this.typeId,
    maxResultCount: this.itemsPerPage,
    skipCount: (pageIndex - 1) * this.itemsPerPage,
  } as any).subscribe(data => {
    this.calendarList = data.items;
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
      title: this.localizationService.instant("::calendar:serviceStatus"),

      priority: 2,
    },
    {
      title: this.localizationService.instant("::calendar:reservationNo"),

      priority: 3,
    },
    {
      title: this.localizationService.instant("::calendar:category"),

      priority: 4,
    },
    {
      title: this.localizationService.instant("::calendar:calendar"),

      priority: 5,
    }
  ];
  changeFilter() {
    this.getCalendarList(this.currentPage);
  }
  goToDetails(id:number){
    let dataSearch ={
      publishStatus:this.publishStatus,
      filterText:this.filterText,
      typeId:this.typeId,
      currentPage: this.currentPage
    }
    this.router.navigate(['/calendar-details/',id])
    sessionStorage.setItem('dataSearch',JSON.stringify(dataSearch))
  }
}
