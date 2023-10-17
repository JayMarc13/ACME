import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageUrl: string = '';
  private profilepictureId: string = '';

  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }
}
