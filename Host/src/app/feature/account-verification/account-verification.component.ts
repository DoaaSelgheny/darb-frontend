import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { LocalizationService } from '@abp/ng.core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UploadTypes } from 'src/shared/ui-components/upload-photo/upload-type.enum';
import { ConfigStateService, CoreModule } from '@abp/ng.core';
import { TosterService } from 'src/shared/services/toster.service';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { InputValidationService } from 'src/shared/services/input-validation.service';
import { differenceInCalendarDays } from 'date-fns';
import { vaidationType } from 'src/shared/directives/vaidationTypeEnum';
import { AccountVerificationStatus, YakeenVerificationType } from './services/enum';
import { AlertType } from 'src/shared/ui-components/alert/alert.component';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FileManagementService } from 'src/shared/services/file-management.service';
import {
  ACCOUNT_NUMBER,
  ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS,
  SAUDI_IBAN,
} from 'src/shared/directives/validation-regex';
import { substringValidator } from '../../../shared/directives/custom-validation';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { ProfileService } from '../profile/services';
import { AccountVerificationService } from '@proxy/account-verifications/account-verification.service';
import { AccountVerificationType } from '@proxy/account-verifications/enum/account-verification-type.enum';
import { HostType } from '@proxy/account-verifications';
import { MinistryTourismVerificationType } from './MinistryTourismVerificationType.enum';
import { is } from 'date-fns/locale';
@Component({
  selector: 'app-account-verification',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss',
})
export class AccountVerificationComponent implements OnInit {
  form: FormGroup;
  verifyLoading: boolean = false;
  isVisible: boolean = false;
  isAcceptTermsAndCondition: boolean = false;
  uploadPDFUrl = `${environment.apis.default.url}/api/app/account-verifications/upload`;
  uploadType = UploadTypes.PDF;
  isVisibleMasg: boolean = false;
  isVisibleSuccess: boolean = false;
  isVisibleAsDraftSuccess: boolean = false;
  isVisibleSuccessCheck: boolean = false;
  isReadOnlyControl: boolean = false;
  confrontationTypesEnum = ConfrontationTypes;
  vaidationTypeEnum = vaidationType;
  lang: string;
  alertType = AlertType;
  startDate = new Date().setFullYear(new Date().getFullYear() - 4);
  licenseFile: NzUploadFile[] = [];
  saudiIDFile: NzUploadFile[] = [];
  accountVerificationStatus = AccountVerificationStatus;
  subscriptions: Subscription = new Subscription();
  ministryTourismVerificationTypeEnum = MinistryTourismVerificationType;
  tourismVerificationType :number = this.ministryTourismVerificationTypeEnum.PermitNumber
  permitNumber = null;
  commercialRegister = null
licenseNumber = null
isTaxNumber = false
  // TODO to be replaced with BE Call when business is ready
  bankData: { value: string; label }[] = [
    { value: 'مصرف الراجحي', label: 'مصرف الراجحي' },
    { value: 'البنك الأهلي السعودي', label: 'البنك الأهلي السعودي' },
    { value: 'بنك الرياض', label: 'بنك الرياض' },
    { value: 'بنك البلاد', label: 'بنك البلاد' },
    { value: 'بنك الإنماء', label: 'بنك الإنماء' },
    { value: 'بنك الجزيرة', label: 'بنك الجزيرة' },
    { value: 'بنك الأول', label: 'بنك الأول' },
    { value: 'البنك السعودي الفرنسي', label: 'البنك السعودي الفرنسي' },
    { value:'البنك السعودي للاستثمار', label: 'البنك السعودي للاستثمار' },
    { value:'البنك العربي الوطني', label: 'البنك العربي الوطني' },
  ];

  bankDataEn: { value: string; labelEn: string }[] = [
    { value: 'مصرف الراجحي', labelEn:'Al Rajhi Bank' },
    { value: 'البنك الأهلي السعودي', labelEn: 'Saudi National Bank' },
    { value: 'بنك الرياض', labelEn: 'Riyad Bank' },
    {  value: 'بنك البلاد', labelEn: 'Bank Albilad' },
    { value: 'بنك الإنماء', labelEn: 'Alinma Bank'},
    { value: 'بنك الجزيرة', labelEn: 'Bank AlJazira' },
    { value: 'بنك الأول', labelEn: 'SABB (Saudi British Bank)'},
    {  value: 'البنك السعودي الفرنسي', labelEn: 'Saudi Fransi Bank' },
    { value:'البنك السعودي للاستثمار',labelEn:'Saudi Investment Bank' },
    { value:'البنك العربي الوطني', labelEn: 'Arab National Bank'},
  ];
  HostType = HostType
  isVerifiedTourism:boolean = false
  originalData
  constructor(
    private accountVerificationService: AccountVerificationService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: TosterService,
    private config: ConfigStateService,
    private fileManagement: FileManagementService,
    private inputValidationService: InputValidationService,
    private localizationService: LocalizationService,
    private profileService: ProfileService,
  ) {}
  ngOnInit() {
    this.getProfileData();
    this.lang = this.localizationService.currentLang;
    this.formBuilder();
    this.form.patchValue({
      tourismVerificationType :this.ministryTourismVerificationTypeEnum.PermitNumber
    })
    this.form.get('ibanNumber').valueChanges.subscribe(value => {
      if (value && value.length >= 14 && this.form.get('ibanNumber').valid) {
        const accountNumber = value.substring(value.length - 14);
        this.form.get('accountNumber').setValue(accountNumber);
      } else {
        this.form.get('accountNumber').setValue(null);
      }
    });

    this.form.get('status').setValue(this.accountVerificationStatus.Draft);
    this.subscriptions.add(
      this.accountVerificationService.getByCreatorId().subscribe(
        data => {
          if (data) {
            this.form.patchValue(data);
            this.originalData = data
            console.log(this.form.value)
            if (data.licenseFile) {
              this.licenseFile = [
                {
                  uid: '-1',
                  name: data.licenseFile,
                  iconType: 'uploading',
                },
              ];
            }
            if (data.attachedSaudiID) {
              this.saudiIDFile = [
            {
                  uid: '-1',
                  name: data.attachedSaudiID,
                  iconType: 'uploading',
                },
              ];
            }
            this.isVerifiedTourism = data.isVerifiedMinistryTourism
            // this.permitNumber=data.permitNumber
            if(data.hostType === HostType.Individual){
                this.form.patchValue({
                  permitNumber :data.permitNumber,
                })
                this.form.get('tourismVerificationType').setValue(this.ministryTourismVerificationTypeEnum.PermitNumber)
              }else{
                this.form.patchValue({
                  commercialRegister :data.commercialRegistrationNumber,
                  licenseNumber:data.licenceNumber
                })
                this.form.get('tourismVerificationType').setValue(this.ministryTourismVerificationTypeEnum.LicenseNumber)
                if(data.taxRegistrationNumber){
                  this.isTaxNumber = true
                  this.form.patchValue({
                    taxRegistrationNumber:data.taxRegistrationNumber
                  })
                }
              }

          }

          // if(data.isVerifiedMinistryTourism){
          //   this.form.get('tourismVerificationType').disable()
          // }
        },
        error => {},
      ),
    );
    this.verifyLoading = false;
    this.subscriptions.add(
      this.form.controls['ibanNumber'].valueChanges
        .pipe(distinctUntilChanged())
        .subscribe(value => {
          this.form.controls['accountNumber'].updateValueAndValidity();
        }),
    );
    // Subscription for saudiID value changes
    this.subscriptions.add(
      this.form.get('saudiID').valueChanges.subscribe(() => {
        this.validateSaudiID();
      }),
    );
    this.subscriptions.add(
      this.form.get('ibanNumber').valueChanges.subscribe(() => {
        this.verifyIBAN();
      }),
    );
    // Subscription for dateOfBirth value changes
    this.subscriptions.add(
      this.form
        .get('dateOfBirth')
        .valueChanges.pipe(distinctUntilChanged())
        .subscribe(() => {
          if (this.form.value.status != this.accountVerificationStatus.UnderStudy) {
            this.resetVerificationControls();
          }
        }),
    );
    this.subscriptions.add(
      this.form.get('accountHolder').valueChanges.subscribe(() => {
        this.verifyAccountHolder();
      }),
    );
  }

  getProfileData() {
    // this.profileService.getGuestProfile().subscribe((data) => {
    //   const responseData = { data };
    // this.form.patchValue(responseData);
    //   // this.radioValue =
    //   //   responseData.yakeenVerificationType || YakeenVerificationType.SaudiId;
    //   // this.selectedCountryISO =
    //   //   responseData.countryCode.toLowerCase() as typeof this.selectedCountryISO;
    //   // this.handleDisableDatePicker(data.isVerifiedBy3rdParty);
    // });
  }
  verifyAccountHolder() {
    const accountHolderControl = this.form.get('accountHolder');
    const accountHolderValue = accountHolderControl.value;
    // Check if the IBAN pattern is valid
    const pattern = ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS;

    if (!accountHolderValue || accountHolderValue.trim() === '') {
      // Set required error
      accountHolderControl.setErrors({ required: true });
      return;
    }
    // Check if the IBAN length is greater than the allowed length
    if (accountHolderValue && accountHolderValue.length > 50) {
      // Set maxlength error
      accountHolderControl.setErrors({ maxlength: true });
      return;
    }

    // Check if the IBAN length is less than the required length
    if (accountHolderValue && accountHolderValue.length < 1) {
      // Set minlength error
      accountHolderControl.setErrors({ minlength: true });
      return;
    }
    if (!pattern.test(accountHolderValue)) {
      // Set pattern error
      accountHolderControl.setErrors({ pattern: true });
      return;
    }
    // If all checks pass, clear any existing errors
    accountHolderControl.setErrors(null);
  }
  verifyIBAN() {
    const IBAN_LENGTH = 24; // Replace with the required IBAN length
    const ibanControl = this.form.get('ibanNumber');
    const ibanValue = ibanControl.value;

    // Check if the IBAN pattern is valid
    const pattern = /^SA\d{2}\d{2}\d{18}$/;

    if (!ibanValue || ibanValue.trim() === '') {
      // Set required error
      ibanControl.setErrors({ required: true });
      return;
    }
    // Check if the IBAN length is greater than the allowed length
    // if (ibanValue && ibanValue.length > IBAN_LENGTH) {
    //   // Set maxlength error
    //   ibanControl.setErrors({ maxlength: true });
    //   return;
    // }

    // // Check if the IBAN length is less than the required length
    // if (ibanValue && ibanValue.length < IBAN_LENGTH) {
    //   // Set minlength error
    //   ibanControl.setErrors({ minlength: true });
    //   return;
    // }
    if (!pattern.test(ibanValue)) {
      // Set pattern error
      ibanControl.setErrors({ pattern: true });
      return;
    }
    // If all checks pass, clear any existing errors
    ibanControl.setErrors(null);
  }

  handlePasteEvent(event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      // Here you can manipulate the pasted text, validate it, etc.
      // const saudiIDControl = this.form.get("saudiID");
      // const pattern = /^[1١][0-9٠-٩]*$/;
      // setTimeout(() => {
      //   this.validateSaudiID();
      // }, 300);
    }
  }

  validateSaudiID() {
    const saudiIDControl = this.form.get('saudiID');

    // Check if control exists
    if (!saudiIDControl) {
      return;
    }

    // Get the value of the control
    const saudiIDValue = saudiIDControl.value;

    // Reset errors
    saudiIDControl.setErrors(null);

    // Validate length
    if (saudiIDValue.length == 0) {
      saudiIDControl.setErrors({ required: true });
      return;
    }
    if (saudiIDValue.length < 10) {
      saudiIDControl.setErrors({ minlength: true });
      return;
    } else if (saudiIDValue.length > 10) {
      saudiIDControl.setErrors({ maxlength: true });
      return;
    } else {
      // Validate pattern
      const pattern = /^[1١][0-9٠-٩]{9}$/; // Adjusted pattern to ensure 10 digits
      if (!pattern.test(saudiIDValue)) {
        saudiIDControl.setErrors({ mustStartWithOne: true });
        return;
      }
    }

    // Mark the control as touched so the error will be displayed
    saudiIDControl.markAsTouched();

    // Update validity
    saudiIDControl.updateValueAndValidity({ emitEvent: false });
  }
  isSend:boolean = false
  formBuilder() {
    this.form = this.fb.group({
      saudiID: [null, [Validators.required]],
      dateOfBirth: [null, Validators.required],
      accountHolder: ['Doaa'],
      ibanNumber: [null, { validators: [Validators.required] }],
      accountNumber: [
        null,
        {
          validators: [Validators.required],
        },
      ],

      bankName: [null, Validators.required],
      licenseFile: [null],
      attachedSaudiID: [null, Validators.required],
      status: [null, Validators.required],
      type: [AccountVerificationType.Host, Validators.required],
      isDeleted: [false],
      deleterId: [null],
      deletionTime: [null],
      lastModificationTime: [null],
      lastModifierId: [null],
      creationTime: [null],
      acceptTermsAndCondition: [null],
      creatorId: [null],
      id: [null],
      isYakeenVerified: [false],
      isVerifiedMinistryTourism: [false],
      yakeenVerificationType:[YakeenVerificationType.SaudiId],
      tourismVerificationType:[this.ministryTourismVerificationTypeEnum.PermitNumber],
      taxRegistrationNumber:[null,[Validators.pattern(/^3\d*3$/)]],
      commercialRegister:[null,[Validators.minLength(10),Validators.maxLength(10)]],
      licenseNumber:[null,[Validators.minLength(8),Validators.maxLength(8)]],
      permitNumber:[null]
    });
  }
  back() {
    this.router.navigate(['']);
  }
  resetVerificationControls() {
    this.form.get('isYakeenVerified').setValue(false);
    this.form.get('accountHolder').setValue(null);
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    this.inputValidationService.allowOnlyNumbers(event);
  }
  setBirthDateControlValue() {
    const dateOfBirthControl = this.form.controls.dateOfBirth;
    const dateOfBirthValue = new Date(dateOfBirthControl.value); // Convert to Date object if it's a string
    const formattedDateString = dateOfBirthValue.toISOString();
    dateOfBirthControl.setValue(formattedDateString);
  }
  verify() {
    if (
      this.form.get('saudiID').invalid ||
      this.form.get('dateOfBirth').invalid
      // ||
      // this.form.get("accountHolder").invalid
    ) {
      this.form.get('saudiID').markAsDirty();
      this.form.get('dateOfBirth').markAsDirty();
      // this.form.get("accountHolder").markAsDirty();
      return;
    }
    this.verifyLoading = true;
    this.setBirthDateControlValue();
    const dateOfBirth = this.form.get('dateOfBirth').value;

    this.form.get('ibanNumber').setValue(null);
    this.form.get('accountNumber').setValue(null);
    this.form.get('bankName').setValue(null);
    this.accountVerificationService
      .yakeenVerification(
        this.form.controls['saudiID'].value,
        dateOfBirth,
        YakeenVerificationType.SaudiId,
        this.form.controls['saudiID'].value,
      )
      .subscribe({
        next: data => {
          if (data.status) {
            // this.form.get('status').setValue(this.accountVerificationStatus.UnderStudy);
            this.form.controls["accountHolder"].setValue(data.name??'DODO');
            this.form.controls["isYakeenVerified"].setValue(data.status);
            this.isVisibleSuccessCheck = false;
            this.isReadOnlyControl = true;
          } else {
            this.form.controls['isYakeenVerified'].setValue(false);
            if (this.lang == 'ar') this.toaster.error('رقم الهويه او تاريخ الميلاد غير صحيح ');
            if (this.lang == 'en') this.toaster.error('Invalid Identity number or Date of birth');
            this.isVisibleSuccessCheck = false;
            this.isReadOnlyControl = false;
          }
        },
        error: error => {
          this.toaster.error('حدث خطأ أثناء التحقق');
          this.verifyLoading = false;
        },
        complete: () => {
          // This will be called after either success or error
          this.verifyLoading = false;
        },
      });
  }
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.startDate) > 0;
  addRequiredValidators() {
    this.form
      .get('saudiID')
      .setValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^[1١][0-9٠-٩]*$/),
      ]);
    this.form.get('dateOfBirth').setValidators([Validators.required]);
    this.form
      .get('accountHolder')
      .setValidators([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern(ARABIC_ENGLISH_WITH_SPACES_WITHOUT_NUMBERS),
      ]);
    this.form
      .get('ibanNumber')
      .setValidators([Validators.required, Validators.pattern(SAUDI_IBAN)]);
    // this.form
    //   .get('accountNumber')
    //   .setValidators([Validators.required, Validators.pattern(ACCOUNT_NUMBER)]);
    this.form.get('bankName').setValidators([Validators.required]);
    // this.form.get("licenseFile").setValidators([Validators.required]);
    this.form.get('attachedSaudiID').setValidators([Validators.required]);
    this.form.get('status').setValidators([Validators.required]);
    this.form.get('type').setValidators([Validators.required]);
    this.form.get('acceptTermsAndCondition').setValidators([Validators.required]);
  }
  createOrUpdate() {
    debugger
    //  this.addRequiredValidators();   // ensure accountNumber matches the endings of the iban and show errors
    this.form.controls['licenseFile'].setValue(this.licenseFile[0]?.response?.name);
    if(this.saudiIDFile[0]?.response)
   { this.form.controls['attachedSaudiID'].setValue(this.saudiIDFile[0]?.response?.name);
   }

    this.form.controls['accountNumber'].updateValueAndValidity();
      this.form.controls["accountHolder"].setValue('DODO');
    if (this.form.valid) {
      this.isVisibleMasg = false;
      if(this.form.get('status').value === this.accountVerificationStatus.Approved){
        if(this.form.value.attachedSaudiID !== this.originalData.attachedSaudiID ||
          this.form.value.ibanNumber !== this.originalData.ibanNumber ||
          this.form.value.accountNumber !== this.originalData.accountNumber ||
          this.form.value.bankName !== this.originalData.bankName
        ){
          this.form.get('status').setValue(this.accountVerificationStatus.UnderStudy);
        }else{
          this.form.get('status').setValue(this.accountVerificationStatus.Approved);
        }
      }else{
        this.form.get('status').setValue(this.accountVerificationStatus.UnderStudy);
      }

      const currentUser = this.config.getOne('currentUser');
      this.form.get('yakeenVerificationType').setValue(YakeenVerificationType.SaudiId)

      this.accountVerificationService.update(this.form.value).subscribe(
        data => {
          this.isVisibleSuccess = true;
          this.form.patchValue(data);
          //    this.clearAllValidators();
        },
        error => {},
      );
    } else {
      this.makeFormAsMarkAdDirty();
    }
  }
  clearAllValidators() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).clearValidators();
      this.form.get(key).updateValueAndValidity(); // Update the validity after clearing the validators
    });
  }
  saveAsDraft() {
    // this.form.controls["licenseFile"].setValue(this.licenseFile[0]?.response?.name);
    this.form.controls['attachedSaudiID'].setValue(this.saudiIDFile[0]);
    // ensure accountNumber matches the endings of the iban and show errors
    this.form.controls['accountNumber'].updateValueAndValidity();
    if (this.form.valid) {
      this.isVisibleMasg = false;
      this.form.get('status').setValue(this.accountVerificationStatus.Draft);
      const currentUser = this.config.getOne('currentUser');
      this.accountVerificationService.update(this.form.value).subscribe(
        data => {
          this.isVisibleAsDraftSuccess = true;
          this.form.patchValue(data);
          this.isSend = true
        },
        error => {},
      );
    } else {
      this.makeFormAsMarkAdDirty();
    }
  }
  uploadLicenseFile(event) {
    if (event?.type == 'success') {
      // limit displayed files only to 1
      this.licenseFile = event.fileList.slice(-1);
      this.form.controls['licenseFile'].setValue(event.file.name);
    }
  }

  downloadFile(file) {
    this.accountVerificationService.download(file?.response?.name || file?.name).subscribe(
      data => {
        const contentType = 'application/pdf';
        const blob = this.fileManagement.base64ToBlob(data.content.toString(), contentType);
        this.fileManagement.convertBlobToPdf(blob, file);
      },
      error => {},
    );
  }
  iPanFile(event) {
    if (event?.type == 'success') {
      this.saudiIDFile = event.fileList.slice(-1);
      this.form.controls['attachedSaudiID'].setValue(event.file.name);
    }
  }
  makeFormAsMarkAdDirty() {
    Object.keys(this.form.controls).forEach(key => {
      var controls = this.form.get(key);
      if (controls instanceof FormControl) {
        controls.markAsDirty();
      }
    });
  }
  VerifiedMinistryTourism() {
    if(this.form.value.tourismVerificationType == this.ministryTourismVerificationTypeEnum.PermitNumber){

      this.accountVerificationService
        .verifiedMinistryTourismByInput({
          permitNumber: this.form.value.permitNumber,
          // ministryTourismVerificationType: this.ministryTourismVerificationTypeEnum.PermitNumber,
          // idNumber: this.form.get('saudiID').value,
        })
        .subscribe(
          data => {
            this.form.patchValue(data);
            if (!data.isVerifiedMinistryTourism) {
              this.toaster.error(
                this.localizationService.instant('::isVerifiedMinistryTourismError'),
              );
            }
          },
          error => {},
        );
    }else{
      this.accountVerificationService
        .verifiedMinistryTourismByInput({
          // ministryTourismVerificationType: this.ministryTourismVerificationTypeEnum.LicenseNumber,
          licenseNumber: this.form.value.licenseNumber,
          crNumber: this.form.value.commercialRegister,

        })
        .subscribe(
          data => {
            this.form.patchValue(data);
            if (!data.isVerifiedMinistryTourism) {
              this.toaster.error(
                this.localizationService.instant('::isVerifiedMinistryTourismError'),
              );
            }
          },
          error => {},
        );
    }
  }
  OnDestroy() {
    this.subscriptions.unsubscribe();
  }
  updateIsTax(e:any){
    if(e){
      this.form.controls['taxRegistrationNumber'].setValidators(Validators.required)
      this.form.controls['taxRegistrationNumber'].updateValueAndValidity();
    }else{
      this.form.controls['taxRegistrationNumber'].setValidators(null)
      this.form.controls['taxRegistrationNumber'].updateValueAndValidity();
    }
  }
  changetourismVerificationType(e:any){
    console.log(e)
    if(e === this.ministryTourismVerificationTypeEnum.PermitNumber){
      // this.form.controls['permitNumber'].setValidators(Validators.required)
      // this.form.controls['permitNumber'].updateValueAndValidity();
      this.form.controls['commercialRegister'].setValidators(null)
      this.form.controls['commercialRegister'].updateValueAndValidity();
      this.form.controls['licenseNumber'].setValidators(null)
      this.form.controls['licenseNumber'].updateValueAndValidity();
    }else{
      this.form.controls['permitNumber'].setValidators(null)
      this.form.controls['permitNumber'].updateValueAndValidity();
      this.form.controls['commercialRegister'].setValidators(Validators.required)
      this.form.controls['commercialRegister'].updateValueAndValidity();
      this.form.controls['licenseNumber'].setValidators(Validators.required)
      this.form.controls['licenseNumber'].updateValueAndValidity();
    }
  }
}
