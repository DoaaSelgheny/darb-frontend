import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperienceGuestService, GetExperienceDetailsForGuestResponseDto,GetExperienceListItemForGuestDto } from '@proxy/experiences';
import { VacationHomeItemComponent } from 'src/app/feature/explore/components/vacation-home-item/vacation-home-item.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-similar-home',
  standalone: true,
  imports: [UiComponentsModule, CommonModule, VacationHomeItemComponent],
  templateUrl: './similar-home.component.html',
  styleUrl: './similar-home.component.scss'
})
export class SimilarHomeComponent implements OnInit{
  id:number
  homes:GetExperienceListItemForGuestDto[]
  experience: GetExperienceDetailsForGuestResponseDto = null;
  @Input() experienceId: number;
  @Input() cityId: number;
  @Input() typeId: number;

  constructor(    private experienceService: ExperienceGuestService,
    private route: ActivatedRoute,

  ){

  }

  ngOnInit(): void {
    console.log()
     if(this.cityId && this.typeId){
          let input = {
            experienceId:this.experienceId ?this.experienceId:this.id ,
            cityId:this.cityId,
            experienceTypeId:this.typeId,
            maxResultCount:4
          }
          this.experienceService.getRelatedVacationHomesPaginated(input).subscribe({
            next:next=>{
              this.homes=next.items
            }
          })
        }else{
    this.id = this.experienceId ? this.experienceId : +this.route.snapshot.params['id'];
    this.experienceService.getDetails(this.id).subscribe(data => {
      this.experience = data;
      let input = {
        experienceId:this.id,
        cityId:this.experience.city.id,
        experienceTypeId:this.experience.experience.experienceTypeId,
        maxResultCount:4
      }
      this.experienceService.getRelatedVacationHomesPaginated(input).subscribe({
        next:next=>{
          this.homes=next.items
        }
      })
    });
   
  }
  }
}
