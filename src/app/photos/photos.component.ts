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
  
  constructor(private photosService: PhotosService, public snackBar: MdSnackBar) { }

  searchPhotos() {
    this.errorMessage = '';
    if(this.query) {
      let snackBarRef = this.snackBar.open('Searching...');
      this.photosService.getPhotos(this.query).subscribe(photos => {
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

  onScroll() {
    this.searchPhotos();
	}
}
