import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ActivatedRoute, Router } from '@angular/router';
import { HostVacationHomeNameDto, VacationHomeHostService } from '@proxy/vacation-homes';
import { ReservationsHostService, VacationHomeCalendarDto } from '@proxy/reservations';
import { DayAvailabilityStatus, ReservationStatus } from '@proxy/reservation-users';
import { SharedModule } from 'src/shared/shared.module';
import esLocale from '@fullcalendar/core/locales/es';
import arLocale from '@fullcalendar/core/locales/ar';
import { LocalizationService } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SyncCalenderComponent } from './sync-calender/sync-calender.component';
import { SyncCalendarService } from '@proxy/sync-calendars';
import { LookupDto } from '@proxy/shared';

@Component({
  selector: 'app-full-calender',
  standalone: true,
  imports: [FullCalendarModule, CommonModule,SharedModule],
  templateUrl: './full-calender.component.html',
  styleUrl: './full-calender.component.scss',
})
export class FullCalenderComponent implements AfterViewInit,OnInit {
  selectedDates: { dateStr: string; index: number }[] = [];
  @ViewChild(FullCalendarComponent) calendarComponent: FullCalendarComponent | undefined;
  data = [];
  lang=this.localizationService.currentLang;
  reservationStatusEnum = ReservationStatus
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: '',
      center: 'prev,title,next',
      right: '',
    },

    initialView: 'dayGridMonth',
    events: this.data, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    fixedWeekCount:false, // auto no of weeks per month
    validRange: {
      start: this.getSixMonthsBefore(),
      end: this.getSixMonthsAfter(),
    },
    datesSet: this.updateDisabledCellStyles.bind(this), //disable days before today
    themeSystem: 'bootstrap5', // responsive
    dateClick: this.handleDateClick.bind(this),
    locales: [ esLocale, arLocale ],
    locale: this.lang ==='ar' ? 'ar' : 'en',
  });
  id:number
  reservationDetail:VacationHomeCalendarDto
  names:HostVacationHomeNameDto[]
  selectedId = null
  DayAvailabilityStatusEnum = DayAvailabilityStatus
  isVisibleSaveAndExit:boolean = false
  syncData:any
  syncDataId=null
  constructor(
    private route:ActivatedRoute,
    private service:ReservationsHostService,
    private vacationHostService:VacationHomeHostService,
     private localizationService:LocalizationService,
     private toaster:ToasterService,
     private modalService: NzModalService,
       private syncCalendarService:SyncCalendarService,
       private router:Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe({
      next:next=>{
        this.id=+next['id']

      }
    })
    this.getNames()
    this.selectedId = +this.id
    this.getCalendarDetails()
    this.getSyncDropDown()
  }
  selectedOccupiedIds=[]
  doaa(id:any){
    console.log('Clicked doaa:', id);
    const index = this.selectedOccupiedIds.indexOf(id);

  if (index === -1) {
    this.selectedOccupiedIds.push(id); // Add if not selected
  } else {
    this.selectedOccupiedIds.splice(index, 1); // Remove if already selected
  }
  }
  getCalendarDetails(){
    console.log(this.syncDataId,this.id)
    this.service.getVacationHomeCalendarByFilter(
      {vacationHomeId:this.id,
        syncCalendarId:this.syncDataId
      }
    ).subscribe({
      next:next=>{
        this.reservationDetail = next
        this.data =  this.reservationDetail.vacationHomeCalendarItems.map(event => ({
          id: event.id,
          start: new Date(event.from),
          end: event.to ? this.addOneDay(event.to) :null, // Ensure the date is a valid Date object
          extendedProps: { status: event.reservationStatus,thirdPartyName:event.thirdPartyName } // Keep isBusy for styling
        }));

        this.calendarOptions.set({ ...this.calendarOptions(), events: this.data });
        this.updateDisabledCellStyles()
      }
    })

  }
  getSixMonthsBefore(): string {
    const today = new Date();
    today.setMonth(today.getMonth() - 5);
    today.setDate(1); // Start from the first day of that month
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  getSixMonthsAfter(): string {
    const today = new Date();
    today.setMonth(today.getMonth() + 6);
    today.setDate(1); // Move to the first day of the future month
    today.setMonth(today.getMonth() + 1); // Jump to next month
    today.setDate(0); // Go back to the last day of the previous month
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }

  changeHome(id:any){
    this.selectedId = id
    this.selectedDates = []
    this.getCalendarDetails()

  }
  addOneDay(dateStr: string): Date {
    let date = new Date(dateStr);
    date.setDate(date.getDate()); // Add 1 day
    return date;
  }
  getNames(){
    this.vacationHostService.getNames().subscribe({
      next:next=>{
        this.names =next

      }
    })
  }
  getSyncDropDown(){
    this.syncCalendarService.getThirdPartyNamesByVacationHomeIdByVacationHomeId(this.id).subscribe({
      next:next=>{
        this.syncData =next

      }
    })
  }
  ngAfterViewInit() {
    if (!this.calendarComponent) {
      console.error('FullCalendar component not found');
    }
  }

  // Handle date click: select or deselect a day
  handleDateClick(dateInfo: any) {
    console.log("dateeeeInfooooooo",dateInfo)
    const today = new Date().toISOString().split('T')[0];
    const dateStr = dateInfo.dateStr;

    if (dateStr < today) {
      console.warn('Cannot select past dates!');
      return; // Stop function execution for past dates
    }

    // Toggle selection
    const existingIndex = this.selectedDates.findIndex(d => d.dateStr === dateStr);

    if (existingIndex > -1) {
      this.selectedDates.splice(existingIndex, 1);
    } else {
      this.selectedDates.push({
        dateStr: dateStr,
        index: this.selectedDates.length + 1,
      });
    }

    console.log('Selected Dates:', this.selectedDates);
    this.updateCellStyles(); // Apply styles to selected dates
    this.updateDisabledCellStyles()
  }
  //disabled dayes before today
  updateDisabledCellStyles() {
    setTimeout(() => {
      const today = new Date().toISOString().split('T')[0];
      const cells = document.querySelectorAll('.fc-daygrid-day');

      cells.forEach(cell => {
        const cellDate = (cell as HTMLElement).dataset.date;
        if (cellDate) {
          const cellElement = cell as HTMLElement;

          if (cellDate < today) {
            // Keep disabled days styled, even after re-render
            cellElement.style.pointerEvents = 'none';
            cellElement.style.opacity = '0.5';
            cellElement.style.backgroundColor = '#E5E7EB';
          }
        }
      });
    }, 0);
  }

  // style to selected data
  updateCellStyles() {
    const cells = document.querySelectorAll('.fc-daygrid-day');
    cells.forEach(cell => {
      const cellDate = (cell as HTMLElement).dataset.date;
      if (cellDate) {
        const isSelected = this.selectedDates.some(d => d.dateStr === cellDate);
        const cellElement = cell as HTMLElement;

        if (isSelected) {
          cellElement.style.position = 'relative';
          cellElement.style.background = 'transparent';

          // Check if a badge already exists before adding a new one
          let existingBadge = cellElement.querySelector('.day-badge');
          if (!existingBadge) {
            const badge = document.createElement('span');
            badge.className = 'day-badge';
            badge.style.backgroundColor = '#60A5FA';
            badge.style.color = 'white';
            badge.style.position = 'absolute';
            badge.style.top = '22px';
            badge.style.padding = '5px';
            badge.style.fontSize = '12px';
            badge.style.width = '100%';
            badge.style.height = '23px';

            cellElement.appendChild(badge);
          }
        } else {
          let existingBadge = cellElement.querySelector('.day-badge');
          if (existingBadge) {
            existingBadge.remove();
          }

          cellElement.style.backgroundColor = ''; // Reset background color
        }
      }
    });
  }

  typeOfSelected :number
  addEventsToSelectedDates(type:number) {
    // Ensure calendar instance exists
    if (!this.calendarComponent) {
      console.error('FullCalendar component not found');
      return;
    }
    if(type === this.DayAvailabilityStatusEnum.Occupied){

      let params = {
        vacationHomeId: this.id,
        availabilityStatus: type,
        occupiedDates: this.selectedDates.map(d => d.dateStr),
        freeReservationIds:[0]
      }
      this.service.toggleDayAvailabilityByRequest(params).subscribe({
        next:next=>{
          this.isVisibleSaveAndExit = false
          this.getCalendarDetails()
          this.selectedDates = []
          this.selectedOccupiedIds=[]
          this.modalService.closeAll()

        },error:error =>{
          this.toaster.error(
            this.localizationService.instant(error),
          );
          this.selectedDates = []
          this.selectedOccupiedIds=[]
          this.modalService.closeAll()

        }
      })
    }else{
      let params = {
        vacationHomeId: this.id,
        availabilityStatus: type,
        occupiedDates: null,
        freeReservationIds:this.selectedOccupiedIds
      }
      this.service.toggleDayAvailabilityByRequest(params).subscribe({
        next:next=>{
          this.isVisibleSaveAndExit = false
          this.getCalendarDetails()
          this.selectedDates = []
          this.selectedOccupiedIds=[]
          this.modalService.closeAll()

        },error:error =>{
          this.toaster.error(
            this.localizationService.instant(error),
          );
          this.selectedDates = []
          this.selectedOccupiedIds=[]
          this.modalService.closeAll()

        }
      })
    }


    // Clear selection after adding events
    this.selectedDates = [];
    this.selectedOccupiedIds=[]
    this.updateCellStyles();
  }
  addSyncCalendar(){
    this.modalService.create({
      nzWidth: 600,
      nzTitle: this.localizationService.instant('::calendar:sync'),
      nzContent: SyncCalenderComponent,
      nzData:{data:this.id,name:this.reservationDetail.name},
      nzFooter: null
      }).afterClose.subscribe(selectedDate => {
        this.getCalendarDetails()
      });
  }
  goToReserve(id:any){
    console.log("Go to Reserveeeeeeeeeeeee",id)
    this.router.navigate(['/reservation-details/', id,1,false])
  }
}
