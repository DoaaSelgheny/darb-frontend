import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserType } from '@proxy/shared/enums';
import { SuccessComponent } from '../../shared/success/success.component';

@Component({
  selector: 'app-guest-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
  imports:[SuccessComponent],
  standalone: true,
})
export class GuestSuccessComponent {
  userType = UserType.Guest;
}
