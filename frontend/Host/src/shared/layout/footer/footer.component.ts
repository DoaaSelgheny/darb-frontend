import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  year=new Date().getFullYear()
  openNewWindow(url: string) {
    window.open(url, '_blank');
  }
}
