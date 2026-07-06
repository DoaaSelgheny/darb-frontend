import { LocalizationService } from '@abp/ng.core';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CityDto } from '@proxy/cities';
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
    private localizationService: LocalizationService,
  ) {}

  @Output() filterChange = new EventEmitter<any>();

  cities: CityDto[];
  vacationHomeTypes: LookupDto<number>[];
  experienceTypes: ExperienceTypeDto[];
  showCalendar = false;
  lang = this.localizationService.currentLang;

  searchType: number = 1; // 1 = vacation home, 2 = experience
  selectedType?: number = null;
  selectedCity?: number = null;
  selectedDate?: Date[] = null;

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

  changeSearchType(type: number) {
    this.searchType = type;
    this.selectedType = null;
    this.selectedDate = null;
    this.showCalendar = false;
  }

  changeDate(event) {
    this.selectedDate = event;
  }

  search() {
    const params = { type: this.searchType };
    if (this.selectedDate) {
      params['dateFrom'] = this.datepipe.transform(this.selectedDate[0], 'yyyy-MM-dd');
      params['dateTo'] = this.datepipe.transform(this.selectedDate[1], 'yyyy-MM-dd');
    }
    if (this.selectedCity) params['cityId'] = this.selectedCity;
    if (this.selectedType) params['vacationHomeTypeId'] = this.selectedType;
    this.router.navigate(['explore', params]);
  }

  today = this.convertDateTimeToDate(new Date());
  convertDateTimeToDate(dateTime: Date): Date {
    return new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
  }
  isDisabledDate(current) {
    return this.convertDateTimeToDate(current) < this.today;
  }
  disabledDate = (current: Date): boolean => {
    const todayDate = new Date(this.normalizeDateToUTC(new Date())); // Normalize today's date

    // Get the first day of the month, 6 months before today
    const sixMonthsBefore = new Date(todayDate.getFullYear(), todayDate.getMonth() - 5, 1);

    // Get the last day of the month, 6 months after today
    const sixMonthsAfter = new Date(todayDate.getFullYear(), todayDate.getMonth() + 6 + 1, 0);

    const currentDate = new Date(this.normalizeDateToUTC(current)); // Normalize selected date

    return currentDate < sixMonthsBefore || currentDate > sixMonthsAfter || this.isDisabledDate(current);
  };
  // Normalize a date to midnight UTC and convert to 'YYYY-MM-DD'
  normalizeDateToUTC(date: Date): string {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utcDate.toISOString().split('T')[0];
  }
}
