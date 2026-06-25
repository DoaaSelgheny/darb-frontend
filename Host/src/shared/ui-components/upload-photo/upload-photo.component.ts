import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ImageFileType, UploadTypes } from './upload-type.enum';
import { TosterService } from 'src/shared/services/toster.service';
import {  LocalizationService } from '@abp/ng.core';
@Component({
  selector: 'app-upload',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss'],
})
export class UploadPhotoComponent   {

  @Input() uploadAction = 'api';
  @Output() handleChange: EventEmitter<NzUploadChangeParam> = new EventEmitter();
  @Input() attachment?: any;
  @Input() sizeMB: number = 10;
  @Input() label: string =null;
  @Input() uploadType: UploadTypes = UploadTypes.image;
  @Input() accept: string = 'image/*';
  @Input() readOnly: boolean = false;
  @Input() fileList: NzUploadFile[] = [];
  @Input() isShowUploadList: boolean = false;
  @Input() checkDim :boolean=false;
  @Input() hasProgress:boolean = false
  uploadTypesEnum = UploadTypes;
  img: string | undefined;
  uploadLoading: boolean = false;
  uploadProgress: number | any = 0;
  constructor(private toasterService: TosterService,private localizationService: LocalizationService) {}


  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      let acceptedFileType = this.accept;
      acceptedFileType = acceptedFileType.replace('image/*', ImageFileType.IMAGE);
      if (!acceptedFileType.includes(_fileList[0].type)) {
        if(this.localizationService.currentLang == 'ar')
        this.toasterService.error(`يجب ان تكون صيغة الملف ${this.accept}`);
      else if(this.localizationService.currentLang == 'en')
        this.toasterService.error(`The file format must be  ${this.accept}`);
      else
      this.toasterService.error(`文件格式必須是  ${this.accept}`);
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < this.sizeMB;
      if (!isLt2M) {
        if(this.localizationService.currentLang == 'ar')
        this.toasterService.error(`يجب أن يكون حجم الملف أقل من ${this.sizeMB} ميجابايت!`);
        else if(this.localizationService.currentLang == 'en')
          this.toasterService.error(`file size should be less than ${this.sizeMB} mega bytes!`);
        else
        this.toasterService.error(`檔案大小應小於 ${this.sizeMB} 兆位元組`);
        observer.complete();
        return;
      }
      // Create FileReader
    const fileReader = new FileReader();
   // Event handler for successful read
   fileReader.onload = (e: ProgressEvent<FileReader>) => {
if(_fileList[0].type!='application/pdf'){
    const img = new Image();
    img.src = e.target!.result as string;

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      // Check dimensions
      // if (width < 1280 || (height < 960 && this.checkDim)) {
      //   this.showDimensionError();
      //   observer.complete();
      //   return;
      // }

      observer.next(true);
      observer.complete();
    };

    img.onerror = () => {
      this.showDimensionError();
      observer.complete();
    };
  }else{
    observer.next(true);
      observer.complete();
  }
  };

  // Event handler for read error
  fileReader.onerror = (error) => {
    this.toasterService.error('File reading error');
    observer.complete();
  };

  // Start reading the file
  fileReader.readAsDataURL(file as any);
});
  private showDimensionError() {
    if (this.localizationService.currentLang == 'ar') {
      this.toasterService.error('يرجي رفع الصورة بصيغة (PNG أو JPEG أو JPG) بأبعاد   1280*960 بيكسل علي الأقل ');
    } else if (this.localizationService.currentLang == 'en') {
      this.toasterService.error('Please upload the image in (JPG, JPEG, or PNG) format with minimum dimensions of 1280 × 960 pixels');
    } else {
      this.toasterService.error('请上传格式为 (PNG、JPEG 或 JPG)，尺寸至少为 1280*960 像素的图片');
    }
  }
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

  onProgress(event: any) {}
}
