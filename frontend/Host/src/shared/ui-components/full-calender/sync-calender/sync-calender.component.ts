import { CoreModule } from '@abp/ng.core';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { SharedModule } from 'src/shared/shared.module';
import { UiComponentsModule } from '../../ui-components.module';
import { HostVacationHomeNameDto, SyncCalendarType, VacationHomeHostService } from '@proxy/vacation-homes';
import { GetSyncCalendarResponseDto, SyncCalendarService } from '@proxy/sync-calendars';

@Component({
  selector: 'app-sync-calender',
  standalone: true,
  imports: [UiComponentsModule, RouterModule, CoreModule, SharedModule ],
  templateUrl: './sync-calender.component.html',
  styleUrl: './sync-calender.component.scss'
})
export class SyncCalenderComponent implements OnInit{
    names:HostVacationHomeNameDto[]
    selectedHomeId=null
    copied = false
    link:string
    SyncCalendarType = SyncCalendarType
    syncType:number = SyncCalendarType.Export
    url=null
    externalLinks:GetSyncCalendarResponseDto[]
  constructor(
    private modal: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: any,
    private vacationHostService:VacationHomeHostService,
    private syncCalendarService:SyncCalendarService

  ){
  }
  ngOnInit(): void {
    this.getNames()
    this.getLink(this.data.data)
    this.selectedHomeId = this.data.data
  }
  getNames(){
    this.vacationHostService.getNames().subscribe({
      next:next=>{
        this.names =next

      }
    })
  }
  getSyncType(type:number){
    this.syncType = type
    this.getLink(this.data.data)
  }
  getLink(id:any){
    this.syncCalendarService.getSyncCalendarsListByVacationHomeIdAndSyncCalendarType(id,this.syncType).subscribe({
      next:next=>{
        if(this.syncType == SyncCalendarType.Export){
          this.link = next[0].syncCalendarUrl
          this.externalLinks = null
        }else{
          this.externalLinks = next

        }
      }
    })
  }
  copyToClipboard(number:any)
  {
    navigator.clipboard.writeText(number).then(
      () => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000); // Reset after 2 seconds
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }
  saveCalendar(){
    this.syncCalendarService.importICalendar(this.url,this.data.data).subscribe({
      next:next=>{
        this.getLink(this.data.data)
        this.url =null
      }
    })
  }
  syncLink(id:any){
    this.syncCalendarService.syncThirdPartyCalendarById(id).subscribe({
      next:next=>{
        this.getLink(this.data.data)
      }
    })
  }
  handleSwitchChange(id: number) {
    this.syncCalendarService.toggleSyncCalendarById(id).subscribe(res => {
      this.getLink(this.data.data)
    });
  }
}
