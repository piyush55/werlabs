import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent {

  private photos: any = [];
  private query: string = '';
  private errorMessage: string = '';
  private page: number = 1;

  constructor(private photosService: PhotosService, public snackBar: MdSnackBar) { }

  searchPhotos() {
    this.errorMessage = '';
    if(this.query) {
      let snackBarRef = this.snackBar.open('Searching...');
      this.photosService.getPhotos(this.query, this.page).subscribe(photos => {
        this.photos = this.photos.concat(photos);
        for (let photo of this.photos) {
          photo['image'] = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg"
        }
        snackBarRef.dismiss();
      });
    }
    else {
      this.errorMessage = 'Input is required';
    }
  }

  getPhotos() {
    this.page = 1;
    this.photos = [];
    this.searchPhotos();
  }

  onScroll() {
    this.page = this.page + 1;
    this.searchPhotos();
	}
}
