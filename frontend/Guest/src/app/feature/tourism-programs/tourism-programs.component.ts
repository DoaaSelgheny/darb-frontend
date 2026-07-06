import { Component, OnInit } from '@angular/core';
import { CoverSectionComponent } from './components/cover-section/cover-section.component';
import { HayyakOfferComponent } from './components/hayyak-offer/hayyak-offer.component';
import { SaidAboutUsComponent } from './components/said-about-us/said-about-us.component';
import { ExperiencesTripsComponent } from './components/experiences-trips/experiences-trips.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tourism-programs',
  standalone: true,
  imports: [
    CoverSectionComponent,
    HayyakOfferComponent,
    SaidAboutUsComponent,
    ExperiencesTripsComponent,
    ContactUsComponent,
  ],
  templateUrl: './tourism-programs.component.html',
  styleUrl: './tourism-programs.component.scss',
})
export class TourismProgramsComponent implements OnInit {
  constructor(private router: ActivatedRoute) {}
  ngOnInit(): void {
    const request = this.router.snapshot.queryParams['request'];
    if (request) {
      this.scrollToComponent();
    }
  }

  scrollToComponent() {
    setTimeout(() => {
      const targetElement = document.getElementById('contactUs');
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }
}
