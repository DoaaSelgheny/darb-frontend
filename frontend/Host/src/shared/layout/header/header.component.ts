import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationItemComponent } from '../../../app/feature/notifications/components/notification-item/notification-item.component';
import { AuthService, ConfigStateService, LocalizationService } from '@abp/ng.core';
import { environment } from 'src/environments/environment';
import { ProfileService } from '@proxy/profiles';
import { AccountVerificationStatus } from '@proxy/account-verifications/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [NotificationItemComponent, SharedModule, CommonModule, RouterModule],
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpenMenu: boolean = false;
  status = AccountVerificationStatus;
  @Output() openMenu: EventEmitter<any> = new EventEmitter();
  isShowSwitch: boolean = false;
  isSiteLangauageArabic = true;
  userVerificationInfo: any;
  isAccountVerification: boolean;
  loginToGuest() {
    // let url = 'https://hyyak.com/auth/login?lang='+this.localizationService.currentLang;
    let url = environment.guestUrl; //+ '/auth/login?lang='+this.localizationService.currentLang;
    window.location.href = url;
  }
  toggleMenu() {
    this.isOpenMenu = true;
    this.openMenu.emit(this.isOpenMenu);
  }
  currentUser: any;
  constructor(
    private config: ConfigStateService,
    private profileService: ProfileService,
    private authService: AuthService,
    private localizationService: LocalizationService,
    private router: Router,
  ) {
    this.currentUser = this.config.getOne('currentUser');
  }

  ngOnInit(): void {
    this.isSiteLangauageArabic = this.localizationService.currentLang == 'ar';
    this.profileService.getUserVerificationInfoDto().subscribe(data => {
      this.userVerificationInfo = data;
      if (this.userVerificationInfo?.status === this.status.Approved) {
        this.isAccountVerification = true;
        localStorage.setItem('isAccountVerification', 'true');
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }
}
