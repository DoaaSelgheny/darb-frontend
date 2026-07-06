import { Component, OnInit } from '@angular/core';
import { CityDto } from '@proxy/cities';
import { finalize } from 'rxjs';
import {
  VacationHomeCountDto,
  VacationHomeWithNavigationPropertiesDto,
} from '../../proxy/vacation-homes/models';
import { LookupDto } from '@proxy/shared';
import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { VacationHomeHostService, VacationHomeStatus } from '@proxy/vacation-homes';

@Component({
  selector: 'app-holiday-homes',
  templateUrl: './holiday-homes.component.html',
  styleUrl: './holiday-homes.component.scss',
})
export class HolidayHomesComponent implements OnInit {
  counts: VacationHomeCountDto = null;
  filterText: string;
  selectedStatus?: number = null;
  selectedCity?: number = null;
  cities: CityDto[] = [];
  statuses: any;
  loading: boolean = false;
  itemsByType: any[] = [];
  VacationHomeTypeId: number = null;
  vacationHomeTypes: any;
  VacationHomeStatus = VacationHomeStatus
  currentPage = 1;
  itemsPerPage = 8;
  totalCount = 0;
  vacationHomes: VacationHomeWithNavigationPropertiesDto[] = [];
  lang = this.sessionState.getLanguage();
  constructor(
    private service: VacationHomeHostService,
    private sessionState: SessionStateService,
    private localizationService: LocalizationService,

  ) {}

  ngOnInit() {
    this.getData();
    this.getHolidayHomes(this.currentPage);
  }

  getData() {
    //get count
    this.service.getCount().subscribe((data: VacationHomeCountDto) => {
      this.counts = data;
    });
    //get cities
    this.service.getCityLookup({ maxResultCount: 1000 }).subscribe(data => {
      this.cities = data;
    });
    //get status
    // this.service.getVacationHomeStatusLookup().subscribe(data => {
    //   this.statuses = data;
    // });
    this.statuses = Object.keys(VacationHomeStatus)
      .filter((key) => !isNaN(Number(VacationHomeStatus[key as keyof typeof VacationHomeStatus])))
      .map((key) => ({ id: Number(VacationHomeStatus[key as keyof typeof VacationHomeStatus]), displayName: this.localizationService.instant("::Host:VacationHome:Status:"+Number(VacationHomeStatus[key as keyof typeof VacationHomeStatus])) }));

    //getHomestabcount
    this.service.getVactionHomeTypesCount().subscribe(data => {
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
        filterText: this.filterText || null,
        cityId: this.selectedCity,
        vacationHomeStatus: this.selectedStatus,
        vacationHomeTypeId: this.VacationHomeTypeId,
        maxResultCount: this.itemsPerPage,
        skipCount: (this.currentPage - 1) * this.itemsPerPage,
        sorting: 'creationTime DESC',
        })
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
