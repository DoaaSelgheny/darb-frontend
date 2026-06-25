import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-host-with-us',
  templateUrl: './host-with-us.component.html',
  styleUrl: './host-with-us.component.scss',
})
export class HostWithUsComponent {
  constructor(
    private router: Router,){}
  loginToHost() {
    let url = environment.hostUrl + '/auth/login/?no-email';

    window.location.href = url;
  }
  goToHostLanding(){
    this.router.navigate(['/host-landing'])
  }
}
