import { Component, OnInit, signal } from '@angular/core';
import { AuthService, LocalizationService, SessionStateService } from '@abp/ng.core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit {
  constructor(private localizationService: LocalizationService) {}
  ngOnInit(): void {}
}
