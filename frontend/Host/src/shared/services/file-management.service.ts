import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  constructor() { }
  base64ToBlob(base64: string, contentType: string): Blob {
    const sliceSize = 512;
    const byteCharacters = atob(base64);
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);
  
    for (let sliceIndex = 0; sliceIndex < slicesCount; sliceIndex++) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);
      const byteCharactersSlice = byteCharacters.slice(begin, end);
      const byteNumbers = new Array(byteCharactersSlice.length);
  
      for (let i = 0; i < byteCharactersSlice.length; i++) {
        byteNumbers[i] = byteCharactersSlice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays[sliceIndex] = byteArray;
    }
  
    return new Blob(byteArrays, { type: contentType });
  }
  convertBlobToPdf(blob:Blob,file:any){
    
    // Create a link element
     const link = document.createElement('a');
     link.href = window.URL.createObjectURL(blob);
     link.download = file.name; // Specify the filename

     // Append the link to the body and trigger click
     document.body.appendChild(link);
     link.click();

     // Clean up
     document.body.removeChild(link);
     window.URL.revokeObjectURL(link.href);
  }
  
}
