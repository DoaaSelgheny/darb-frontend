import { LocalizationService } from '@abp/ng.core';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-explore-section',
  templateUrl: './explore-section.component.html',
  styleUrl: './explore-section.component.scss',
})
export class ExploreSectionComponent implements OnInit {
  @Input() mergedArray: any[] = [];
  @Input() filter: any = null;
  lang = this.localizationService.currentLang;

  constructor(
    private localizationService: LocalizationService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  get vacationHomes(): any[] {
    return (this.mergedArray || []).filter(item => !item.isExperience);
  }

  goToDetails(item: any): void {
    this.router.navigate(['/vacation-home-details', item.vacationHome.id]);
  }

  getTopAmenities(item: any): any[] {
    return (item?.vacationHome?.vacationHomeAmenities || []).slice(0, 3);
  }
}
