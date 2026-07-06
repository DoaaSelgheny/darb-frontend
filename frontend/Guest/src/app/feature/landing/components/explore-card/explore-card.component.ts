import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceType, ReceptionTimeType, ExperienceDatesType } from '@proxy/experiences';

@Component({
  selector: 'app-explore-card',
  templateUrl: './explore-card.component.html',
  styleUrl: './explore-card.component.scss'
})
export class ExploreCardComponent {
@Input() item;
 attendanceTypeEnum = AttendanceType;
  receptionTimeTypeEnum = ReceptionTimeType;
  experienceDatesTypeEnum=ExperienceDatesType;
  constructor(private router:Router) { }
  getImage(item) {
    return item.isExperience ? item.experience?.primaryImage : item?.vacationHome?.primaryImage;
  }
  goToDetails(item){
    if(item.isExperience){

        this.router.navigate(['/experience-details', item.experience.id,])
 
    }else{
      this.router.navigate(['/vacation-home-details', item.vacationHome.id,])

    }
  }
}
