import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CombinedServiceDto, CombinedServicesFilter, CombinedServicesService } from '@proxy/combined-services';
import { DistrictDto, DistrictService } from '@proxy/districts';
import { ExperienceTypeDto, ExperienceTypeLookupDto } from '@proxy/experience-types';
import { ExperienceGuestService } from '@proxy/experiences';
import { VacationHomeGuestService } from '@proxy/vacation-homes';

@Component({
  selector: 'app-explore-vacation-home',
  templateUrl: './explore-vacation-home.component.html',
  styleUrl: './explore-vacation-home.component.scss',
})
export class ExploreVacationHomeComponent implements OnInit {
  
  lang = this.sessionState.getLanguage();
  vacationHomeTypes:any ;
  experienceTypes:ExperienceTypeLookupDto[]=[]
  dateFrom: Date = null;
  dateTo: Date = null;
  selectedVacationHomeCity?: number = null;
  selectedVacationHomeDistrict?: number = null;
  vacatioHomeDate?: Date[] = null;
  cityId?:number = null;
  cities = [];
  items: CombinedServiceDto[] = [];
  totalCount = 0;
  page = 1;
  itemsPerPage = 12;
  districts: DistrictDto[];
  showCalander:boolean = false
  selectedType?: number |null = null;
  VacationHomeTypeId?: number |null = null;
  Types=[{displayName:'vacationHome',id:1},{displayName:'Experience',id:2}];
  dateModel:Date[]= [];
  tabIndex:number=0;
  constructor(
    private sessionState: SessionStateService,
    private vacationHomeService: VacationHomeGuestService,
    private experienceService:ExperienceGuestService,
    private combinedService:CombinedServicesService,
    private route: ActivatedRoute,
    private districtService: DistrictService,
    private datepipe: DatePipe,
    private router: Router,


  ) {
    

    const vacationHomeTypeId = +this.route.snapshot.params['vacationHomeTypeId'];
    const cityId = +this.route.snapshot.params['cityId'];
    const dateFrom = this.route.snapshot.params['dateFrom'];
    const dateTo = this.route.snapshot.params['dateTo'];
    const type = this.route.snapshot.params['type'];
    const districtId = this.route.snapshot.params['districtId'];
    

    if (vacationHomeTypeId) {
      this.VacationHomeTypeId=vacationHomeTypeId;
    }
    if (cityId) {
      this.selectedVacationHomeCity = cityId
      this.getDistricts()
    }
    if(districtId) {
      this.selectedVacationHomeDistrict = +districtId;
    }

    if (dateFrom){ 
      
      this.dateFrom = new Date(dateFrom);
      
      this.showCalander=true;
      this.dateModel.push(this.dateFrom)}
      
    if (dateTo) {
      this.dateTo = new Date(dateTo);
      this.showCalander=true;
      this.dateModel.push(this.dateTo)
    }
    if ( type) this.selectedType = +type
  }
  
 
  ngOnInit(): void {

    
    this.vacationHomeService.getCityLookup({ maxResultCount: 1000 }).subscribe({
      next: data => {
        this.cities = data;
      },
    });
    this.getTypes()
    this.filterEvent(this.page);
  }
  getTypes(){
    if(this.selectedType == 1){
      this.vacationHomeService.getUsedTypes().subscribe({
        next:next=>{
          this.vacationHomeTypes = next
          if(this.VacationHomeTypeId){
            this.vacationHomeTypes.forEach(element => {
              if(element.id == this.VacationHomeTypeId){
                this.tabIndex = this.vacationHomeTypes.indexOf(element) + 1
              }
            });
          }
          this.experienceTypes = []
        }
      })
    }else if (this.selectedType == 2 ){
      this.experienceService.getUsedTypes().subscribe({
        next:next=>{
          this.experienceTypes = next
          if(this.VacationHomeTypeId){
            this.experienceTypes.forEach(element => {
              if(element.id == this.VacationHomeTypeId){
                this.tabIndex = this.experienceTypes.indexOf(element) + 1
              }
            });
          }
          this.vacationHomeTypes = null; 
        }
      })
    }
  }
  getDistricts() {
    this.districtService
      .getList({ cityId: this.selectedVacationHomeCity, maxResultCount: 1000 })
      .subscribe({
        next: data => {
          this.districts = data.items;
        },
      });
  }
  changeVacationHomeDate(event) {
    if(event.length){
      this.vacatioHomeDate = event;
    }else{
      this.vacatioHomeDate = null
      this.dateFrom =null;
      this.dateTo =null;
    }
  }
  searchVacationHome() {
    const params = {};
    this.VacationHomeTypeId = +this.route.snapshot.params['vacationHomeTypeId'] ? +this.route.snapshot.params['vacationHomeTypeId'] :null
    if (this.vacatioHomeDate) {
      params['dateFrom'] = this.datepipe.transform(this.vacatioHomeDate[0], 'yyyy-MM-dd');
      params['dateTo'] = this.datepipe.transform(this.vacatioHomeDate[1], 'yyyy-MM-dd');
      
      this.dateFrom = params['dateFrom']
      this.dateTo = params['dateTo']
    }
    if (this.selectedType ) params['type'] = this.selectedType
    if (this.selectedVacationHomeCity) params['cityId'] = this.selectedVacationHomeCity;
    if (this.selectedVacationHomeDistrict) params['districtId'] = this.selectedVacationHomeDistrict;
    // if (this.VacationHomeTypeId) params['vacationHomeTypeId'] = this.VacationHomeTypeId;
    this.getTypes()
    this.filterEvent(this.page)
    // this.router.navigate(['/explore', params]).then(() => { 

    //   window.location.reload();
    // });
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/explore', params]);
    });
  }

  filterEvent(pageIndex: number) {
    this.page = pageIndex
    let data :CombinedServicesFilter= {
      type:this.selectedType  ? +this.selectedType-1 : null,
      maxResultCount: this.itemsPerPage,
      skipCount: (this.page - 1) * this.itemsPerPage,
      cityId: this.selectedVacationHomeCity,
      districtId: this.selectedVacationHomeDistrict,
      typeId: this.VacationHomeTypeId,
      dateFrom: this.datepipe.transform(this.dateFrom, 'yyyy-MM-dd'),
      dateTo: this.datepipe.transform(this.dateTo, 'yyyy-MM-dd'),
    }
    
    this.combinedService
      .getByFilter(data)
      .subscribe({
        next: data => {
          this.items = data.items;
          this.totalCount = data.totalCount;
        },
      });
  }
  resetFilter(){
    this.selectedVacationHomeCity = null;
    this.selectedVacationHomeDistrict = null;
    this.vacatioHomeDate = null;
    this.dateFrom = null;
    this.dateTo = null;
    this.dateModel = [];
    this.selectedType = null;
    this.VacationHomeTypeId = null;
    this.page = 1;
    this.vacationHomeTypes=[]         
    this.experienceTypes=[]           
    this.filterEvent(this.page);
    this.router.navigate(['/explore']);
  }
  isdisabledDate(current){
    return this.convertDateTimeToDate(current) < this.today;
  } 
  today = this.convertDateTimeToDate(new Date());
  convertDateTimeToDate(dateTime: Date): Date {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
  }
 
  getVacationHomeByType(e: any,index) {
    this.VacationHomeTypeId = e;
    this.tabIndex = index;
    this.filterEvent(this.page)

  }
  disabledDate = (current: Date): boolean => {
    const todayDate = new Date(this.normalizeDateToUTC(new Date())); // Normalize today's date
  
    // Get the first day of the month, 6 months before today
    const sixMonthsBefore = new Date(todayDate.getFullYear(), todayDate.getMonth() - 5, 1);
  
    // Get the last day of the month, 6 months after today
    const sixMonthsAfter = new Date(todayDate.getFullYear(), todayDate.getMonth() + 6 + 1, 0);
  
    const currentDate = new Date(this.normalizeDateToUTC(current)); // Normalize selected date
  
    return currentDate < sixMonthsBefore || currentDate > sixMonthsAfter || this.isdisabledDate(current);
  };
   // Normalize a date to midnight UTC and convert to 'YYYY-MM-DD'
   normalizeDateToUTC(date: Date): string {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0];
  }
}
