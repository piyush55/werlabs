import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PhotosService {

  apiUrl = 'https://api.flickr.com/services/rest';
  
  constructor(private http: Http) { }

  getPhotos(): Observable<void> {
    let params = new URLSearchParams();
    params.set('method', 'flickr.photos.search');
    params.set('api_key', 'f4d36d60eaa5285fa7204affa52df465');
    params.set('text', 'cat');
    params.set('format', 'json');
    params.set('nojsoncallback', '1');
    return this.http.get(this.apiUrl, { search: params })
      .map((res:Response) => res.json().photos.photo)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }


}
