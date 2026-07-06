import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AgreedUserAgreementService } from '@proxy/agreed-user-agreements';
import { UserAgreementPolicyDto, UserAgreementPolicyService } from '@proxy/user-agreement-policies';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { firstValueFrom } from 'rxjs';
import { AccountVerificationService } from 'src/app/feature/account-verification/services';

@Component({
  selector: 'app-user-agreement',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './user-agreement.component.html',
  styleUrl: './user-agreement.component.scss',
})
export class UserAgreementComponent {
  @Input() isVisible: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() show = new EventEmitter<void>();
  @Output() accept = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  saudiID: string;
  dateOfBirth: string;
  hasAgreed: boolean = false;
  UserAgreementPolicyDto: UserAgreementPolicyDto;
  policyText: string;
  policyId: number;

  constructor(
    private accountVerificationService: AccountVerificationService,
    private agreedUserAgreementService: AgreedUserAgreementService,
    private usreAgreementPolicyService: UserAgreementPolicyService,
  ) {}

  triggerCheckPolicy(): void {
    this.getUserData()
      .then(() => this.checkIfUserAgreed())
      .then(() => {
        if (this.hasAgreed) {
          this.accept.emit();
        } else {
          return this.getLatestPolicy();
        }
      })
      .catch(err => console.log(err));
  }

  async getUserData(): Promise<void> {
    const data = await firstValueFrom(this.accountVerificationService.getByCreatorId());
    this.saudiID = data.saudiID;
    const date = new Date(data.dateOfBirth);
    this.dateOfBirth = date.toLocaleDateString('en-GB');
  }

  async checkIfUserAgreed(): Promise<void> {
    this.hasAgreed = await firstValueFrom(
      this.agreedUserAgreementService.getHasUserAgreedToLatestPolicy(),
    );
    if (!this.hasAgreed) {
      //debugger;
      this.show.emit();
    }
  }

  async getLatestPolicy(): Promise<void> {
    const response = await firstValueFrom(
      this.usreAgreementPolicyService.getLatestUserAgreementPolicy(),
    );
    this.policyText = response.agreementText;
    this.policyId = response.id;
  }

  onCancel() {
    this.cancel.emit();
  }

  onAccept() {
    this.agreedUserAgreementService
      .create({
        userAgreementPolicyId: this.policyId,
        agreedDate: new Date().toLocaleTimeString('en-US', { hour12: false }),
      })
      .subscribe({
        next: () => {
          this.accept.emit();
        },
      });
  }
}
