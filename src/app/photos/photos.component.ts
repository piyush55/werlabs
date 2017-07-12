import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: any = [];
  query: string = '';
  
  constructor(private photosService: PhotosService) { }

  ngOnInit() {
  }

  searchPhotos() {
    if(this.query) {
      this.photosService.getPhotos(this.query).subscribe(photos => {
        this.photos = photos;
        for (let photo of this.photos){
          photo['image'] = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg"

        }
      });
    }
  }

 
