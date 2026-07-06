import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { CoreModule, LocalizationService } from '@abp/ng.core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileDto, ProfilePictureSourceDto } from '@proxy/volo/abp/account';
import { ExtendedProfileDto, ProfileHostUpdateDto, ProfileService } from './services';
import { ThemeSharedModule, ToasterService } from '@abp/ng.theme.shared';
import { TosterService } from 'src/shared/services/toster.service';
import { OtpComponent } from 'src/app/src/shared/ui-components/otp/otp.component';
import {
  NgxIntlTelInputModule,
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-tel-input-gg';

import {
  ARABIC_ENGLISH_WITH_SPACES,
  ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS,
  ARABIC_WITH_SPACES,
  NUMBERS_ONLY,
} from 'src/shared/directives/validation-regex';
import { markControlsAsDirty } from 'src/shared/utilties/markAsDirty';
import { HyyakOtpType } from './services/hyyak-otp-type.enum';
import { Subject, debounceTime, map, merge } from 'rxjs';
import { Gender } from '@proxy/profiles';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    CoreModule,
    ThemeSharedModule,
    OtpComponent,
    NgxIntlTelInputModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profileUploadURL = ``;
  loading: boolean = false;
  profile: ExtendedProfileDto = null;
  profilePicture: ProfilePictureSourceDto = null;
  isOtpOpen = false;
  isVisibleBackWithoutSave: boolean = false;
  contactInfo = null;
  isVerified: boolean = false;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  onlySaudiCountry = CountryISO.Syria;
  selectedCountryISO: string = CountryISO.Syria;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.Syria, CountryISO.Egypt];
  otpType = HyyakOtpType;
  genderEnum=Gender;
  lang: string;
  form = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
    
      Validators.pattern(ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),
    ]),
    surname: new FormControl(null, [
      Validators.required,
     
      Validators.pattern(ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(150),
    ]),
    phoneNumber: new FormControl('', [Validators.required]),
    breif: new FormControl(null, [Validators.maxLength(255)]),
    idFullName: new FormControl(''),
    phoneNumberConfirmed: new FormControl(false),
    emailConfirmed: new FormControl(false),
    gender: new FormControl(null),
  });
  // Validators.pattern(NUMBERS_ONLY),
  // Validators.maxLength(9),
  saveSubject = new Subject<void>();
  constructor(
    private profileService: ProfileService,
    private toaster: TosterService,
        private localizationService: LocalizationService,
                    private titleService: Title,
                     private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:Profile'));
    this.lang = this.localizationService.currentLang;
    this.getProfileData();
    this.getProfileImage();
    this.saveSubject.pipe(debounceTime(350)).subscribe(() => this.save());

    merge(
      this.form
        .get('phoneNumberConfirmed')
        .valueChanges.pipe(map(confirmed => ({ control: 'phoneNumber', confirmed }))),
      this.form
        .get('emailConfirmed')
        .valueChanges.pipe(map(confirmed => ({ control: 'email', confirmed }))),
    ).subscribe(({ control, confirmed }) => {
      if (confirmed) {
        this.form.get(control).disable();
      } else {
        this.form.get(control).enable();
      }
    });
  }

  onSaveButtonClick(): void {
    this.saveSubject.next();
  }

  getProfileData() {
    this.profileService.getGuestProfile().subscribe(data => {
      this.profile = data;

      this.form.patchValue({
        name: data?.name,
        surname: data?.surname,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        breif: data?.breif,
        idFullName: data?.idFullName,
        phoneNumberConfirmed: data.phoneNumberConfirmed,
        emailConfirmed: data.emailConfirmed,
        gender:data?.gender
      });
      this.selectedCountryISO = data?.countryCode.toLowerCase() as typeof this.selectedCountryISO;
    });
  }

  allowPaste(event: ClipboardEvent): boolean {
    const pastedData = (event.clipboardData || event.target['clipboardData'])?.getData(
      'text/plain',
    );
    if (!pastedData || !/^\d+$/.test(pastedData)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  getProfileImage() {
    this.profileService.getProfilePictureSource().subscribe(data => {
      this.profilePicture = {...data};
this.cdr.detectChanges()
    });
  }

  deleteProfileImage() {
    this.profileService.deleteProfilePicture().subscribe(data => {
      this.profilePicture = {} as ProfilePictureSourceDto;
    });
  }

  async onFileSelected(event) {
    const file: File = event.target.files[0];
    if (await this.checkValidImage(file)) {
      return;
    }
    if (file) {
    const reader = new FileReader();
  reader.onload = () => {
    this.profilePicture = { source: reader.result as string } as any;
    this.cdr.detectChanges();
  };
  reader.readAsDataURL(file);

  // ✅ ارفع الصورة للسيرفر
  const formData = new FormData();
  formData.append('image', file);
      this.profileService.setProfilePicture(formData).subscribe(x => {
        // this.getProfileImage();
      });
    }
  }

  save() {
    if (this.form.valid) {
      const input = {
        name:this.form.getRawValue().name,
        surname:this.form.getRawValue().surname,
        email: this.form.getRawValue().email,
        phoneNumber: this.form.getRawValue().phoneNumber['internationalNumber'],
        countryCode: this.form.getRawValue().phoneNumber['countryCode'],
        breif: this.form.value['breif'],
        gender:this.form.value['gender']
      };
      this.profileService.updateHost(input).subscribe(x => {
        this.toaster.success('تم حفظ البيانات الملف الشخصي بنجاح');
      });
    } else {
      markControlsAsDirty(this.form);
    }
  }
  handleOpenOtp(contactItem, verifiedItem, type: HyyakOtpType) {
    this.isOtpOpen = true;
    this.contactInfo = {
      type: type,
      value: contactItem,
      countryCode: this.form.getRawValue().phoneNumber['countryCode'],
    };
    this.isVerified = verifiedItem;
  }

  async checkValidImage(file: File) {
    const src = window.URL.createObjectURL(file);
    let isInvalidDimensions;

    const addImageProcess = src => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    const image = await addImageProcess(src);
    // isInvalidDimensions = image.width < 250 || image.height < 100;

    // if (isInvalidDimensions) {
    //   this.toaster.warning('يجب ان تكون الصورة ذات ابعاد 100*250');
    //   return true;
    // }
    // const ONE_MEGA_BYTE = 1024 ** 2;
    // const MAX_IMAGE_SIZE = file.size / ONE_MEGA_BYTE;
    // if (MAX_IMAGE_SIZE > 2) {
    //   this.toaster.warning('يجب أن يكون حجم الملف أقل من 2 ميجابايت!');
    //   return true;
    // }
    return false;
  }

  handleVerifiedOtp(value) {
    this.form.patchValue(value);
    this.getProfileData();
  }
}
