
import { LocalizationService } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CityDto } from '@proxy/cities';
import { DistrictDto, DistrictService } from '@proxy/districts';
import { ExperienceTypeDto } from '@proxy/experience-types';
import { ExperienceGuestService } from '@proxy/experiences';
import { LookupDto } from '@proxy/shared';
import { VacationHomeGuestService } from '@proxy/vacation-homes';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  constructor(
    private vacationHomeService: VacationHomeGuestService,
    private experienceService: ExperienceGuestService,
    private router: Router,
    private datepipe: DatePipe,
    private districtService: DistrictService,
    
 private localizationService: LocalizationService,
  ) {}
  @Output() filterChange = new EventEmitter<any>();
  index
  cities: CityDto[];
  districts: DistrictDto[];
  vacationHomeTypes: LookupDto<number>[];
  experienceTypes: ExperienceTypeDto[];
showCalander:boolean = false;
showCalanderExp:boolean = false;
  selectedVacationHomeCity?: number = null;
  selectedVacationHomeDistrict?: number = null;
  selectedDistrict?: number = null;
  selectedVacationHomeType?: number = null;
  vacatioHomeDate?: Date[] = null;
lang = this.localizationService.currentLang;
  selectedExperienceCity?: number = null;
  selectedExperienceDistrict?: number;
  selectedExperienceType?: number = null;
  experienceDate?: Date[] = null;
  tabIndex:number = 0
 
  ngOnInit(): void {
    
    this.vacationHomeService.getCityLookup({ maxResultCount: 1000 }).subscribe({
      next: data => {
        this.cities = data;
      },
    });

    this.vacationHomeService.getVacationHomeTypeLookup({ maxResultCount: 1000 }).subscribe({
      next: (data: any) => {
        this.vacationHomeTypes = data;
      },
    });
    this.experienceService.getExperienceTypeLookup().subscribe({
      next: data => {
        this.experienceTypes = data;
      },
    });
  }
  changeTab(e){
    this.tabIndex = e 

  }
  searchExperience() {
    this.tabIndex = this.tabIndex + 1
    const params = {};
    if (this.experienceDate) {
      params['dateFrom'] = this.datepipe.transform(this.experienceDate[0], 'yyyy-MM-dd');
      params['dateTo'] = this.datepipe.transform(this.experienceDate[1], 'yyyy-MM-dd');
    }
    if (this.tabIndex) params['type'] = this.tabIndex;
    if (this.selectedExperienceCity) params['cityId'] = this.selectedExperienceCity;
    if (this.selectedExperienceDistrict) params['districtId'] = this.selectedExperienceDistrict;
    if (this.selectedExperienceType) params['vacationHomeTypeId'] = this.selectedExperienceType;
    this.router.navigate(['explore', params]);
  }

  searchVacationHome() {
    this.tabIndex = this.tabIndex + 1
    const params = {};
    if (this.vacatioHomeDate) {
      params['dateFrom'] = this.datepipe.transform(this.vacatioHomeDate[0], 'yyyy-MM-dd');
      params['dateTo'] = this.datepipe.transform(this.vacatioHomeDate[1], 'yyyy-MM-dd');
    }
    if (this.tabIndex) params['type'] = this.tabIndex;
    if (this.selectedVacationHomeCity) params['cityId'] = this.selectedVacationHomeCity;
    if (this.selectedVacationHomeDistrict) params['districtId'] = this.selectedVacationHomeDistrict;
    if (this.selectedVacationHomeType) params['vacationHomeTypeId'] = this.selectedVacationHomeType;
    this.router.navigate(['explore', params]);
  }

  changeExperienceDate(event) {
    this.experienceDate = event;
  }

  changeVacationHomeDate(event) {
    this.vacatioHomeDate = event;
  }

  today = this.convertDateTimeToDate(new Date());
  convertDateTimeToDate(dateTime: Date): Date {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
  }
  isdisabledDate(current){
    return this.convertDateTimeToDate(current) < this.today;
  }  

  getDistricts(cityId:number) {
    this.districtService
      .getList({ cityId: cityId, maxResultCount: 1000 })
      .subscribe({
        next: data => {
          this.districts = data.items;
        },
      });
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
