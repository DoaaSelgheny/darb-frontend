import { Component, Input } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';
@Component({
  selector: 'app-map-information',
  standalone: true,
  imports: [SharedModule,GoogleMapsModule,
  ],
  templateUrl: './map-information.component.html',
  styleUrl: './map-information.component.scss'
})
export class MapInformationComponent {
@Input() data: any;
@Input() isVaction: boolean;
center: google.maps.LatLngLiteral = { lat: 24, lng: 46 };
display: google.maps.LatLngLiteral;

markCenter: google.maps.LatLngLiteral = { lat: 24, lng: 46 };
zoom = 12;
ngOnInit(): void {
  setTimeout(() => {
    
    let lat = this.isVaction ? this.data?.vacationHomeSummary.location.lat : this.data?.experienceSummary.location.lat;
    let lng = this.isVaction ? this.data?.vacationHomeSummary.location.lng : this.data?.experienceSummary.location.lng;
    if (lat > 0 && lng > 0) {
      this.center = { lat: lat, lng: lng };
      this.markCenter = { lat: lat, lng: lng };
    }
  }, 1000);
}
openGoogleMaps() {
  let lat = this.isVaction ? this.data?.vacationHomeSummary.location.lat : this.data?.experienceSummary.location.lat;
    let lng = this.isVaction ? this.data?.vacationHomeSummary.location.lng : this.data?.experienceSummary.location.lng;
    
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
  window.open(googleMapsUrl, '_blank');
}
}
