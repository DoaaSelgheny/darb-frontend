import { Component, OnInit } from '@angular/core';
import { LOGIN_PAGE_URL } from 'src/environments/environment';

@Component({
  selector: 'app-external-login-redirect',
  templateUrl: './external-login-redirect.component.html',
  styleUrls: ['./external-login-redirect.component.css'],
  standalone:true
})
export class ExternalLoginRedirectComponent implements OnInit {

  constructor() { }

  ngOnInit() {    
   location.replace(LOGIN_PAGE_URL);
  }

}
