import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute,  NavigationStart,  Router } from '@angular/router';
import { VacationHomeHostService, VacationHomeStatus } from '@proxy/vacation-homes';
import {  SessionStateService } from '@abp/ng.core';
import { DatePipe } from '@angular/common'; // Import DatePipe
@Component({
  selector: 'app-add-edit-holiday-home',
  templateUrl: './add-edit-holiday-home.component.html',
  styleUrl: './add-edit-holiday-home.component.scss',
  providers: [DatePipe], // Add DatePipe to providers
})
export class AddEditHolidayHomeComponent implements OnInit, OnDestroy {
  id?: number = null;
  lang = this.sessionState.getLanguage();
  vacationHome: any;
  steps: number = 9;
  currentStep: number = 0;
  constructor(
    public holidayHomeService: VacationHomeHostService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionState: SessionStateService,
  ) {
    router.events.subscribe(event => {
      let ev: any = event;
      if (ev?.routerEvent && ev.url === ev.urlAfterRedirects) {
        this.currentStep = Number(sessionStorage.getItem('currentStep')) || 0;
      }
    });
  }

  ngOnInit(): void {
    this.id =Number(this.route.snapshot.paramMap.get('id'))
    if(this.id){

      this.GetData(this.id,true)
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if the event is for back navigation by inspecting the previous state
        console.log('Navigation started, back or forward button pressed');
        // Your custom logic here
      }
    });
  }
  regionId
  //get data by Id
  private GetData(id: any, firstLoad: boolean = false) {
    this.holidayHomeService.getWithNavigationProperties(Number(id)).subscribe((data: any) => {
      this.vacationHome = data.vacationHome;
       if(this.vacationHome.vacationHomeStatus===VacationHomeStatus.UnderReview)
            {
              this.router.navigate(['/holiday-homes/view-holiday-home',id]);
            }
      if(data.region) this.regionId = data.region.id
      if (firstLoad) {
        this.currentStep = this.vacationHome.currentStep ? this.vacationHome.currentStep - 1  : 0;

        if(this.currentStep===0)
          {
           this.currentStep=1
          }
          if(this.vacationHome.currentStep===10 && this.vacationHome.vacationHomeStatus===VacationHomeStatus.Accepted)
          {
           this.currentStep=0
          }


      }

    });
  }



  goNext(step:string){
    this.currentStep = Number(step);
    this.saveCurrentStep();
  }
  //save step
  private saveCurrentStep() {
    //debugger
    this.GetData(this.id.toString());
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('currentStep');
    localStorage.removeItem(this.vacationHome?.id?.toString() ?? '');
  }
}
