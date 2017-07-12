import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  private photo: any;
  private id: number;
  
  constructor(private photosService: PhotosService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.id = params.id);
  }

  ngOnInit() {
    this.getPhotoDetails();
  }

  getPhotoDetails() {
    this.photosService.getPhoto(this.id).subscribe(photo => {
      this.photo = photo;
      this.photo['image'] = "https://farm"+this.photo.farm+".staticflickr.com/"+this.photo.server+"/"+this.photo.id+"_"+this.photo.secret+"_z.jpg"
    });
  }

}
