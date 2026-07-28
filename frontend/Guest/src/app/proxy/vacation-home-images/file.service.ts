import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { BlobDto, GetBlobRequestDto, SaveBlobInputDto } from '../files/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { IActionResult } from '../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  apiName = 'Default';
  

  getBlob = (input: GetBlobRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'GET',
      url: '/api/app/file/blob',
      params: { name: input.name },
    },
    { apiName: this.apiName,...config });
  

  getFileByInput = (input: GetBlobRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/api/app/file/file',
      params: { name: input.name },
    },
    { apiName: this.apiName,...config });
  

  saveBlob = (input: SaveBlobInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, BlobDto>({
      method: 'POST',
      url: '/api/app/file/save-blob',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  saveFile = (file: IFormFile, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/file/save-file',
      body: file,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
