import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { environment, GUEST_URL } from 'src/environments/environment';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, NzSelectModule, UiComponentsModule, NzIconModule, FormsModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  redirectToHost() {
    window.location.href = GUEST_URL + '/host-landing';
  }
}
