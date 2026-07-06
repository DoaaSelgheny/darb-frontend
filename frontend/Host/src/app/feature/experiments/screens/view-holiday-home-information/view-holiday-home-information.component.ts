import { LocalizationService } from '@abp/ng.core';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  EventEmitter,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { AmenitiesService } from '@proxy/amenitiess';
import { CancellationAndReturnPolicyService } from '@proxy/cancellation-and-return-policies';
import { InfoItemComponent } from './info-item/info-item.component';
import { AmenityCardComponent } from './amenity-card/amenity-card.component';
import { SharedModule } from 'src/shared/shared.module';
import { MeanDto, MeanService, MeanType } from '@proxy/means';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { Router } from '@angular/router';
import { TosterService } from 'src/shared/services/toster.service';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TermsHyakComponent } from './terms-hyak/terms-hyak.component';
import {
  AttendanceType,
  ExperienceDatesType,
  ExperienceHostService,
  ExperienceStatus,
  LanguageType,
  ReceptionTimeType,
  VisibleStatus,
} from '@proxy/experiences';

@Component({
  selector: 'app-view-holiday-home-information',
  standalone: true,
  imports: [InfoItemComponent, AmenityCardComponent, SharedModule, GoogleMap, GoogleMapsModule],
  templateUrl: './view-holiday-home-information.component.html',
  styleUrl: './view-holiday-home-information.component.scss',
})
export class ViewHolidayHomeInformationComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @Input({ required: true }) id: number;
  @Output() emitNext = new EventEmitter<string>();
  isVisiblePublishExit: boolean = false;
  Description: string;
  @Input() buttons = true;
  isVisibleSaveAndExit: boolean = false;
  vacationHome: any; // todo make the type VacationHomeWithNavigationPropertiesDto
  amenitiesLookup: any[];
  primaryAmenities: any[];
  comfortMeans: any[];
  cancellationAndReturnPolicyText: any;
  bookingTypeText: string;
  bookingCategoryAbpLocalizationText: string;
  language: string;
  meansLookup: MeanDto[];
  mapCenter: google.maps.LatLngLiteral;
  mapZoom: number = 12;
  mapMarkerPosition: google.maps.LatLngLiteral;
  isVisibleSuccess: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
  AmenitiesType = '';
  isAcceptTerms: boolean = false;
  languageTypeEnum = LanguageType;
  attendanceTypeEnum = AttendanceType;
  experienceDatesTypeEnum = ExperienceDatesType;
  receptionTimeTypeEnum = ReceptionTimeType;
  isSame = false;
  constructor(
    private service: ExperienceHostService,
    private amenitiesService: AmenitiesService,
    private cancellationAndReturnPolicyService: CancellationAndReturnPolicyService,
    private localizationService: LocalizationService,
    private meansService: MeanService,
    private router: Router,
    private toaster: TosterService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.language = this.localizationService.currentLang;
    this.getInfo();
    this.getTermsData();
  }
  termsData: any;
  getTermsData() {
    this.service.agreementInformationById(this.id).subscribe({
      next: next => {
        this.termsData = next;
      },
    });
  }
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':'); // Split the string
    return `${hours}:${minutes}`; // Return only hours and minutes
  }
  getInfo() {
    this.service.getWithNavigationProperties(this.id).subscribe({
      next: data => {
        // get the information about the vacation home from API
        if (
          data.experience.experienceStatus === ExperienceStatus.WaitingModificationToCompleted ||
          data.experience.experienceStatus === ExperienceStatus.UnComplete
        ) {
          this.isSame = true;
        }
        this.vacationHome = data;
    
     
        this.isAcceptTerms = this.vacationHome?.experience?.signingAgreement;

        this.meansService.getList({ maxResultCount: 1000, type: MeanType.Experience }).subscribe({
          next: data => {
            this.meansLookup = data.items;
            this.comfortMeans = this.vacationHome.experience.meanIds.map(mean => {
              const foundMean = this.meansLookup.find(item => item.id === mean);

              return foundMean ? { name: foundMean.name } : [];
            });
          },
          error: err => {
            throw new Error('Error occurred'); // todo change the message or handle differently
          },
        });
        // Booking type
        this.bookingTypeText = this.getLocalizedBookingTypeName();

        if (!this.vacationHome.isVerifiedMinistryTourism) {
          this.Description = this.localizationService.instant(
            '::Host:VacationHome:Popup:Publish:confirmAccountDescriptionTourism',
          );
        }
        if (!this.vacationHome.isYakeenVerified) {
          this.Description = this.localizationService.instant(
            '::Host:VacationHome:Popup:Publish:confirmAccountDescriptionYakan',
          );
        }
        this.mapCenter = this.mapMarkerPosition = {
          lat: this.vacationHome.experience.lat,
          lng: this.vacationHome.experience.lng,
        };

        this.vacationHome.experience.minimumHomeReservationAmount = this.getFormattedDaysAmountText(
          this.vacationHome?.experience?.minimumHomeReservationAmount,
        );
        this.vacationHome.experience.maximumHomeReservationAmount = this.getFormattedDaysAmountText(
          this.vacationHome?.experience?.maximumHomeReservationAmount,
        );

        this.vacationHome.experience.accessTime = this.getFormattedTime(
          this.vacationHome?.experience?.accessTime,
        );
        this.vacationHome.experience.leaveTime = this.getFormattedTime(
          this.vacationHome?.experience?.leaveTime,
        );

        this.amenitiesService.getList({ maxResultCount: 1000 }).subscribe({
          next: data => {
            this.amenitiesLookup = data.items;

            const mappedAmenities = this.vacationHome?.experience?.vacationHomeAmenities.map(
              amenityObj => {
                const matchedLookup = this.amenitiesLookup.find(
                  item => item.id === amenityObj.amenitiesId,
                );

                return {
                  amenityID: amenityObj.amenitiesId,
                  isMainFacility: matchedLookup.isMainFacility,
                  name:
                    this.language == 'ar'
                      ? amenityObj.amenities.nameAr
                      : amenityObj.amenities.nameEn,
                  symbol: matchedLookup.symbol,
                  numberOfGuests: null,
                  numberOfUnits: amenityObj.count,
                  subFacility: amenityObj.vacationHomeSubAmenities,
                };
              },
            );

            this.primaryAmenities = mappedAmenities.filter(item => item.isMainFacility);
          },
          error: err => {
            throw new Error('Error occurred'); // todo change the message or handle differently
          },
        });

        // Cancelation policy
        this.cancellationAndReturnPolicyService.getAllList().subscribe({
          next: data => {
            this.cancellationAndReturnPolicyText = data.filter(
              x => x.id == this.vacationHome.vacationHome.cancellationAndReturnPolicyId,
            )[0];
          },
          error: err => {
            throw new Error('Error occurred'); // todo change the message or handle differently
          },
        });

        // Booking category
        this.bookingCategoryAbpLocalizationText = this.getAbpLocalizedBestForTextName();
    
      },
    });
  }

  getAbpLocalizedBestForTextName(): string {
    const bestForTypes: any[] = [
      { id: 0, name: 'SinglesAndMarried' },
      { id: 1, name: 'Married' },
      { id: 2, name: 'Singles' },
    ];

    const selectedType = bestForTypes.find(
      b => b.id == this.vacationHome.vacationHome.vacationHomeCategoryType,
    );

    return selectedType ? selectedType.name : '';
  }

  getLocalizedBookingTypeName(): string {
    const bookingTypes = [
      { id: 0, name: 'Instant Booking', nameAr: 'حجز فوري', nameZh: '即时预订' },
      { id: 1, name: 'Approval', nameAr: 'حجز يتطلب موافقة', nameZh: '预订需要批准' },
    ];

    const selectedType = bookingTypes.find(
      b => b.id === this.vacationHome?.experience?.experienceReservationWay,
    );
    if (!selectedType) {
      return '';
    }

    switch (this.language) {
      case 'ar':
        return selectedType.nameAr;
      case 'zh':
        return selectedType.nameZh;
      default:
        return selectedType.name;
    }
  }

  getFormattedTime(time: string): string {
    const timeParts = time.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];

    const am = this.language == 'ar' ? 'ص' : 'AM';
    const pm = this.language == 'ar' ? 'م' : 'PM';
    const ampm = hours >= 12 ? pm : am;
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  getFormattedDaysAmountText(amount: string | number): string {
    const parsedAmount = Number(amount);

    if (isNaN(parsedAmount)) {
      return '';
    }

    // Arabic formatting
    if (this.language === 'ar') {
      if (parsedAmount > 10) {
        return parsedAmount + ' ليلة';
      } else if (parsedAmount > 2) {
        return parsedAmount + ' ليالي';
      } else if (parsedAmount === 2) {
        return 'ليلتان';
      } else if (parsedAmount === 1) {
        return 'ليلة واحدة';
      }
    } else {
      return `${parsedAmount} ${parsedAmount > 1 ? 'nights' : 'night'}`;
    }
  }
  updateAllChecked(e: any) {
    this.isAcceptTerms = e;
    this.service.agreeById(this.id).subscribe({
      next: next => {
        this.getTermsData();
      },
    });
    this.cdr.detectChanges();
  }
  openTerms() {
    this.modalService.create({
      nzTitle: this.localizationService.instant('::homeHoliday:search:terms'),
      nzContent: TermsHyakComponent,
      nzData: { terms: this.termsData, isExperience: true, id: this.id },
    });
  }

  goBack() {
    this.emitNext.emit('5');
  }
  goToSearch() {
    this.isVisibleSaveAndExit = false;
    this.router.navigate(['/experiments']);
  }
  goToConfirmAccount() {
    this.isVisiblePublishExit = false;
    this.router.navigate(['/account-verification']);
  }
  isTermsVisible: boolean = false;
  publishData() {
    if (this.isAcceptTerms || this.vacationHome.experience.signingAgreement) {
      if (!this.vacationHome.isYakeenVerified) {
        this.isVisiblePublishExit = true;
      } else {
        this.publish();
      }
    } else {
      this.isTermsVisible = true;
    }
  }
  async publish() {
    this.service.publishExperienceById(this.id).subscribe(x => {
      this.isVisibleSuccess = true;

      // this.router.navigate(['/experiments']);
    });
  }
  cancelPopup() {
    this.router.navigate(['/experiments']);
  }
}
