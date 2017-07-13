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
  private message: any = '';
  
  constructor(private photosService: PhotosService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.id = params.id);
  }

  ngOnInit() {
    this.getPhotoDetails();
  }

  getPhotoDetails() {
    this.photosService.getPhoto(this.id).subscribe(data => {
      if(data.stat == 'ok') {
        this.photo = data.photo;
        this.photo['image'] = "https://farm"+this.photo.farm+".staticflickr.com/"+this.photo.server+"/"+this.photo.id+"_"+this.photo.secret+"_z.jpg";
        let owner = this.photo.owner;
        this.photo.owner['image'] = "http://farm"+owner.iconfarm+".staticflickr.com/"+owner.iconserver+"/buddyicons/"+owner.nsid+".jpg";
      }
      else {
        if(data.message) {
          this.message = data.message;
        }
      }
    });
  }

}
