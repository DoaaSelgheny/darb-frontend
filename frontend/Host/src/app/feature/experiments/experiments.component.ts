import { Component, OnInit } from '@angular/core';
import {
  ExperienceCountDto,
  ExperienceHostService,
  ExperienceWithNavigationPropertiesDto,
  GetExperiencesInput,
} from '@proxy/experiences';
import { ExperienceTypeDto } from '@proxy/experience-types/models';
import { CityDto } from '@proxy/cities';
import { LookupDto } from '@proxy/shared/models';
import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { finalize } from 'rxjs';
import { VacationHomeStatus } from '@proxy/vacation-homes';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrl: './experiments.component.scss',
})
export class ExperimentsComponent implements OnInit {
  counts: ExperienceCountDto = null;
  filterText: string;
  selectedStatus?: number = null;
  selectedCity?: number = null;
  cities: CityDto[] = [];
  statuses: any;
  loading: boolean = false;
  itemsByType: any[] = [];
  VacationHomeTypeId: number = null;
  vacationHomeTypes: any;
  currentPage = 1;
  itemsPerPage = 8;
  totalCount = 0;
  vacationHomes: ExperienceWithNavigationPropertiesDto[] = [];
  lang = this.sessionState.getLanguage();
  constructor(
    private service: ExperienceHostService,
    private sessionState: SessionStateService,
    private localizationService: LocalizationService,

  ) {}

  ngOnInit() {
    this.getData();
    this.getHolidayHomes(this.currentPage);
  }

  getData() {
    //get count
    this.service.getCount().subscribe((data: ExperienceCountDto) => {
      this.counts = data;
    });
    //get cities
    this.service.getCityLookup().subscribe(data => {
      this.cities = data;
    });
    //get status
    // this.service.getExperienceStatusLookup().subscribe(data => {
    //   this.statuses = data;
    // });
    this.statuses = Object.keys(VacationHomeStatus)
    .filter((key) => !isNaN(Number(VacationHomeStatus[key as keyof typeof VacationHomeStatus])))
    .map((key) => ({ id: Number(VacationHomeStatus[key as keyof typeof VacationHomeStatus]), displayName: this.localizationService.instant("::Host:VacationHome:Status:"+Number(VacationHomeStatus[key as keyof typeof VacationHomeStatus])) }));

    //getHomestabcount
    this.service.getExperienceTypesCount().subscribe(data => {
      this.vacationHomeTypes = data;
    });
    
  }

  getVacationHomeByType(e: any) {
    this.VacationHomeTypeId = e;
    this.getHolidayHomes(this.currentPage);
  }

  getHolidayHomes(pageIndex: number) {
    this.currentPage = pageIndex;
    //get list of vacation homes
    this.loading = true;
    this.service
      .getList({

        experienceTypeId: this.VacationHomeTypeId,
        dateFrom: '',
        dateTo: '',
        experienceStatus:this.selectedStatus,
        cityId: this.selectedCity,
        filterText:this.filterText,
        maxResultCount: this.itemsPerPage,
        skipCount: (this.currentPage - 1) * this.itemsPerPage,
        sorting: 'creationTime DESC',
        // sorting: 'id',
      } as any)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data: any) => {
        this.vacationHomes = data.items;
        this.totalCount = data.totalCount;
      });
  }
  changeFilter() {
    this.getHolidayHomes(this.currentPage);
  }
}
