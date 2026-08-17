import {
  AuthService,
  ConfigStateService,
  LocalizationService,
  SessionStateService,
} from '@abp/ng.core';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { menu } from '../menu';
import { ProfileService } from 'src/app/feature/profile/profiles';
import { ConfigurationService } from './configuration/configuration.service';
import { ContactUsComponent } from 'src/app/feature/contact-us/contact-us.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { YakeenVerificationType } from 'src/app/feature/profile/account-verifications/enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerTransparent: boolean = false;
  heroHeader: boolean = false;
  isScrolled: boolean = false;
  menu = [];
  menuHost = [];
  isOpenMenu: boolean = false;
  currentUser: any;
  isShowSwitch: boolean = false;
  isVisibleSwitchToHost: boolean = false;
  isSiteLangauageArabic = true;
  profileData: any;
  yakeenVerificationType = YakeenVerificationType;
  @Input() isHost: boolean = true;
  lang = this.sessionState.getLanguage();
  @Output() scrollToSection: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionState: SessionStateService,
    public authService: AuthService,
    private config: ConfigStateService,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private configurationService: ConfigurationService,
    private localizationService: LocalizationService,

    private modalService: NzModalService,
  ) {
    this.lang == 'en' ? (this.menu = this.menuEn) : (this.menu = this.menuAr);
    this.lang == 'en' ? (this.menuHost = this.menuHostEn) : (this.menuHost = this.menuHostAr);

    this.router.events.subscribe(event => {
      this.headerTransparent = route.children[0]?.snapshot.data['headerTransparent'];
      this.heroHeader = route.children[0]?.snapshot.data['heroHeader'];
      if (event instanceof NavigationEnd) {
        this.isVisibleSwitchToHost = false;
        this.isScrolled = false;
      }
    });
    this.currentUser = this.config.getOne('currentUser');


    this.isShowSwitch = this.currentUser.phoneNumber?.startsWith('+963');
  }

  // Whether the hero header should currently render its light (white text) state -
  // only relevant before the user scrolls past the hero.
  get heroHeaderIsTransparent(): boolean {
    return this.heroHeader && !this.isScrolled;
  }

  // A single exhaustive class string per state - NgClass resolves a shared class token
  // by whichever object key evaluates it last, so headerTransparent/heroHeader can't
  // share tokens (top-0, w-full, ...) across separate keys without one silently winning.
  get headerPositionClasses(): string {
    if (this.headerTransparent) {
      return '!bg-white !absolute inset-x-0 top-0 w-full z-20 shadow-none';
    }
    if (this.heroHeader) {
      return 'fixed inset-x-0 top-0 w-full' + (this.isScrolled ? ' shadow-greyBox' : '');
    }
    return 'bg-white shadow-greyBox';
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.heroHeader) {
      this.isScrolled = window.scrollY > 60;
    }
  }

  ngOnInit(): void {
    this.isSiteLangauageArabic = this.localizationService.currentLang == 'ar';
    console.log(this.currentUser);
    
    if (this.currentUser.isAuthenticated) {
      alert(this.currentUser.isAuthenticated);
      this.profileService.getGuestProfile().subscribe(res => {
        this.profileData = res;
      });
    }
  }

  login() {
    this.authService.navigateToLogin();
  }
  logOut() {
    //Previously did nothing
    //Now it revokes the access/refresh token
    this.authService.logout();
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
  }
  linktoHome(id) {
    this.router.navigate(['/'], { onSameUrlNavigation: 'reload' });
    this.scrollToSection.emit(id);
  }

  loginToHost() {
    let url = environment.hostUrl + '/account-verification';
    window.location.href = url;
  }
  goToHost() {
    this.configurationService.isAllowSwitchToHost().subscribe(data => {
      if (data) {
        let url = environment.baseUrl + '/host-landing';
        window.location.href = url;
      } else {
        this.isVisibleSwitchToHost = true;
      }
    });
  }
  goToHostLanding() {
    this.router.navigate(['/host-landing']);
  }
  refresh() {
    window.location.reload();
  }
  menuAr = [
    {
      name: 'عن درب',
      path: '/about-hyyak',
      selected: false,
    },
    {
      name: 'بيوت العطلات',
      path: 'tab1',
      selected: false,
    },
    {
      name: 'التجارب',
      path: 'tab2',
      selected: false,
    },
    {
      name: 'درب للأعمال',
      path: '/hyyak-business',
      selected: false,
    },

    {
      name: 'الأسئلة الشائعة',
      path: '/faq',
      selected: false,
    },
    {
      name: 'اتصل بنا',
      path: 'contact',
      selected: false,
    },
  ];
  menuEn = [
    {
      name: ' About Darb  ',
      path: '/about-hyyak',
      selected: false,
    },
    {
      name: 'Darb Business',
      path: '/hyyak-business',
      selected: false,
    },
    {
      name: 'Vacation home',
      path: 'tab1',
      selected: false,
    },
    {
      name: 'Experience',
      path: 'tab2',
      selected: false,
    },
    {
      name: 'Questions Answers',
      path: '/faq',
      selected: false,
    },
    {
      name: 'Contact us',
      path: 'contact',
      selected: false,
    },
  ];

  menuHostEn = [
    {
      name: 'Guests',
      path: '/',
      selected: false,
    },
    {
      name: 'Darb Business',
      path: '/hyyak-business',
      selected: false,
    },
  ];
  menuHostAr = [
    {
      name: 'الضيوف',
      path: '/',
      selected: false,
    },
    {
      name: 'درب للأعمال',
      path: '/hyyak-business',
      selected: false,
    },
  ];
  goToPath(path: string) {
    if (path === 'tab1') {
      // this.router.navigate(['/explore',{type:1}])
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/explore', { type: 1 }]);
      });
    } else if (path === 'tab2') {
      // this.router.navigate(['/explore',{type:2}])
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/explore', { type: 2 }]);
      });
    } else if (path === 'contact') {
      this.modalService.create({
        nzFooter: null,
        nzWidth: 700,
        nzClassName: 'rounded-xl',
        nzContent: ContactUsComponent,
      });
    } else {
      this.router.navigate([path]);
    }
  }
}
