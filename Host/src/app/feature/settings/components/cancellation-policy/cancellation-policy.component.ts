import { Component } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CancellationAndReturnPolicyDto } from '@proxy/cancellation-and-return-policies/models';
import { CancellationAndReturnPolicyService } from '@proxy/cancellation-and-return-policies/cancellation-and-return-policy.service';
import { HostSettingService } from '@proxy/host-settings';
import { TosterService } from 'src/shared/services/toster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancellation-policy',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './cancellation-policy.component.html',
  styleUrl: './cancellation-policy.component.scss',
})
export class CancellationPolicyComponent {
  // cancellationAndReturnPolicies: CancellationAndReturnPolicyDto[];
  cancellationAndReturnPolicies:any
  constructor(
    private cancellationAndReturnPolicyService: CancellationAndReturnPolicyService,
    private hostSettingService: HostSettingService,
    private toaster: TosterService,
    private router: Router,
  ) {
    this.cancellationAndReturnPolicyService.getAllList().subscribe(
      data => {
        if (data) this.cancellationAndReturnPolicies = data;
      },
      error => {},
    );

    // this.hostSettingService.getHostSettingCancellationAndReturnPolicy().subscribe(
    //   data => {
    //     if (data)
    //       this.cancellationAndReturnPolicies.forEach(item => {
    //         if (data.includes(item.id)) {
    //           item.selected = true;
    //         }
    //       });
    //   },
    //   error => {},
    // );
  }

  getSelectedValues() {
    // const selectedItems = this.cancellationAndReturnPolicies.filter(item => item.selected);
    // this.hostSettingService.updateHostSetting(selectedItems.map(item => item.id)).subscribe(
    //   data => {
    //     if (data) this.toaster.success('تم حفظ البيانات بنجاح');

    //     this.router.navigate(['/experiments']);
    //   },
    //   error => {},
    // );

    // return;
  }
}
