import { LocalizationService, SessionStateService } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserType } from '@proxy/shared/enums';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hyyak';

  constructor(
    private router: Router,
    private sessionState: SessionStateService,
    private localizationService: LocalizationService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit(): void {
    if (!this.isAuthenticated()) {
    } else {
      if (localStorage.getItem('userType') == UserType.Guest.toString()) {
        window.location.href = environment.baseUrl;
      } else {
        window.location.href = environment.baseUrl+'/holiday-homes';
      }


    }

  }
  isAuthenticated(): boolean {
    // Example: check token in localStorage

    const token = localStorage.getItem('access_token');
    return !!token; // true if token exists
  }
}
