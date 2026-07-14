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
import { AmenitiesService, AmenitiesType } from '@proxy/amenitiess';
import { CancellationAndReturnPolicyService } from '@proxy/cancellation-and-return-policies';
import { VacationHomeHostService, VacationHomeStatus } from '@proxy/vacation-homes';
import { InfoItemComponent } from './info-item/info-item.component';
import { AmenityCardComponent } from './amenity-card/amenity-card.component';
import { SharedModule } from 'src/shared/shared.module';
import { MeanDto, MeanService, MeanType } from '@proxy/means';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { UserAgreementComponent } from '../user-agreement/user-agreement.component';
import { Router } from '@angular/router';
import { TosterService } from 'src/shared/services/toster.service';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { NzModalService } from 'ng-zorro-antd/modal';
import { PrivacyPolicyComponent } from 'src/app/feature/privacy-policy/privacy-policy.component';
import { TermsHyakComponent } from './terms-hyak/terms-hyak.component';

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
  AmenitiesTypeEnum = AmenitiesType;
  isSame = false;
  constructor(
    private holidayHomeService: VacationHomeHostService,
    private amenitiesService: AmenitiesService,
    private cancellationAndReturnPolicyService: CancellationAndReturnPolicyService,
    private localizationService: LocalizationService,
    private meansService: MeanService,
    private router: Router,
    private toaster: TosterService,
    private modalService: NzModalService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.language = this.localizationService.currentLang;
    this.getInfo();
    this.getTermsData();
  }
isAccountVerification:boolean = localStorage.getItem('isAccountVerification') === 'true'?true:false;
  getInfo() {
    this.holidayHomeService.getWithNavigationProperties(this.id).subscribe({
      next: data => {
        // get the information about the vacation home from API
        this.vacationHome = data;
        
        this.isAcceptTerms = this.vacationHome.vacationHome.signingAgreement;
        // if (!this.vacationHome.isVerifiedMinistryTourism) {
        //   this.Description = this.localizationService.instant(
        //     '::Host:VacationHome:Popup:Publish:confirmAccountDescriptionTourism',
        //   );
        // }
        // if (!this.vacationHome.isYakeenVerified) {
        //   this.Description = this.localizationService.instant(
        //     '::Host:VacationHome:Popup:Publish:confirmAccountDescriptionYakan',
        //   );
        // }
        this.mapCenter = this.mapMarkerPosition = {
          lat: this.vacationHome.vacationHome.lat,
          lng: this.vacationHome.vacationHome.lng,
        };

        this.vacationHome.vacationHome.minimumHomeReservationAmount =
          this.getFormattedDaysAmountText(
            this.vacationHome?.vacationHome?.minimumHomeReservationAmount,
          );
        this.vacationHome.vacationHome.maximumHomeReservationAmount =
          this.getFormattedDaysAmountText(
            this.vacationHome?.vacationHome?.maximumHomeReservationAmount,
          );

        this.vacationHome.vacationHome.accessTime = this.getFormattedTime(
          this.vacationHome?.vacationHome?.accessTime,
        );
        this.vacationHome.vacationHome.leaveTime = this.getFormattedTime(
          this.vacationHome?.vacationHome?.leaveTime,
        );

        this.amenitiesService.getList({ maxResultCount: 1000 }).subscribe({
          next: data => {
            this.amenitiesLookup = data.items;

            const mappedAmenities = this.vacationHome?.vacationHome?.vacationHomeAmenities.map(
              amenityObj => {
                const matchedLookup = this.amenitiesLookup.find(
                  item => item.id === amenityObj.amenitiesId,
                );

                return {
                  amenityID: amenityObj.amenitiesId,
                  isMainFacility: matchedLookup.isMainFacility,
                  amenitiesType: amenityObj.amenitiesType,
                  guestCountPerAmenity: amenityObj.guestCountPerAmenity,
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
            this.meansService
              .getList({ maxResultCount: 1000, type: MeanType.VacationHome })
              .subscribe({
                next: data => {
                  this.meansLookup = data.items;
                  this.comfortMeans = this.vacationHome.vacationHome.vacationHomeMeans.map(mean => {
                    const foundMean = this.meansLookup.find(item => item.id === mean.meanId);
                    return foundMean ? { name: foundMean.name } : null;
                  });
                },
                error: err => {
                  throw new Error('Error occurred'); // todo change the message or handle differently
                },
              });
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

        // Booking type
        this.bookingTypeText = this.getLocalizedBookingTypeName();

        // Booking category
        this.bookingCategoryAbpLocalizationText = this.getAbpLocalizedBestForTextName();
        if (this.vacationHome.vacationHome.vacationHomeStatus === VacationHomeStatus.WaitingModificationToCompleted
          || this.vacationHome.vacationHome.vacationHomeStatus === VacationHomeStatus.UnComplete) {
          this.isSame = true;
        }
      },
    });
  }
  termsData: any;
  getTermsData() {
    this.holidayHomeService.agreementInformationById(this.id).subscribe({
      next: next => {
        this.termsData = next;
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
      { id: 1, name: 'Instant Booking', nameAr: 'حجز فوري', nameZh: '即时预订' },
      { id: 2, name: 'Approval', nameAr: 'حجز يتطلب موافقة', nameZh: '预订需要批准' },
    ];

    const selectedType = bookingTypes.find(
      b => b.id === this.vacationHome.vacationHome.vacationHomeReservationWay,
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
    this.holidayHomeService.agreeById(this.id).subscribe({
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
      nzData: { terms: this.termsData, isVaction: true, id: this.id },
    });
  }

  goBack() {
    this.emitNext.emit('8');
  }
  goToSearch() {
    this.isVisibleSaveAndExit = false;
    this.router.navigate(['/holiday-homes']);
  }
  goToConfirmAccount() {
    this.isVisiblePublishExit = false;
    this.router.navigate(['/account-verification']);
  }
  isTermsVisible: boolean = false;
  publishData() {
    if (this.isAcceptTerms ) {
      if ( !this.isAccountVerification) {
        this.isVisiblePublishExit = true;
      } else {
        this.publish();
      }
    } else {
      this.isTermsVisible = true;
    }
  }
  async publish() {
    this.holidayHomeService.publishVacationHomeById(this.id).subscribe(x => {
      this.isVisibleSuccess = true;
    });
  }
  cancelPopup() {
    this.router.navigate(['/holiday-homes']);
  }
}
