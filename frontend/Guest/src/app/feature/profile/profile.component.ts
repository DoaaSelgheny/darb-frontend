import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { UiComponentsModule } from "src/shared/ui-components/ui-components.module";
import { RouterModule } from "@angular/router";
import { CoreModule } from "@abp/ng.core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/shared/shared.module";
import { environment } from "src/environments/environment";
import { ProfilePictureSourceDto } from "@proxy/volo/abp/account";
import { LocalizationService } from "@abp/ng.core";
import { markAllAsDirty } from "src/shared/helpers/markAllAsDirty";
import { differenceInCalendarDays } from "date-fns";
import {
  ProfileGuestUpdateDto,
  ProfileService,
  UserInterestExperienceDto,
  UserInterestVacationHomeDto,
  genderOptions,
} from "./profiles";
import { OtpComponent } from "src/shared/ui-components/otp/otp.component";
import {
  YakeenVerificationType,
  yakeenVerificationTypeOptions,
} from "./profiles/yakeen-verification-type.enum";
import { Subject, Subscription, debounceTime, forkJoin, map, merge } from "rxjs";
import {
  NgxIntlTelInputModule,
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from "ngx-intl-tel-input-gg";
import { ToasterService } from "src/shared/services/toaster.service";
import {
  EIGHTEEN_YEARS_AGO,
  disabledDate,
} from "src/shared/helpers/datePickerValidation";
import { AccountVerificationService } from "./account-verifications";
import { ConfrontationTypes } from "src/shared/ui-components/confrontation-popup/confrontation-types.enum";
import { HyyakOtpType } from "src/shared/layout/header/configuration/hyyak-otp-type.enum";
import { Title } from "@angular/platform-browser";
import { SpecificVerificationTypeComponent } from "./specific-verification-type/specific-verification-type.component";
@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    RouterModule,
    UiComponentsModule,
    CoreModule,
    SharedModule,
    OtpComponent,
    NgxIntlTelInputModule,
    SpecificVerificationTypeComponent
  ],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.scss",
})
export class ProfileComponent implements OnInit {
  uploadImageUrl = `${environment.apis.default.url}/api/app/account-verifications/upload`;
  profilePicture: ProfilePictureSourceDto = null;
  form: FormGroup = new FormGroup({});

  loding: boolean = false;
  isOtpOpen: boolean = false;
  verifyLoading: boolean = false;
  saveLoading: boolean = false;
  isVisibleSuccessCheck: boolean = false;
  isReadOnlyControl: boolean = false;
  isVisibleBackWithoutSave: boolean = false;

  radioValue: number = 1;
  identityLabel: string = "::National Identity";

  startDate = new Date().setFullYear(new Date().getFullYear() - 4);
  yakeenVerificationType = YakeenVerificationType;
  genderOptionsEnum = genderOptions;
  yakeenVerificationTypeOptionsEnum = yakeenVerificationTypeOptions;
  confrontationTypesEnum = ConfrontationTypes;
  otpType = HyyakOtpType;

  lang: string;
  userInterestVacationHome: UserInterestVacationHomeDto[] = [];
  userInterestExperience: UserInterestExperienceDto[] = [];
  userInterest: any[];
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  onlySaudiCountry = CountryISO.Syria;
  SearchCountryField = SearchCountryField;
  preferredCountries = [CountryISO.Syria, CountryISO.Egypt];
  selectedCountryISO = CountryISO.Syria;
  eighteenYearsAgo = EIGHTEEN_YEARS_AGO;
  subscriptions: Subscription = new Subscription();
  
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.startDate) > 0;
  contactInfo = null;
  isVerified: boolean = false;
  saveSubject = new Subject<void>();
  profile:any;
 ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS = /^[\u0600-\u06FFa-zA-Z\s]+$/;
  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private accountVerificationService: AccountVerificationService,
    private localizationService: LocalizationService,
     private titleService: Title,
      private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.localizationService.instant('::Host:Title:Profile'));
    this.lang = this.localizationService.currentLang;
    this.handleForm();
    this.getProfileImage();
    this.getProfileData();
    this.getUserInterest();
 
    this.saveSubject.pipe(debounceTime(350)).subscribe(() => this.save());
  }

  validateNationalId() {
    const nationalIDControl = this.form.get("nationalID");
  
    // Check if control exists
    if (!nationalIDControl) {
      return;
    }
  
    // Get the value of the control
    const saudiIDValue = nationalIDControl.value;
  
    // // Reset errors
    // nationalIDControl.setErrors(null);
    if ( saudiIDValue.length ==0) { 
      nationalIDControl.setErrors({ required: true });
      return;
    } 
    if(this.radioValue == YakeenVerificationType.SaudiId || this.radioValue == YakeenVerificationType.Iqama){
      
    if (saudiIDValue && saudiIDValue.length < 10) {
      nationalIDControl.setErrors({ minlength: true });
      return;
    } else if (saudiIDValue && saudiIDValue.length > 10) {
      nationalIDControl.setErrors({ maxlength: true });
      return;
    }  
      // Validate pattern
      if(this.radioValue == YakeenVerificationType.SaudiId){
        const pattern = /^[1١][0-9٠-٩]{9}$/; // Adjusted pattern to ensure 10 digits
        if (!pattern.test(saudiIDValue)) {
          nationalIDControl.setErrors({ mustStartWithOne: true });
          return;
        }
      }
      if(this.radioValue == YakeenVerificationType.Iqama){
        const pattern = /^[2٢][0-9٠-٩]{9}$/; // Adjusted pattern to ensure 10 digits
        if (!pattern.test(saudiIDValue)) {
          nationalIDControl.setErrors({ mustStartWithTwo: true });
          return;
        }
      } 
    }
  
    // Mark the control as touched so the error will be displayed
    nationalIDControl.markAsTouched();
  
    // Update validity
    nationalIDControl.updateValueAndValidity();
  }
  onSaveButtonClick(): void {
    this.saveSubject.next();
  }

  setBirthDateControlValue() {
    const dateOfBirthControl = this.form.controls.dateOfBirth;
    const dateOfBirthValue = new Date(dateOfBirthControl.value); // Convert to Date object if it's a string
    const formattedDateString = dateOfBirthValue.toISOString();
    dateOfBirthControl.setValue(formattedDateString);
  }
  handleForm() {
    this.form = this.fb.group({
      // TODO add custom validation for each option
      nationalID: this.fb.control(""),
      dateOfBirth:this.fb.control(""),
      nationality:this.fb.control(""),
      image: this.fb.control(""),
      hyyakId: this.fb.control(""),
      name: this.fb.control("", [Validators.required,
         Validators.pattern(this.ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),]),
      surname: this.fb.control("", [Validators.required,
        Validators.pattern(this.ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),
      ]),
      idFullName: this.fb.control(""),
      phoneNumber: this.fb.control("", [Validators.required]),
      countryCode: this.fb.control(""),
      email: this.fb.control("", [Validators.required, Validators.email]),
      gender: this.fb.control(null, [Validators.required]),
      phoneNumberConfirmed: this.fb.control(false),
      emailConfirmed: this.fb.control(false),
      userInterestVacationHome: this.fb.control([]),
      userInterestExperience: this.fb.control([]),
      yakeenVerificationType: this.fb.control(YakeenVerificationType.SaudiId),
      isVerifiedBy3rdParty: this.fb.control(false),
    });

    merge(
      this.form
        .get("phoneNumberConfirmed")
        .valueChanges.pipe(
          map((confirmed) => ({ control: "phoneNumber", confirmed }))
        ),
      this.form
        .get("emailConfirmed")
        .valueChanges.pipe(
          map((confirmed) => ({ control: "email", confirmed }))
        )
    ).subscribe(({ control, confirmed }) => {
      if (confirmed) {
        this.form.get(control).disable();
      } else {
        this.form.get(control).enable();
      }
    });
  }
  allowPaste(event: ClipboardEvent): boolean {
    const pastedData = (
      event.clipboardData || event.target["clipboardData"]
    )?.getData("text/plain");
    if (!pastedData || !/^\d+$/.test(pastedData)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  handleChangeIdentityType(value: YakeenVerificationType) {
    this.form.controls["nationalID"].setValidators(null);

    switch (value) {
      case YakeenVerificationType.SaudiId: {
        this.form.controls["nationalID"].addValidators(Validators.required);
        this.identityLabel = "::National Identity";
        this.form.controls["nationalID"].reset();
        break;
      }
      case YakeenVerificationType.Iqama: {
        this.form.controls["nationalID"].addValidators(Validators.required);
        this.identityLabel = "::Residence";
        this.form.controls["nationalID"].reset();
        break;
      }
      case YakeenVerificationType.Passport: {
        this.form.controls["nationalID"].addValidators(Validators.required);
        this.form.controls["nationality"].addValidators(Validators.required);
        this.identityLabel = "::Passport";
        this.form.controls["nationalID"].reset();
        break;
      }
    }
    this.form.controls["nationalID"].addValidators(Validators.required);
    this.form.updateValueAndValidity();
  }

  save() {
    if (this.form.valid) {
      this.saveLoading = true;
      // don't send 1970 date in case of null input
      const DATE_OF_BIRTH = this.form.controls["dateOfBirth"].value
        ? new Date(this.form.controls["dateOfBirth"].value).toISOString()
        : null;
      const input: ProfileGuestUpdateDto = {
        nationalID: this.form.value["nationalID"],
        name: this.form.value["name"],
        surname: this.form.value["surname"],
        dateOfBirth: DATE_OF_BIRTH,
        gender: this.form.value["gender"],
        email: this.form.getRawValue().email,
        phoneNumber: this.form.getRawValue().phoneNumber?.internationalNumber,
        countryCode: this.form.getRawValue().phoneNumber?.countryCode,
        userInterestVacationHome: this.form.value["userInterestVacationHome"],
        userInterestExperience: this.form.value["userInterestExperience"],
        yakeenVerificationType: this.radioValue,
      };

      this.profileService.updateGuest(input).subscribe(
        (result) => {
          this.toaster.success("تم حفظ البيانات الملف الشخصي بنجاح");
          this.saveLoading = false;
          this.getProfileData()
        },
        (error) => {
          this.toaster.error("An error occurred while saving the profile.");
          this.saveLoading = false;
        }
      );
    } else {
      markAllAsDirty(this.form);
    }
  }

  getProfileImage() {
    this.profileService.getProfilePictureSource().subscribe((data) => {
      this.profilePicture = data;
      this.cdr.detectChanges()
    });
  }

  getProfileData() {
    this.profileService.getGuestProfile().subscribe((data) => {
      const responseData = { ...data };
      this.form.patchValue(responseData);
      this.profile=responseData;
      this.radioValue =
        responseData.yakeenVerificationType || YakeenVerificationType.SaudiId;

      this.selectedCountryISO =
        responseData.countryCode.toLowerCase() as typeof this.selectedCountryISO;

   
    });
  }

  getUserInterestExperience() {
    return this.profileService.getUserInterestExperience();
  }

  getUserInterestVacationHome() {
    return this.profileService.getUserInterestVacationHome();
  }

  getUserInterest() {
    forkJoin({
      experience: this.getUserInterestExperience(),
      vacationHome: this.getUserInterestVacationHome(),
    }).subscribe({
      next: (result) => {
        this.userInterestExperience = result.experience;
        this.userInterestVacationHome = result.vacationHome;

        const selectedExperienceIds: number[] = [];
        const selectedVacationHomeIds: number[] = [];
        for (const item of this.userInterestExperience) {
          if (item.isSelected) {
            selectedExperienceIds.push(item.id);
          }
        }

        for (const item of this.userInterestVacationHome) {
          if (item.isSelected) {
            selectedVacationHomeIds.push(item.id);
          }
        }
        if (this.form.controls["userInterestExperience"]) {
          this.form.controls["userInterestExperience"].setValue(
            selectedExperienceIds || []
          );
        }
        if (this.form.controls["userInterestVacationHome"]) {
          this.form.controls["userInterestVacationHome"].setValue(
            selectedVacationHomeIds || []
          );
        }
      },
      error: (error) => {
      },
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
      this.profileService.setProfilePicture(formData).subscribe((x) => {
        // this.getProfileImage();
        
      });
    }
  }

  isInterestVacationHomeSelected(id: number) {
    const userInterestVacationHome = this.form.controls["userInterestVacationHome"]?.value || [];
    return userInterestVacationHome.find(
      (item) => item == id
    );
  }

  selectVacationHomeInterest(id: number) {
    const userInterestVacationHome =
      this.form.controls["userInterestVacationHome"]?.value || [];

    let selectedValue;
    if (this.isInterestVacationHomeSelected(id)) {
      selectedValue = userInterestVacationHome.filter((item) => item !== id);
    } else {
      selectedValue = [...userInterestVacationHome, id];
    }
    if (this.form.controls["userInterestVacationHome"]) {
      this.form.controls["userInterestVacationHome"].patchValue(selectedValue);
    }
  }

  isInterestExperienceSelected(id: number) {
    const userInterestExperience = this.form.controls["userInterestExperience"]?.value || [];
    return userInterestExperience.find(
      (item) => item == id
    );
  }

  selectInterestExperience(id: number) {
    const userInterestExperience =
      this.form.controls["userInterestExperience"]?.value || [];

    let selectedValue;
    if (this.isInterestExperienceSelected(id)) {
      selectedValue = userInterestExperience.filter((item) => item !== id);
    } else {
      selectedValue = [...userInterestExperience, id];
    }
    if (this.form.controls["userInterestExperience"]) {
      this.form.controls["userInterestExperience"].patchValue(selectedValue);
    }
  }

  handleOpenOtp(contactItem, verifiedItem, type: HyyakOtpType) {
    this.isOtpOpen = true;
    this.contactInfo = {
      type: type,
      value: contactItem,
      countryCode: this.form.getRawValue().phoneNumber.countryCode,
    };
    this.isVerified = verifiedItem;
  }
  handleDisableDatePicker(isVerified) {
    if (isVerified) {
      this.form.controls["dateOfBirth"].disable();
    }
  }

  verify() {
    if (
      this.form.get("nationalID").invalid ||
      this.form.get("dateOfBirth").invalid
    ) {
      this.form.get("nationalID").markAsDirty();
      this.form.get("dateOfBirth").markAsDirty();
      return;
    }
    this.verifyLoading = true;
    this.setBirthDateControlValue();
    const dateOfBirth = this.form.get("dateOfBirth").value;
    this.accountVerificationService
      .yakeenVerification(
        this.form.controls["nationalID"].value,
        dateOfBirth,
         this.radioValue,
         this.form.controls["nationality"].value
      )
      .subscribe({
        next: (data) => {
          if (data.status) {
           if (this.form.controls["isVerifiedBy3rdParty"]) {
             this.form.controls["isVerifiedBy3rdParty"].setValue(data.status);
           }
           if (this.form.controls["idFullName"]) {
             this.form.controls["idFullName"].setValue(data.name);
           }
            // localStorage.setItem('nationalID',  this.form.controls["nationalID"].value);
            // localStorage.setItem('dateOfBirth',  this.form.controls["dateOfBirth"].value);
            this.isVisibleSuccessCheck = true;
            this.isReadOnlyControl = true;
            // if come From payment  
            // if (localStorage.getItem('reserveUrl')) {
            //   window.location.href=(localStorage.getItem('reserveUrl'))
            //   }

          } else {
            if (this.lang == "ar")
              this.toaster.error("رقم الهويه او تاريخ الميلاد غير صحيح ");
            if (this.lang == "en")
              this.toaster.error("Invalid Identity number or Date of birth");
            this.isVisibleSuccessCheck = false;
            this.isReadOnlyControl = false;
          } 
        },
        error: (error) => {
          this.toaster.error("حدث خطأ أثناء التحقق");
          this.verifyLoading = false;
        },
        complete: () => {
          // This will be called after either success or error
          this.verifyLoading = false;
        },
      });
  }
  async checkValidImage(file: File) {
    const src = window.URL.createObjectURL(file);
    let isInvalidDimensions;

    const addImageProcess = (src) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });
    };
    const image = await addImageProcess(src);
    return false;
    // isInvalidDimensions = image.width < 250 || image.height < 100;

    // if (isInvalidDimensions) {
    //   this.toaster.warning("يجب ان تكون الصورة ذات ابعاد 100*250");
    //   return true;
    // }
    // const ONE_MEGA_BYTE = 1024 ** 2;
    // const MAX_IMAGE_SIZE = file.size / ONE_MEGA_BYTE;
    // if (MAX_IMAGE_SIZE > 2) {
    //   this.toaster.warning("يجب أن يكون حجم الملف أقل من 2 ميجابايت!");
    //   return true;
    // }
    // return false;
  }
  getCountryIso(countryCode: string) {
    for (let [key, value] of Object.entries(CountryISO)) {
      if (value === countryCode) {
        return CountryISO[key];
      }
    }
  }

  handleVerifiedOtp(value) {
    this.form.patchValue(value);
    this.getProfileData();
  }
  handleverfySuccess(value)
  {
    if(value)
    {
      this.getProfileData();
    }
  }
}
