import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { UploadTypes } from './upload-type.enum';

@Component({
  selector: 'app-upload',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent implements OnInit {
  @Input() uploadAction = 'api';
  @Output() handleChange: EventEmitter<NzUploadChangeParam> = new EventEmitter();
  @Input() attachment?: any;
  @Input() sizeMB: number = 2;
  @Input() label: string = 'اضف صوره';
  @Input() uploadType: UploadTypes = UploadTypes.image;
  @Input() accept: string = 'image/*';
  uploadTypesEnum = UploadTypes;
  img: string | undefined;
  uploadLoading: boolean = false;
  uploadProgress: number | any = 0;
  constructor(private message: NzMessageService) {}
  ngOnInit(): void {}

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isLt2M = file.size! / 1024 / 1024 < this.sizeMB;
      if (!isLt2M) {
        this.message.error(`يجب أن يكون حجم الملف أقل من ${this.sizeMB} ميجابايت!`);
        observer.complete();
        return;
      }
      observer.next(isLt2M);
      observer.complete();
    });

  handleChangeEvent(event: NzUploadChangeParam) {
    this.uploadProgress = Math.round(event.file.percent as any);
    this.handleChange.emit(event);
    const status = event.file.status;
    this.uploadLoading = true;
    if (status == 'done') {
      this.uploadLoading = false;
      this.img = event.file.thumbUrl;
    }
    if (status == 'error') {
      this.uploadLoading = false;
    }
  }

  onProgress(event: any) {
  }
}
