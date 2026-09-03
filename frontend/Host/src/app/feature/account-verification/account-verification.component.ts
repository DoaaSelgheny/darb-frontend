import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

import { LocalizationService } from '@abp/ng.core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UploadTypes } from 'src/shared/ui-components/upload-photo/upload-type.enum';
import { TosterService } from 'src/shared/services/toster.service';
import { ConfrontationTypes } from 'src/shared/ui-components/confrontation-popup/confrontation-types.enum';
import { AlertType } from 'src/shared/ui-components/alert/alert.component';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FileManagementService } from 'src/shared/services/file-management.service';
import { Subscription } from 'rxjs';
import { AccountVerificationService } from '@proxy/account-verifications/account-verification.service';
import { AccountVerificationStatus } from '@proxy/account-verifications/enum/account-verification-status.enum';
import {
  IdentityDocumentType,
  identityDocumentTypeOptions,
} from '@proxy/account-verifications/enum/identity-document-type.enum';

@Component({
  selector: 'app-account-verification',
  standalone: true,
  imports: [SharedModule, ReactiveFormsModule],
  templateUrl: './account-verification.component.html',
  styleUrl: './account-verification.component.scss',
})
export class AccountVerificationComponent implements OnInit, OnDestroy {
  IdentityDocumentType = IdentityDocumentType;
  identityDocumentTypeOptions = identityDocumentTypeOptions;

  form: FormGroup;
  submitLoading: boolean = false;
  isVisibleMasg: boolean = false;
  isVisibleSuccess: boolean = false;
  lang: string;
  alertType = AlertType;
  confrontationTypesEnum = ConfrontationTypes;
  uploadPDFUrl = `${environment.apis.default.url}/api/app/account-verifications/upload`;
  uploadType = UploadTypes.PDF;
  saudiIDFrontFile: NzUploadFile[] = [];
  saudiIDBackFile: NzUploadFile[] = [];
  shamBankAccountImageFile: NzUploadFile[] = [];
  accountVerificationStatus = AccountVerificationStatus;
  subscriptions: Subscription = new Subscription();

  constructor(
    private accountVerificationService: AccountVerificationService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: TosterService,
    private fileManagement: FileManagementService,
    private localizationService: LocalizationService,
  ) {}

  // ngOnInit() {
  //   this.lang = this.localizationService.currentLang;
  //   this.formBuilder();
  //   this.subscriptions.add(
  //     this.accountVerificationService.getByCreatorId().subscribe(data => {
  //       if (data) {
  //         this.form.patchValue(data);
  //         if (data.attachedSaudiIDFront) {
  //           this.saudiIDFrontFile = [
  //             { uid: '-1', name: data.attachedSaudiIDFront, iconType: 'uploading' },
  //           ];
  //         }
  //         if (data.attachedSaudiIDBack) {
  //           this.saudiIDBackFile = [
  //             { uid: '-1', name: data.attachedSaudiIDBack, iconType: 'uploading' },
  //           ];
  //         }
  //       }
  //     }),
  //   );


  // }

  ngOnInit() {
  this.lang = this.localizationService.currentLang;

  this.formBuilder();

  this.form
    .get('identityDocumentType')
    ?.valueChanges.subscribe((value: IdentityDocumentType) => {

      const front = this.form.get('attachedSaudiIDFront');
      const back = this.form.get('attachedSaudiIDBack');

      front?.setValidators([Validators.required]);

      if (value === IdentityDocumentType.Id) {
        back?.setValidators([Validators.required]);
      } else {
        back?.clearValidators();
        back?.setValue(null);
        this.saudiIDBackFile = [];
      }

      front?.updateValueAndValidity();
      back?.updateValueAndValidity();
    });

  this.subscriptions.add(
    this.accountVerificationService.getByCreatorId().subscribe(data => {
      if (data) {
        this.form.patchValue(data);

        if (data.attachedSaudiIDFront) {
          this.saudiIDFrontFile = [
            { uid: '-1', name: data.attachedSaudiIDFront, iconType: 'uploading' },
          ];
        }

        if (data.attachedSaudiIDBack) {
          this.saudiIDBackFile = [
            { uid: '-1', name: data.attachedSaudiIDBack, iconType: 'uploading' },
          ];
        }

        if (data.shamBankAccountImage) {
          this.shamBankAccountImageFile = [
            { uid: '-1', name: data.shamBankAccountImage, iconType: 'uploading' },
          ];
        }
      }
    }),
  );
}


  get isReadOnly(): boolean {
    const status = this.form?.value?.status;
    return (
      status === this.accountVerificationStatus.UnderStudy ||
      status === this.accountVerificationStatus.Approved
    );
  }

  paymentDetailsValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const iban = group.get('iban')?.value;
    const shamBankAccount = group.get('shamBankAccount')?.value;
    const shamBankAccountImage = group.get('shamBankAccountImage')?.value;
    return iban || shamBankAccount || shamBankAccountImage ? null : { paymentDetailsRequired: true };
  };

  formBuilder() {
    this.form = this.fb.group(
      {
        identityDocumentType: [null, Validators.required],
        attachedSaudiIDFront: [null, Validators.required],
        attachedSaudiIDBack: [null, Validators.required],
        iban: [null],
        shamBankAccount: [null],
        shamBankAccountImage: [null],
        status: [null],
        rejectionReason: [null],
      },
      { validators: this.paymentDetailsValidator },
    );
  }

  back() {
    this.router.navigate(['']);
  }

  uploadFrontFile(event) {
    if (event?.type == 'success') {
      this.saudiIDFrontFile = event.fileList.slice(-1);
      this.form.controls['attachedSaudiIDFront'].setValue(event.file.response?.name);
    }
  }

  uploadBackFile(event) {
    if (event?.type == 'success') {
      this.saudiIDBackFile = event.fileList.slice(-1);
      this.form.controls['attachedSaudiIDBack'].setValue(event.file.response?.name);
    }
  }

  uploadShamBankAccountImageFile(event) {
    if (event?.type == 'success') {
      this.shamBankAccountImageFile = event.fileList.slice(-1);
      this.form.controls['shamBankAccountImage'].setValue(event.file.response?.name);
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

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isVisibleMasg = false;
    this.submitLoading = true;
    this.accountVerificationService
      .submitIdentityVerification({
          identityDocumentType: this.form.value.identityDocumentType,
        attachedSaudiIDFront: this.form.value.attachedSaudiIDFront,
        attachedSaudiIDBack: this.form.value.attachedSaudiIDBack,
        iban: this.form.value.iban,
        shamBankAccount: this.form.value.shamBankAccount,
        shamBankAccountImage: this.form.value.shamBankAccountImage,
      })
      .subscribe({
        next: data => {
          this.form.patchValue(data);
          this.isVisibleSuccess = true;
        },
        error: () => {
          this.toaster.error(
            this.lang == 'ar' ? 'حدث خطأ أثناء إرسال طلب التوثيق' : 'An error occurred while submitting the verification request',
          );
        },
        complete: () => {
          this.submitLoading = false;
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  get isIdSelected(): boolean {
  return this.form.get('identityDocumentType')?.value === IdentityDocumentType.Id;
}

}
