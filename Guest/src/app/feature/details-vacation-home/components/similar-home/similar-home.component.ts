import { CommonModule } from '@angular/common';
import {  Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRelatedVacationHomesInputForGuest, GetVacationHomeDetailsForGuestResponseDto, GetVacationHomeListItemForGuestDto, VacationHomeGuestService } from '@proxy/vacation-homes';
import { VacationHomeItemComponent } from 'src/app/feature/explore/components/vacation-home-item/vacation-home-item.component';
import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-similar-vacation-home',
  standalone: true,
  imports: [UiComponentsModule, CommonModule, VacationHomeItemComponent],
  templateUrl: './similar-home.component.html',
  styleUrl: './similar-home.component.scss'
})
export class SimilarVacationHomeComponent implements OnInit{
  id:number
  @Input() vacationId: number;
  @Input() cityId: number;
  @Input() typeId: number;

  homes:GetVacationHomeListItemForGuestDto[]
  vacationHome: GetVacationHomeDetailsForGuestResponseDto = null;

  constructor(    private vacationHomeService: VacationHomeGuestService,
    private route: ActivatedRoute,

  ){
    
  }
 
  ngOnInit(): void { 
    this.id = this.vacationId ? this.vacationId : +this.route.snapshot.params['id'];
    if(this.cityId && this.typeId){
      let input :GetRelatedVacationHomesInputForGuest= {
        vacationHomeId:this.id,
        cityId:this.cityId,
        vacationHomeTypeId:this.typeId,
        maxResultCount:4
      }
      this.vacationHomeService.getRelatedVacationHomesPaginated(input).subscribe({
        next:next=>{
          this.homes=next.items
        }
      })
    }else{

      this.vacationHomeService.getDetails(this.id).subscribe(data => {
        this.vacationHome = data;
        let input :GetRelatedVacationHomesInputForGuest= {
          vacationHomeId:this.id,
          cityId:this.vacationHome.city.id,
          vacationHomeTypeId:this.vacationHome.vacationHome.vacationHomeTypeId,
          maxResultCount:4
        }
        this.vacationHomeService.getRelatedVacationHomesPaginated(input).subscribe({
          next:next=>{
            this.homes=next.items
          }
        })
      });
    }
   
 
  }
}
