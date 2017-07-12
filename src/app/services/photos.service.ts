import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class PhotosService {

  private apiUrl: string = 'https://api.flickr.com/services/rest';
    
  constructor(private http: Http) { }

  getPhotos(text, page): Observable<void> {
    let params = new URLSearchParams();
    this.setCommonParams(params);
    params.set('method', 'flickr.photos.search');
    params.set('text', text);
    params.set('page', page.toString());
    return this.http.get(this.apiUrl, { search: params })
      .map((res:Response) => res.json().photos.photo)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getPhoto(photoId): Observable<void> {
    let params = new URLSearchParams();
    this.setCommonParams(params);
    params.set('method', 'flickr.photos.getInfo');
    params.set('photo_id', photoId);
    return this.http.get(this.apiUrl, { search: params })
      .map((res:Response) => res.json().photo)
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  setCommonParams(params) {
    params.set('api_key',environment.apiKey);
    params.set('format', 'json');
    params.set('nojsoncallback', '1');
  }
  
}
