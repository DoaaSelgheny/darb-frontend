import { CoreModule } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experiences-trips',
  standalone: true,
  imports: [CoreModule],
  templateUrl: './experiences-trips.component.html',
  styleUrl: './experiences-trips.component.scss',
})
export class ExperiencesTripsComponent {}
