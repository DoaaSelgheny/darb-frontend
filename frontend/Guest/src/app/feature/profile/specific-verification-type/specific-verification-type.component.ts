import { Component, EventEmitter, Input, Output } from "@angular/core";
import { UiComponentsModule } from "src/shared/ui-components/ui-components.module";
import { RouterModule } from "@angular/router";
import { ConfigStateService, CoreModule } from "@abp/ng.core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedModule } from "src/shared/shared.module";
import { LocalizationService } from "@abp/ng.core";
import { differenceInCalendarDays } from "date-fns";
import {

  ProfileService,
  genderOptions,
} from "../profiles";
import {
  YakeenVerificationType,
  yakeenVerificationTypeOptions,
} from "../profiles/yakeen-verification-type.enum";
import { Subject, Subscription, debounceTime, forkJoin, map, merge } from "rxjs";
import {
  NgxIntlTelInputModule,
} from "ngx-intl-tel-input-gg";
import { ToasterService } from "src/shared/services/toaster.service";
import {
  EIGHTEEN_YEARS_AGO,
  disabledDate,
} from "src/shared/helpers/datePickerValidation";
import { ConfrontationTypes } from "src/shared/ui-components/confrontation-popup/confrontation-types.enum";

import { AccountVerificationService } from "../account-verifications";
@Component({
  selector: 'app-specific-verification-type',
  standalone: true,
  imports: [
    RouterModule,
    UiComponentsModule,
    CoreModule,
    SharedModule,
    NgxIntlTelInputModule,
  ],
  templateUrl: './specific-verification-type.component.html',
  styleUrl: './specific-verification-type.component.scss'
})
export class SpecificVerificationTypeComponent {
  @Input() fromPayment = false;
  @Output() verfySuccess = new EventEmitter<any>();
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

  lang: string;

  subscriptions: Subscription = new Subscription();

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.startDate) > 0;
  contactInfo = null;
  isVerified: boolean = false;
  saveSubject = new Subject<void>();
  profile: any;
  currentUser: any;
  ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS = /^[\u0600-\u06FFa-zA-Z\s]+$/;
  constructor(
    private toaster: ToasterService,
    private fb: FormBuilder,
    private config: ConfigStateService,
    private profileService: ProfileService,
    private accountVerificationService: AccountVerificationService,
    private localizationService: LocalizationService,

  ) { }

  ngOnInit(): void {
    this.currentUser = this.config.getOne('currentUser');
    this.form.reset()
    this.lang = this.localizationService.currentLang;
    this.handleForm();
    if (this.currentUser.isAuthenticated) {
      this.getProfileData();
    }

    this.subscriptions.add(
      this.form
        .get("nationalID")
        .valueChanges
        .subscribe(() => {
          this.validateNationalId();
        })
    );
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
    if (saudiIDValue.length == 0) {
      nationalIDControl.setErrors({ required: true });
      return;
    }
    if (this.radioValue == YakeenVerificationType.SaudiId || this.radioValue == YakeenVerificationType.Iqama) {

      if (saudiIDValue && saudiIDValue.length < 10) {
        nationalIDControl.setErrors({ minlength: true });
        return;
      } else if (saudiIDValue && saudiIDValue.length > 10) {
        nationalIDControl.setErrors({ maxlength: true });
        return;
      }
      // Validate pattern
      if (this.radioValue == YakeenVerificationType.SaudiId) {
        const pattern = /^[1١][0-9٠-٩]{9}$/; // Adjusted pattern to ensure 10 digits
        if (!pattern.test(saudiIDValue)) {
          nationalIDControl.setErrors({ mustStartWithOne: true });
          return;
        }
      }
      if (this.radioValue == YakeenVerificationType.Iqama) {
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
      nationalID: this.fb.control("", [Validators.required]),
      dateOfBirth: this.fb.control("", [Validators.required]),
      nationality: this.fb.control(""),
      image: this.fb.control(""),
      hyyakId: this.fb.control(""),
      name: this.fb.control(""),
      surname: this.fb.control(""),
      idFullName: this.fb.control(""),

      yakeenVerificationType: this.fb.control(YakeenVerificationType.SaudiId),
      isVerifiedBy3rdParty: this.fb.control(false),
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


  getProfileData() {
    this.profileService.getGuestProfile().subscribe((data) => {
      const responseData = { ...data };
      this.form.patchValue(responseData);
      this.profile = responseData;
      this.radioValue =
        responseData.yakeenVerificationType || YakeenVerificationType.SaudiId;


      this.handleDisableDatePicker(data.isVerifiedBy3rdParty);
      // const savedNationalID = localStorage.getItem('nationalID');
      //   if (savedNationalID) {
      //     this.form.patchValue({ nationalID: savedNationalID });
      //   }

      // const savedDateOfBirth = localStorage.getItem('dateOfBirth');
      // if (savedDateOfBirth) {
      //   this.form.patchValue({ dateOfBirth: savedDateOfBirth });
      // }
    });
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
            this.form.controls["isVerifiedBy3rdParty"].setValue(data.status);
            this.form.controls["idFullName"].setValue(data.name);
            // localStorage.setItem('nationalID',  this.form.controls["nationalID"].value);
            // localStorage.setItem('dateOfBirth',  this.form.controls["dateOfBirth"].value);
            this.isVisibleSuccessCheck = true;
            this.isReadOnlyControl = true;
            // if come From payment  
            // if (localStorage.getItem('reserveUrl')) {
            //   window.location.href=(localStorage.getItem('reserveUrl'))
            //   }
            this.verfySuccess.emit(true)
          } else {
            if (this.lang == "ar")
              this.toaster.error("رقم الهويه او تاريخ الميلاد غير صحيح ");
            if (this.lang == "en")
              this.toaster.error("Invalid Identity number or Date of birth");
            this.isVisibleSuccessCheck = false;
            this.isReadOnlyControl = false;
            this.verfySuccess.emit(false)
          }
        },
        error: (error) => {
          this.toaster.error("حدث خطأ أثناء التحقق");
          this.verifyLoading = false;
          this.verfySuccess.emit(false)
        },
        complete: () => {
          // This will be called after either success or error
          this.verifyLoading = false;
        },
      });
  }


  handleVerifiedOtp(value) {
    this.form.patchValue(value);
    this.getProfileData();
  }
  //aray
  nationaltyArr = [
    {
      "CODE": "101",
      "DESCRIPTION": "الامارات  العربية",
      "LATIN_DESCRIPTION": "ARAB EMIRATES"
    },
    {
      "CODE": "102",
      "DESCRIPTION": "الاردن",
      "LATIN_DESCRIPTION": "JORDAN"
    },
    {
      "CODE": "103",
      "DESCRIPTION": "البحرين",
      "LATIN_DESCRIPTION": "BAHRAIN"
    },
    {
      "CODE": "104",
      "DESCRIPTION": "سوريا",
      "LATIN_DESCRIPTION": "SYRIA"
    },
    {
      "CODE": "105",
      "DESCRIPTION": "العراق",
      "LATIN_DESCRIPTION": "IRAQ"
    },
    {
      "CODE": "106",
      "DESCRIPTION": "عمان",
      "LATIN_DESCRIPTION": "OMAN"
    },
    {
      "CODE": "107",
      "DESCRIPTION": "فلسطين",
      "LATIN_DESCRIPTION": "PALESTINE"
    },
    {
      "CODE": "108",
      "DESCRIPTION": "قطر",
      "LATIN_DESCRIPTION": "COUNTRY"
    },
    {
      "CODE": "109",
      "DESCRIPTION": "الكويت",
      "LATIN_DESCRIPTION": "KUWAIT"
    },
    {
      "CODE": "110",
      "DESCRIPTION": "لبنان",
      "LATIN_DESCRIPTION": "Lebanon"
    },
    {
      "CODE": "111",
      "DESCRIPTION": "اليمن",
      "LATIN_DESCRIPTION": "Yemen"
    },
    {
      "CODE": "112",
      "DESCRIPTION": "اليمن الجنوبي",
      "LATIN_DESCRIPTION": "Southern Yemen"
    },
    {
      "CODE": "113",
      "DESCRIPTION": "العربية السعودية",
      "LATIN_DESCRIPTION": "Saudi Arabia"
    },
    {
      "CODE": "114",
      "DESCRIPTION": "يمني جنوبي-السلاطين",
      "LATIN_DESCRIPTION": "Yemeni the sultans"
    },
    {
      "CODE": "115",
      "DESCRIPTION": "بني حارث",
      "LATIN_DESCRIPTION": "Bani Harith"
    },
    {
      "CODE": "116",
      "DESCRIPTION": "الكويت  -بدون",
      "LATIN_DESCRIPTION": "Kuwait - without"
    },
    {
      "CODE": "117",
      "DESCRIPTION": "افراد القبائل",
      "LATIN_DESCRIPTION": "Member of the tribes"
    },
    {
      "CODE": "118",
      "DESCRIPTION": "من سكان البحرين",
      "LATIN_DESCRIPTION": "Residents of Bahrain"
    },
    {
      "CODE": "119",
      "DESCRIPTION": "قبائل مجاورة للعطفين",
      "LATIN_DESCRIPTION": "Tribes adj to Ataf"
    },
    {
      "CODE": "120",
      "DESCRIPTION": "اجنبي بجواز سعودي",
      "LATIN_DESCRIPTION": "Alien  KSA Passprt"
    },
    {
      "CODE": "121",
      "DESCRIPTION": "فلسطيني بوثيقة مصرية",
      "LATIN_DESCRIPTION": "Palestinian Egyptian"
    },
    {
      "CODE": "122",
      "DESCRIPTION": "فلسطيني بوثيقة لبناني",
      "LATIN_DESCRIPTION": "Palestinian Lebanese"
    },
    {
      "CODE": "123",
      "DESCRIPTION": "فلسطيني بوثيقة اردنية",
      "LATIN_DESCRIPTION": "Palestinian Jordan"
    },
    {
      "CODE": "124",
      "DESCRIPTION": "فلسطيني بوثيقة عراقية",
      "LATIN_DESCRIPTION": "Palestinian Iraqi"
    },
    {
      "CODE": "125",
      "DESCRIPTION": "فلسطيني بوثيقة سورية",
      "LATIN_DESCRIPTION": "Palestinian Syria"
    },
    {
      "CODE": "126",
      "DESCRIPTION": "وثيقة قطريه",
      "LATIN_DESCRIPTION": "document Syria"
    },
    {
      "CODE": "127",
      "DESCRIPTION": "وثيقة عمانيه",
      "LATIN_DESCRIPTION": "The document Omani"
    },
    {
      "CODE": "128",
      "DESCRIPTION": "وثيقة اماراتيه",
      "LATIN_DESCRIPTION": "The document EMIRIAN"
    },
    {
      "CODE": "129",
      "DESCRIPTION": "وثيقة بحرينيه",
      "LATIN_DESCRIPTION": "Document Industry"
    },
    {
      "CODE": "130",
      "DESCRIPTION": "عرب ثمانية وأربعون",
      "LATIN_DESCRIPTION": "Arabs 48"
    },
    {
      "CODE": "131",
      "DESCRIPTION": "قبائل نازحة/الحليفه",
      "LATIN_DESCRIPTION": "Tribe/AlHal"
    },
    {
      "CODE": "132",
      "DESCRIPTION": "اليمن - لحج",
      "LATIN_DESCRIPTION": "Yemen - pilgrimage"
    },
    {
      "CODE": "133",
      "DESCRIPTION": "قبائل نازحة/الكويت",
      "LATIN_DESCRIPTION": "Tribes  / Kuwait"
    },
    {
      "CODE": "134",
      "DESCRIPTION": "غير كويتي",
      "LATIN_DESCRIPTION": "Unknown"
    },
    {
      "CODE": "135",
      "DESCRIPTION": "غير بحريني",
      "LATIN_DESCRIPTION": "Unknown"
    },
    {
      "CODE": "136",
      "DESCRIPTION": "غير قطري",
      "LATIN_DESCRIPTION": "Unknown"
    },
    {
      "CODE": "137",
      "DESCRIPTION": "غير اماراتي",
      "LATIN_DESCRIPTION": "Unknown"
    },
    {
      "CODE": "138",
      "DESCRIPTION": "غير عماني",
      "LATIN_DESCRIPTION": "Unknown"
    },
    {
      "CODE": "139",
      "DESCRIPTION": "مقيم/نازح",
      "LATIN_DESCRIPTION": ""
    },
    {
      "CODE": "140",
      "DESCRIPTION": "مقيم/مولود",
      "LATIN_DESCRIPTION": ""
    },
    {
      "CODE": "141",
      "DESCRIPTION": "مقيم/طالب جنسية",
      "LATIN_DESCRIPTION": ""
    },
    {
      "CODE": "142",
      "DESCRIPTION": "مقيم/أفراد القبائل",
      "LATIN_DESCRIPTION": ""
    },
    {
      "CODE": "143",
      "DESCRIPTION": "مقيم/غير معروف",
      "LATIN_DESCRIPTION": ""
    },
    {
      "CODE": "144",
      "DESCRIPTION": "مقيم/لا يحمل وثيقة",
      "LATIN_DESCRIPTION": ""
    },
    {
      "CODE": "145",
      "DESCRIPTION": "قبيلة الصيعر",
      "LATIN_DESCRIPTION": "ALSAYAR"
    },
    {
      "CODE": "146",
      "DESCRIPTION": "المناهيل والمهرة",
      "LATIN_DESCRIPTION": "ALMNAHIL AND ALMAHRH"
    },
    {
      "CODE": "201",
      "DESCRIPTION": "تونس",
      "LATIN_DESCRIPTION": "Tunisia"
    },
    {
      "CODE": "202",
      "DESCRIPTION": "الجزائر",
      "LATIN_DESCRIPTION": "Algeria"
    },
    {
      "CODE": "203",
      "DESCRIPTION": "جيبوتى",
      "LATIN_DESCRIPTION": "Djibouti"
    },
    {
      "CODE": "204",
      "DESCRIPTION": "السودان",
      "LATIN_DESCRIPTION": "Sudan"
    },
    {
      "CODE": "205",
      "DESCRIPTION": "الصومال",
      "LATIN_DESCRIPTION": "Somalia"
    },
    {
      "CODE": "206",
      "DESCRIPTION": "ليبيا",
      "LATIN_DESCRIPTION": "Libya"
    },
    {
      "CODE": "207",
      "DESCRIPTION": "مصر",
      "LATIN_DESCRIPTION": "Egypt"
    },
    {
      "CODE": "208",
      "DESCRIPTION": "المغرب",
      "LATIN_DESCRIPTION": "Morocco"
    },
    {
      "CODE": "209",
      "DESCRIPTION": "موريتانيا",
      "LATIN_DESCRIPTION": "Mauritania"
    },
    {
      "CODE": "301",
      "DESCRIPTION": "افغانستان",
      "LATIN_DESCRIPTION": "Afghanistan"
    },
    {
      "CODE": "302",
      "DESCRIPTION": "اندونيسيا",
      "LATIN_DESCRIPTION": "Indonesia"
    },
    {
      "CODE": "303",
      "DESCRIPTION": "ايران",
      "LATIN_DESCRIPTION": "Iran"
    },
    {
      "CODE": "304",
      "DESCRIPTION": "باكستان",
      "LATIN_DESCRIPTION": "Pakistan"
    },
    {
      "CODE": "305",
      "DESCRIPTION": "بنجلاديش",
      "LATIN_DESCRIPTION": "Bangladesh"
    },
    {
      "CODE": "306",
      "DESCRIPTION": "بروني",
      "LATIN_DESCRIPTION": "Brunei"
    },
    {
      "CODE": "307",
      "DESCRIPTION": "جمهورية ميانمار",
      "LATIN_DESCRIPTION": "Myanmar"
    },
    {
      "CODE": "308",
      "DESCRIPTION": "تايلند",
      "LATIN_DESCRIPTION": "Thailand"
    },
    {
      "CODE": "309",
      "DESCRIPTION": "تركيا",
      "LATIN_DESCRIPTION": "Turkey"
    },
    {
      "CODE": "310",
      "DESCRIPTION": "جزر ملاديف",
      "LATIN_DESCRIPTION": "Maldives"
    },
    {
      "CODE": "311",
      "DESCRIPTION": "روسيا الاتحادية",
      "LATIN_DESCRIPTION": "Russia"
    },
    {
      "CODE": "312",
      "DESCRIPTION": "سنغافورة",
      "LATIN_DESCRIPTION": "Singapore"
    },
    {
      "CODE": "313",
      "DESCRIPTION": "سري لنكا",
      "LATIN_DESCRIPTION": "Sri Lanka"
    },
    {
      "CODE": "314",
      "DESCRIPTION": "الصين الوطنية",
      "LATIN_DESCRIPTION": "China National"
    },
    {
      "CODE": "315",
      "DESCRIPTION": "الفلبين",
      "LATIN_DESCRIPTION": "Philippines"
    },
    {
      "CODE": "316",
      "DESCRIPTION": "فيتنام",
      "LATIN_DESCRIPTION": "Vietnam"
    },
    {
      "CODE": "317",
      "DESCRIPTION": "كمبوديا",
      "LATIN_DESCRIPTION": "Cambodia"
    },
    {
      "CODE": "318",
      "DESCRIPTION": "كوريا الجنوبية",
      "LATIN_DESCRIPTION": "South Korea"
    },
    {
      "CODE": "319",
      "DESCRIPTION": "ماليزيا",
      "LATIN_DESCRIPTION": "Malaysia"
    },
    {
      "CODE": "320",
      "DESCRIPTION": "نيبال",
      "LATIN_DESCRIPTION": "Nepal"
    },
    {
      "CODE": "321",
      "DESCRIPTION": "الهند",
      "LATIN_DESCRIPTION": "India"
    },
    {
      "CODE": "322",
      "DESCRIPTION": "هونج كونج",
      "LATIN_DESCRIPTION": "HONG KONG"
    },
    {
      "CODE": "323",
      "DESCRIPTION": "اليابان",
      "LATIN_DESCRIPTION": "Japan"
    },
    {
      "CODE": "324",
      "DESCRIPTION": "بهوتان",
      "LATIN_DESCRIPTION": "Bhutan"
    },
    {
      "CODE": "325",
      "DESCRIPTION": "الصين الشعبية",
      "LATIN_DESCRIPTION": "China"
    },
    {
      "CODE": "326",
      "DESCRIPTION": "قبرص",
      "LATIN_DESCRIPTION": "Cyprus"
    },
    {
      "CODE": "328",
      "DESCRIPTION": "كوريا الشمالية",
      "LATIN_DESCRIPTION": "North Korea"
    },
    {
      "CODE": "329",
      "DESCRIPTION": "لاوس",
      "LATIN_DESCRIPTION": "Laos"
    },
    {
      "CODE": "330",
      "DESCRIPTION": "منغوليا",
      "LATIN_DESCRIPTION": "Mongolia"
    },
    {
      "CODE": "331",
      "DESCRIPTION": "ماكاو",
      "LATIN_DESCRIPTION": "Macao"
    },
    {
      "CODE": "332",
      "DESCRIPTION": "تركستان",
      "LATIN_DESCRIPTION": "Turkistan"
    },
    {
      "CODE": "333",
      "DESCRIPTION": "مقيم بلوشي",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "334",
      "DESCRIPTION": "بخارستان",
      "LATIN_DESCRIPTION": "Bucharest"
    },
    {
      "CODE": "335",
      "DESCRIPTION": "القبائل النازحة",
      "LATIN_DESCRIPTION": "Tribes emigrated"
    },
    {
      "CODE": "336",
      "DESCRIPTION": "كازاخستان",
      "LATIN_DESCRIPTION": "Kazakhstan"
    },
    {
      "CODE": "337",
      "DESCRIPTION": "ازبكستان",
      "LATIN_DESCRIPTION": "Uzbekistan"
    },
    {
      "CODE": "338",
      "DESCRIPTION": "تركمانستان",
      "LATIN_DESCRIPTION": "Turkmenistan"
    },
    {
      "CODE": "339",
      "DESCRIPTION": "طاجكستان",
      "LATIN_DESCRIPTION": "Tajikistan"
    },
    {
      "CODE": "340",
      "DESCRIPTION": "قرغيزستان",
      "LATIN_DESCRIPTION": "kyrgyzstan"
    },
    {
      "CODE": "341",
      "DESCRIPTION": "سقطرة",
      "LATIN_DESCRIPTION": "Socotra"
    },
    {
      "CODE": "342",
      "DESCRIPTION": "مهرة",
      "LATIN_DESCRIPTION": "Muhrah"
    },
    {
      "CODE": "343",
      "DESCRIPTION": "اذربيجان",
      "LATIN_DESCRIPTION": "Azerbaijan"
    },
    {
      "CODE": "344",
      "DESCRIPTION": "الشاشان",
      "LATIN_DESCRIPTION": "Chechnya"
    },
    {
      "CODE": "345",
      "DESCRIPTION": "داغستان",
      "LATIN_DESCRIPTION": "Dagestan"
    },
    {
      "CODE": "346",
      "DESCRIPTION": "انقوش",
      "LATIN_DESCRIPTION": "Anquosh"
    },
    {
      "CODE": "347",
      "DESCRIPTION": "تتارستان",
      "LATIN_DESCRIPTION": "Tatarstan"
    },
    {
      "CODE": "348",
      "DESCRIPTION": "مكررلقرغيزيا لايستخدم",
      "LATIN_DESCRIPTION": "Kyrgyzstan not used"
    },
    {
      "CODE": "349",
      "DESCRIPTION": "تيمور الشرقية",
      "LATIN_DESCRIPTION": "East Timor"
    },
    {
      "CODE": "350",
      "DESCRIPTION": "مقيم",
      "LATIN_DESCRIPTION": "Resident"
    },
    {
      "CODE": "351",
      "DESCRIPTION": "ميانمار/مقيم",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "352",
      "DESCRIPTION": "ميانمار/جواز باكستان",
      "LATIN_DESCRIPTION": "-"
    },
    {
      "CODE": "353",
      "DESCRIPTION": "ميانمار/جوازبنجلا دش",
      "LATIN_DESCRIPTION": "-"
    },
    {
      "CODE": "401",
      "DESCRIPTION": "اثيوبيا",
      "LATIN_DESCRIPTION": "Ethiopia"
    },
    {
      "CODE": "402",
      "DESCRIPTION": "اوغندة",
      "LATIN_DESCRIPTION": "Uganda"
    },
    {
      "CODE": "403",
      "DESCRIPTION": "بوتسوانا",
      "LATIN_DESCRIPTION": "Botswana"
    },
    {
      "CODE": "404",
      "DESCRIPTION": "بورندي",
      "LATIN_DESCRIPTION": "Burundi"
    },
    {
      "CODE": "405",
      "DESCRIPTION": "تشاد",
      "LATIN_DESCRIPTION": "Chad"
    },
    {
      "CODE": "406",
      "DESCRIPTION": "تنزانيا",
      "LATIN_DESCRIPTION": "Tanzania"
    },
    {
      "CODE": "407",
      "DESCRIPTION": "توجو",
      "LATIN_DESCRIPTION": "Togo"
    },
    {
      "CODE": "408",
      "DESCRIPTION": "جابون",
      "LATIN_DESCRIPTION": "Answer"
    },
    {
      "CODE": "409",
      "DESCRIPTION": "غامبيا",
      "LATIN_DESCRIPTION": "Gambia"
    },
    {
      "CODE": "410",
      "DESCRIPTION": "جزر القمر",
      "LATIN_DESCRIPTION": "Comoros"
    },
    {
      "CODE": "411",
      "DESCRIPTION": "جنوب  افريقيا",
      "LATIN_DESCRIPTION": "South Africa"
    },
    {
      "CODE": "412",
      "DESCRIPTION": "ناميبيا",
      "LATIN_DESCRIPTION": "Namibia"
    },
    {
      "CODE": "413",
      "DESCRIPTION": "بنين",
      "LATIN_DESCRIPTION": "Benin"
    },
    {
      "CODE": "414",
      "DESCRIPTION": "رواندا",
      "LATIN_DESCRIPTION": "Rwanda"
    },
    {
      "CODE": "415",
      "DESCRIPTION": "زمبابوي",
      "LATIN_DESCRIPTION": "Zimbabwe"
    },
    {
      "CODE": "416",
      "DESCRIPTION": "زائير",
      "LATIN_DESCRIPTION": "Zaire"
    },
    {
      "CODE": "417",
      "DESCRIPTION": "زامبيا",
      "LATIN_DESCRIPTION": "Zambia"
    },
    {
      "CODE": "418",
      "DESCRIPTION": "ساحل العاج",
      "LATIN_DESCRIPTION": "Ivory Coast"
    },
    {
      "CODE": "419",
      "DESCRIPTION": "السنغال",
      "LATIN_DESCRIPTION": "Senegal"
    },
    {
      "CODE": "420",
      "DESCRIPTION": "سيراليون",
      "LATIN_DESCRIPTION": "Sierra Leone"
    },
    {
      "CODE": "421",
      "DESCRIPTION": "غانا",
      "LATIN_DESCRIPTION": "Ghana"
    },
    {
      "CODE": "422",
      "DESCRIPTION": "غينيا",
      "LATIN_DESCRIPTION": "Guinea"
    },
    {
      "CODE": "423",
      "DESCRIPTION": "غينيابيساو",
      "LATIN_DESCRIPTION": "Guinea Bissau"
    },
    {
      "CODE": "424",
      "DESCRIPTION": "بوركينافاسو",
      "LATIN_DESCRIPTION": "Burkina Faso"
    },
    {
      "CODE": "425",
      "DESCRIPTION": "الكاميرون",
      "LATIN_DESCRIPTION": "Cameroon"
    },
    {
      "CODE": "426",
      "DESCRIPTION": "الكونغو",
      "LATIN_DESCRIPTION": "Congo"
    },
    {
      "CODE": "427",
      "DESCRIPTION": "كينيا",
      "LATIN_DESCRIPTION": "Kenya"
    },
    {
      "CODE": "428",
      "DESCRIPTION": "ليسوتو",
      "LATIN_DESCRIPTION": "Lesotho"
    },
    {
      "CODE": "429",
      "DESCRIPTION": "ليبيريا",
      "LATIN_DESCRIPTION": "Liberia"
    },
    {
      "CODE": "430",
      "DESCRIPTION": "مالي",
      "LATIN_DESCRIPTION": "Mali"
    },
    {
      "CODE": "432",
      "DESCRIPTION": "ملاوي",
      "LATIN_DESCRIPTION": "Malawi"
    },
    {
      "CODE": "433",
      "DESCRIPTION": "موريشيوس",
      "LATIN_DESCRIPTION": "Mauritius"
    },
    {
      "CODE": "434",
      "DESCRIPTION": "موزمبيق",
      "LATIN_DESCRIPTION": "Mozambique"
    },
    {
      "CODE": "435",
      "DESCRIPTION": "نيجيريا",
      "LATIN_DESCRIPTION": "Nigeria"
    },
    {
      "CODE": "436",
      "DESCRIPTION": "النيجر",
      "LATIN_DESCRIPTION": "Niger"
    },
    {
      "CODE": "437",
      "DESCRIPTION": "افريقيا الوسطى",
      "LATIN_DESCRIPTION": "Central Africa"
    },
    {
      "CODE": "438",
      "DESCRIPTION": "انجولا",
      "LATIN_DESCRIPTION": "Angola"
    },
    {
      "CODE": "439",
      "DESCRIPTION": "الراس  الاخضر",
      "LATIN_DESCRIPTION": "Cape Verde"
    },
    {
      "CODE": "440",
      "DESCRIPTION": "غينيا الاستوائية",
      "LATIN_DESCRIPTION": "Equatorial Guinea"
    },
    {
      "CODE": "441",
      "DESCRIPTION": "ملاجاسي",
      "LATIN_DESCRIPTION": "Mlajasi"
    },
    {
      "CODE": "442",
      "DESCRIPTION": "ساوتومي/برنسبى",
      "LATIN_DESCRIPTION": "Sao Tome/FranceBank"
    },
    {
      "CODE": "443",
      "DESCRIPTION": "جزر سيشل",
      "LATIN_DESCRIPTION": "Seychelles Islands"
    },
    {
      "CODE": "444",
      "DESCRIPTION": "سوزيلاند",
      "LATIN_DESCRIPTION": "Swaziland"
    },
    {
      "CODE": "445",
      "DESCRIPTION": "بوفثاتسوانا",
      "LATIN_DESCRIPTION": "Bovthatswana"
    },
    {
      "CODE": "446",
      "DESCRIPTION": "رينيون",
      "LATIN_DESCRIPTION": "Reunion"
    },
    {
      "CODE": "447",
      "DESCRIPTION": "ترانسكي",
      "LATIN_DESCRIPTION": "Transkei"
    },
    {
      "CODE": "448",
      "DESCRIPTION": "فيندا",
      "LATIN_DESCRIPTION": "Venda"
    },
    {
      "CODE": "449",
      "DESCRIPTION": "ارتيريا",
      "LATIN_DESCRIPTION": "Eritrea"
    },
    {
      "CODE": "450",
      "DESCRIPTION": "دول افريقية اخري",
      "LATIN_DESCRIPTION": "Other African States"
    },
    {
      "CODE": "451",
      "DESCRIPTION": "سانت هيلانة",
      "LATIN_DESCRIPTION": "Saint Helena"
    },
    {
      "CODE": "452",
      "DESCRIPTION": "جزيرةمايوت",
      "LATIN_DESCRIPTION": "Comorian island"
    },
    {
      "CODE": "453",
      "DESCRIPTION": "جمهورية جنوب السودان",
      "LATIN_DESCRIPTION": "Republic of South"
    },
    {
      "CODE": "454",
      "DESCRIPTION": "كاب فيرد",
      "LATIN_DESCRIPTION": "CAPE VERDE"
    },
    {
      "CODE": "501",
      "DESCRIPTION": "اسبانيا",
      "LATIN_DESCRIPTION": "Spain"
    },
    {
      "CODE": "502",
      "DESCRIPTION": "البانيا",
      "LATIN_DESCRIPTION": "Albania"
    },
    {
      "CODE": "503",
      "DESCRIPTION": "المانيا",
      "LATIN_DESCRIPTION": "Germany"
    },
    {
      "CODE": "504",
      "DESCRIPTION": "ايرلندا",
      "LATIN_DESCRIPTION": "Ireland"
    },
    {
      "CODE": "505",
      "DESCRIPTION": "ايطاليا",
      "LATIN_DESCRIPTION": "Italy"
    },
    {
      "CODE": "506",
      "DESCRIPTION": "المملكة المتحدة",
      "LATIN_DESCRIPTION": "United Kingdom"
    },
    {
      "CODE": "507",
      "DESCRIPTION": "البرتغال",
      "LATIN_DESCRIPTION": "Portugal"
    },
    {
      "CODE": "508",
      "DESCRIPTION": "بلغاريا",
      "LATIN_DESCRIPTION": "Bulgaria"
    },
    {
      "CODE": "509",
      "DESCRIPTION": "بلجيكا",
      "LATIN_DESCRIPTION": "Belgium"
    },
    {
      "CODE": "510",
      "DESCRIPTION": "بولندا",
      "LATIN_DESCRIPTION": "Poland"
    },
    {
      "CODE": "511",
      "DESCRIPTION": "رمزقديم تشكوسلوفاكيا",
      "LATIN_DESCRIPTION": "old to Czechoslovak"
    },
    {
      "CODE": "512",
      "DESCRIPTION": "الدانمارك",
      "LATIN_DESCRIPTION": "Denmark"
    },
    {
      "CODE": "513",
      "DESCRIPTION": "رومانيا",
      "LATIN_DESCRIPTION": "Romania"
    },
    {
      "CODE": "514",
      "DESCRIPTION": "السويد",
      "LATIN_DESCRIPTION": "Sweden"
    },
    {
      "CODE": "515",
      "DESCRIPTION": "سويسرا",
      "LATIN_DESCRIPTION": "Switzerland"
    },
    {
      "CODE": "516",
      "DESCRIPTION": "فرنسا",
      "LATIN_DESCRIPTION": "France"
    },
    {
      "CODE": "517",
      "DESCRIPTION": "فنلندا",
      "LATIN_DESCRIPTION": "Finland"
    },
    {
      "CODE": "518",
      "DESCRIPTION": "صربيا",
      "LATIN_DESCRIPTION": "SERBIA"
    },
    {
      "CODE": "519",
      "DESCRIPTION": "هولندا",
      "LATIN_DESCRIPTION": "Netherlands"
    },
    {
      "CODE": "520",
      "DESCRIPTION": "يوغسلافيا",
      "LATIN_DESCRIPTION": "Yugoslavia"
    },
    {
      "CODE": "521",
      "DESCRIPTION": "اليونان",
      "LATIN_DESCRIPTION": "Greece"
    },
    {
      "CODE": "522",
      "DESCRIPTION": "اندورا",
      "LATIN_DESCRIPTION": "Andorra"
    },
    {
      "CODE": "523",
      "DESCRIPTION": "النمسا",
      "LATIN_DESCRIPTION": "Austria"
    },
    {
      "CODE": "524",
      "DESCRIPTION": "الجبل الأ سود",
      "LATIN_DESCRIPTION": "MONTENEGRO"
    },
    {
      "CODE": "525",
      "DESCRIPTION": "هنغاريا",
      "LATIN_DESCRIPTION": "Hungary"
    },
    {
      "CODE": "526",
      "DESCRIPTION": "ايسلندا",
      "LATIN_DESCRIPTION": "Iceland"
    },
    {
      "CODE": "527",
      "DESCRIPTION": "ليختنشتين",
      "LATIN_DESCRIPTION": "Liechtenstein"
    },
    {
      "CODE": "528",
      "DESCRIPTION": "لوكسمبورغ",
      "LATIN_DESCRIPTION": "Luxembourg"
    },
    {
      "CODE": "529",
      "DESCRIPTION": "مالطا",
      "LATIN_DESCRIPTION": "Malta"
    },
    {
      "CODE": "530",
      "DESCRIPTION": "موناكو",
      "LATIN_DESCRIPTION": "Monaco"
    },
    {
      "CODE": "531",
      "DESCRIPTION": "النرويج",
      "LATIN_DESCRIPTION": "Norway"
    },
    {
      "CODE": "532",
      "DESCRIPTION": "سان مورينو",
      "LATIN_DESCRIPTION": "San Moreno"
    },
    {
      "CODE": "533",
      "DESCRIPTION": "مدينة الفاتيكان",
      "LATIN_DESCRIPTION": "Vatican City"
    },
    {
      "CODE": "534",
      "DESCRIPTION": "جبل طارق",
      "LATIN_DESCRIPTION": "Gibraltar"
    },
    {
      "CODE": "536",
      "DESCRIPTION": "اوكرانيا",
      "LATIN_DESCRIPTION": "Ukraine"
    },
    {
      "CODE": "537",
      "DESCRIPTION": "روسيا البيضاء",
      "LATIN_DESCRIPTION": "Byelorussia"
    },
    {
      "CODE": "539",
      "DESCRIPTION": "ارمينيا",
      "LATIN_DESCRIPTION": "Armenia"
    },
    {
      "CODE": "540",
      "DESCRIPTION": "مولدافيا",
      "LATIN_DESCRIPTION": "Moldova"
    },
    {
      "CODE": "541",
      "DESCRIPTION": "جورجيا",
      "LATIN_DESCRIPTION": "Georgia"
    },
    {
      "CODE": "542",
      "DESCRIPTION": "ليتوانيا",
      "LATIN_DESCRIPTION": "Lithuania"
    },
    {
      "CODE": "543",
      "DESCRIPTION": "استونيا",
      "LATIN_DESCRIPTION": "Estonia"
    },
    {
      "CODE": "544",
      "DESCRIPTION": "لاتفيا",
      "LATIN_DESCRIPTION": "Latvia"
    },
    {
      "CODE": "545",
      "DESCRIPTION": "البوسنة والهرسك",
      "LATIN_DESCRIPTION": "Bosnia / Herzegovina"
    },
    {
      "CODE": "546",
      "DESCRIPTION": "كرواتيا",
      "LATIN_DESCRIPTION": "Croatia"
    },
    {
      "CODE": "547",
      "DESCRIPTION": "سلوفينيا",
      "LATIN_DESCRIPTION": "Slovenia"
    },
    {
      "CODE": "548",
      "DESCRIPTION": "صربيا والجبل الأسود",
      "LATIN_DESCRIPTION": "Serbia / Montenegro"
    },
    {
      "CODE": "549",
      "DESCRIPTION": "مقدونيا",
      "LATIN_DESCRIPTION": "Macedonia"
    },
    {
      "CODE": "550",
      "DESCRIPTION": "كوسوفوا",
      "LATIN_DESCRIPTION": "Kosovo"
    },
    {
      "CODE": "551",
      "DESCRIPTION": "رمزقديم للجبل الاسود",
      "LATIN_DESCRIPTION": "code to Montenegro"
    },
    {
      "CODE": "552",
      "DESCRIPTION": "تشيك",
      "LATIN_DESCRIPTION": "CZECH REPUBLIC"
    },
    {
      "CODE": "553",
      "DESCRIPTION": "سلوفاكيا",
      "LATIN_DESCRIPTION": "Slovakia"
    },
    {
      "CODE": "554",
      "DESCRIPTION": "جزر فيرو",
      "LATIN_DESCRIPTION": "Faroe Islands"
    },
    {
      "CODE": "555",
      "DESCRIPTION": "ميتروبوليتان فرنسية",
      "LATIN_DESCRIPTION": "FRANCE METROPOLITAN"
    },
    {
      "CODE": "601",
      "DESCRIPTION": "الولايات  المتحدة",
      "LATIN_DESCRIPTION": "United States"
    },
    {
      "CODE": "602",
      "DESCRIPTION": "الارجنتين",
      "LATIN_DESCRIPTION": "Argentina"
    },
    {
      "CODE": "603",
      "DESCRIPTION": "بربادوس",
      "LATIN_DESCRIPTION": "Barbados"
    },
    {
      "CODE": "604",
      "DESCRIPTION": "البرازيل",
      "LATIN_DESCRIPTION": "Brazil"
    },
    {
      "CODE": "605",
      "DESCRIPTION": "بنما",
      "LATIN_DESCRIPTION": "Panama"
    },
    {
      "CODE": "606",
      "DESCRIPTION": "ترينداد وتوباجو",
      "LATIN_DESCRIPTION": "Trinidad and Tobago"
    },
    {
      "CODE": "607",
      "DESCRIPTION": "جامايكا",
      "LATIN_DESCRIPTION": "Jamaica"
    },
    {
      "CODE": "608",
      "DESCRIPTION": "جوانا",
      "LATIN_DESCRIPTION": "Joanna"
    },
    {
      "CODE": "609",
      "DESCRIPTION": "فنزويلا",
      "LATIN_DESCRIPTION": "Venezuela"
    },
    {
      "CODE": "610",
      "DESCRIPTION": "كندا",
      "LATIN_DESCRIPTION": "Canada"
    },
    {
      "CODE": "611",
      "DESCRIPTION": "كولمبيا",
      "LATIN_DESCRIPTION": "Columbia"
    },
    {
      "CODE": "612",
      "DESCRIPTION": "جزر البهاما",
      "LATIN_DESCRIPTION": "Bahamas"
    },
    {
      "CODE": "613",
      "DESCRIPTION": "كوستاريكا",
      "LATIN_DESCRIPTION": "Costa Rica"
    },
    {
      "CODE": "614",
      "DESCRIPTION": "كوبا",
      "LATIN_DESCRIPTION": "Cuba"
    },
    {
      "CODE": "615",
      "DESCRIPTION": "دومينيكا",
      "LATIN_DESCRIPTION": "Dominica"
    },
    {
      "CODE": "616",
      "DESCRIPTION": "جمهورية دمينكان",
      "LATIN_DESCRIPTION": "Republic Dominica"
    },
    {
      "CODE": "617",
      "DESCRIPTION": "السلفادور",
      "LATIN_DESCRIPTION": "El Salvador"
    },
    {
      "CODE": "618",
      "DESCRIPTION": "جرانادا",
      "LATIN_DESCRIPTION": "Granada"
    },
    {
      "CODE": "619",
      "DESCRIPTION": "جواتيمالا",
      "LATIN_DESCRIPTION": "Guatemala"
    },
    {
      "CODE": "620",
      "DESCRIPTION": "هايتي",
      "LATIN_DESCRIPTION": "Haiti"
    },
    {
      "CODE": "621",
      "DESCRIPTION": "هوندوراس",
      "LATIN_DESCRIPTION": "Honduras"
    },
    {
      "CODE": "622",
      "DESCRIPTION": "المكسيك",
      "LATIN_DESCRIPTION": "Mexico"
    },
    {
      "CODE": "623",
      "DESCRIPTION": "نيكاراجوا",
      "LATIN_DESCRIPTION": "Nicaragua"
    },
    {
      "CODE": "624",
      "DESCRIPTION": "سانت  لوسيا",
      "LATIN_DESCRIPTION": "Saint Lucia"
    },
    {
      "CODE": "625",
      "DESCRIPTION": "سان فينسنت",
      "LATIN_DESCRIPTION": "Saintt Vincent"
    },
    {
      "CODE": "626",
      "DESCRIPTION": "بوليفيا",
      "LATIN_DESCRIPTION": "Bolivia"
    },
    {
      "CODE": "627",
      "DESCRIPTION": "شيلي",
      "LATIN_DESCRIPTION": "Chile"
    },
    {
      "CODE": "628",
      "DESCRIPTION": "اكوادور",
      "LATIN_DESCRIPTION": "Ecuador"
    },
    {
      "CODE": "629",
      "DESCRIPTION": "باراجواي",
      "LATIN_DESCRIPTION": "Paraguay"
    },
    {
      "CODE": "630",
      "DESCRIPTION": "بيرو",
      "LATIN_DESCRIPTION": "Peru"
    },
    {
      "CODE": "631",
      "DESCRIPTION": "سورينام",
      "LATIN_DESCRIPTION": "Suriname"
    },
    {
      "CODE": "632",
      "DESCRIPTION": "اوراجواي",
      "LATIN_DESCRIPTION": "Orajoa"
    },
    {
      "CODE": "633",
      "DESCRIPTION": "س  بييري وميكويلن",
      "LATIN_DESCRIPTION": "Saint Pierre Miquel"
    },
    {
      "CODE": "634",
      "DESCRIPTION": "جرينلاند",
      "LATIN_DESCRIPTION": "Greenland"
    },
    {
      "CODE": "635",
      "DESCRIPTION": "بيليز",
      "LATIN_DESCRIPTION": "Belize"
    },
    {
      "CODE": "636",
      "DESCRIPTION": "بيرمودا",
      "LATIN_DESCRIPTION": "Bermda"
    },
    {
      "CODE": "637",
      "DESCRIPTION": "ج الترك  والقوقاز",
      "LATIN_DESCRIPTION": "Turk/Caucasus Island"
    },
    {
      "CODE": "638",
      "DESCRIPTION": "سان كريستوفرنيفز",
      "LATIN_DESCRIPTION": "San Cristovernivz"
    },
    {
      "CODE": "639",
      "DESCRIPTION": "انجويلا",
      "LATIN_DESCRIPTION": "Anguilla"
    },
    {
      "CODE": "640",
      "DESCRIPTION": "انتيكوا",
      "LATIN_DESCRIPTION": "Antiques"
    },
    {
      "CODE": "641",
      "DESCRIPTION": "ج فيرجن البريطانية",
      "LATIN_DESCRIPTION": "British Virgin"
    },
    {
      "CODE": "642",
      "DESCRIPTION": "جزر كايمون",
      "LATIN_DESCRIPTION": "Cayman Islands"
    },
    {
      "CODE": "643",
      "DESCRIPTION": "مونت  سيرات",
      "LATIN_DESCRIPTION": "Monte Sirat"
    },
    {
      "CODE": "644",
      "DESCRIPTION": "جيودي لوب",
      "LATIN_DESCRIPTION": "Gyude Lube"
    },
    {
      "CODE": "645",
      "DESCRIPTION": "مارتينيكو",
      "LATIN_DESCRIPTION": "Martinico"
    },
    {
      "CODE": "646",
      "DESCRIPTION": "عروبا",
      "LATIN_DESCRIPTION": "Arabism"
    },
    {
      "CODE": "647",
      "DESCRIPTION": "بونيري",
      "LATIN_DESCRIPTION": "Bonaire"
    },
    {
      "CODE": "648",
      "DESCRIPTION": "كيوراكو",
      "LATIN_DESCRIPTION": "Curako"
    },
    {
      "CODE": "649",
      "DESCRIPTION": "سان استاتيوس",
      "LATIN_DESCRIPTION": "San Astatios"
    },
    {
      "CODE": "650",
      "DESCRIPTION": "سابا",
      "LATIN_DESCRIPTION": "Saba"
    },
    {
      "CODE": "651",
      "DESCRIPTION": "سان مارتين",
      "LATIN_DESCRIPTION": "San Martin"
    },
    {
      "CODE": "652",
      "DESCRIPTION": "بورتوريكو",
      "LATIN_DESCRIPTION": "Puerto Rico"
    },
    {
      "CODE": "653",
      "DESCRIPTION": "ج فيرجن الامريكية",
      "LATIN_DESCRIPTION": "Virgin Islands of US"
    },
    {
      "CODE": "654",
      "DESCRIPTION": "جزر فاكلاند",
      "LATIN_DESCRIPTION": "Falkland Islands"
    },
    {
      "CODE": "655",
      "DESCRIPTION": "جيانا الفرنسية",
      "LATIN_DESCRIPTION": "French Guyana"
    },
    {
      "CODE": "656",
      "DESCRIPTION": "الامم المتحدة",
      "LATIN_DESCRIPTION": "United Nations"
    },
    {
      "CODE": "657",
      "DESCRIPTION": "جزر كوك",
      "LATIN_DESCRIPTION": "Cook Islands"
    },
    {
      "CODE": "659",
      "DESCRIPTION": "باربودا",
      "LATIN_DESCRIPTION": "Barbuda"
    },
    {
      "CODE": "660",
      "DESCRIPTION": "انتيل الهولندية",
      "LATIN_DESCRIPTION": "NETHERLANDS ANTILLES"
    },
    {
      "CODE": "661",
      "DESCRIPTION": "جزر كوكوس",
      "LATIN_DESCRIPTION": "COCOS ISLAND"
    },
    {
      "CODE": "662",
      "DESCRIPTION": "البريطانية في المحيط",
      "LATIN_DESCRIPTION": "BRITISH INDIAN OCEAN"
    },
    {
      "CODE": "663",
      "DESCRIPTION": "سانت كيتس ونافيس",
      "LATIN_DESCRIPTION": "SAINT KITTS & NEVIS"
    },
    {
      "CODE": "664",
      "DESCRIPTION": "جنوب جورجيا",
      "LATIN_DESCRIPTION": "SOUTH GEORGIA"
    },
    {
      "CODE": "701",
      "DESCRIPTION": "استراليا",
      "LATIN_DESCRIPTION": "Australia"
    },
    {
      "CODE": "702",
      "DESCRIPTION": "نيوزيلندا",
      "LATIN_DESCRIPTION": "New Zealand"
    },
    {
      "CODE": "703",
      "DESCRIPTION": "بابوا نيوغينا",
      "LATIN_DESCRIPTION": "Papua yoga"
    },
    {
      "CODE": "704",
      "DESCRIPTION": "نيو",
      "LATIN_DESCRIPTION": "New"
    },
    {
      "CODE": "705",
      "DESCRIPTION": "انتاركتيكا",
      "LATIN_DESCRIPTION": "Antarctica"
    },
    {
      "CODE": "706",
      "DESCRIPTION": "جزر نورفولك",
      "LATIN_DESCRIPTION": "Norfolk Island"
    },
    {
      "CODE": "707",
      "DESCRIPTION": "توكيلاو",
      "LATIN_DESCRIPTION": "Tokelau"
    },
    {
      "CODE": "708",
      "DESCRIPTION": "جزيرةكريسماس",
      "LATIN_DESCRIPTION": "Christmas Island"
    },
    {
      "CODE": "709",
      "DESCRIPTION": "جزيرةكوكو-كيلنج",
      "LATIN_DESCRIPTION": "koko Island- Kellenj"
    },
    {
      "CODE": "710",
      "DESCRIPTION": "فرنسا الجنوب القطبية",
      "LATIN_DESCRIPTION": "FRENCH SOUTH"
    },
    {
      "CODE": "711",
      "DESCRIPTION": "جزيرة هيرد وماكدونلد",
      "LATIN_DESCRIPTION": "HEARD DONALD ISLANDS"
    },
    {
      "CODE": "712",
      "DESCRIPTION": "جزر بيتكايرن",
      "LATIN_DESCRIPTION": "PITCAIRN ISLANDS"
    },
    {
      "CODE": "801",
      "DESCRIPTION": "جزر فيجي",
      "LATIN_DESCRIPTION": "Fiji Islands"
    },
    {
      "CODE": "802",
      "DESCRIPTION": "كيريباتي",
      "LATIN_DESCRIPTION": "Kiribati"
    },
    {
      "CODE": "803",
      "DESCRIPTION": "نورو",
      "LATIN_DESCRIPTION": "Nauru"
    },
    {
      "CODE": "804",
      "DESCRIPTION": "جزر سليمان",
      "LATIN_DESCRIPTION": "Solomon Islands"
    },
    {
      "CODE": "805",
      "DESCRIPTION": "تونجا",
      "LATIN_DESCRIPTION": "Tonga"
    },
    {
      "CODE": "806",
      "DESCRIPTION": "توفالو",
      "LATIN_DESCRIPTION": "Tuvalu"
    },
    {
      "CODE": "807",
      "DESCRIPTION": "فانيوتو",
      "LATIN_DESCRIPTION": "Vanuoto"
    },
    {
      "CODE": "808",
      "DESCRIPTION": "ساموا الغربية",
      "LATIN_DESCRIPTION": "Western Samoa"
    },
    {
      "CODE": "809",
      "DESCRIPTION": "ساموا الامريكية",
      "LATIN_DESCRIPTION": "American Samoa"
    },
    {
      "CODE": "810",
      "DESCRIPTION": "جوام",
      "LATIN_DESCRIPTION": "Guam"
    },
    {
      "CODE": "811",
      "DESCRIPTION": "جزر ماريانا",
      "LATIN_DESCRIPTION": "Mariana Islands"
    },
    {
      "CODE": "812",
      "DESCRIPTION": "ميكرونيسيا",
      "LATIN_DESCRIPTION": "Micronesia"
    },
    {
      "CODE": "813",
      "DESCRIPTION": "جزر ماريشال",
      "LATIN_DESCRIPTION": "Marechal Islands"
    },
    {
      "CODE": "814",
      "DESCRIPTION": "بيلو",
      "LATIN_DESCRIPTION": "Belo"
    },
    {
      "CODE": "815",
      "DESCRIPTION": "بولينيسياالفرنسية",
      "LATIN_DESCRIPTION": "French Polynesia"
    },
    {
      "CODE": "816",
      "DESCRIPTION": "جزر والس  وفوتونا",
      "LATIN_DESCRIPTION": "Islands Wallis"
    },
    {
      "CODE": "817",
      "DESCRIPTION": "كاليدونيا الجديد",
      "LATIN_DESCRIPTION": "New Caledonia"
    },
    {
      "CODE": "818",
      "DESCRIPTION": "مدغشقر",
      "LATIN_DESCRIPTION": "Madagascar"
    },
    {
      "CODE": "819",
      "DESCRIPTION": "قبيلة بالعبيد",
      "LATIN_DESCRIPTION": "Balobid"
    },
    {
      "CODE": "820",
      "DESCRIPTION": "قبيلة النسي",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "821",
      "DESCRIPTION": "قبائل مجاورة للعبر",
      "LATIN_DESCRIPTION": "TRIBES ADJACENT"
    },
    {
      "CODE": "822",
      "DESCRIPTION": "قبيلة الحرث",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "823",
      "DESCRIPTION": "قبيلة نهد",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "824",
      "DESCRIPTION": "جزر مينور",
      "LATIN_DESCRIPTION": "US MINOR ISLANDS"
    },
    {
      "CODE": "825",
      "DESCRIPTION": "مقيم اجنبي - الاشاجعة",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "826",
      "DESCRIPTION": "مقيم اجنبي - العدوان",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "835",
      "DESCRIPTION": "حصر د1",
      "LATIN_DESCRIPTION": "NULL"
    },
    {
      "CODE": "900",
      "DESCRIPTION": "غير معروف",
      "LATIN_DESCRIPTION": "Unknown"
    },
    {
      "CODE": "901",
      "DESCRIPTION": "اخرى",
      "LATIN_DESCRIPTION": "OTHER"
    },
    {
      "CODE": "989",
      "DESCRIPTION": "هميما",
      "LATIN_DESCRIPTION": "X"
    }
  ]
}
