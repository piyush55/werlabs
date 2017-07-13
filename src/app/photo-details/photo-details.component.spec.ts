/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PhotosService } from '../services/photos.service'
import { PhotoDetailsComponent } from './photo-details.component';

class MockPhotosService {
  public photo: any = {
              "photo": {
                "id":"35852468176", "secret":"da034bf351", "server":"4277", "farm":5, "dateuploaded":"1499932304", "isfavorite":0, "license":"0", "safety_level":"0", "rotation":0, "originalsecret":"3730d8cf37", "originalformat":"jpg",
                "owner":
                  { "nsid":"108482374@N04", "username":"SpecialOlympicsSask", "realname":"Special Olympics Saskatchewan", "location":"", "iconserver":"2851", "iconfarm":3,  "path_alias":"specialolympicssask" },
                "title":
                  {"_content":"_J6A9295" },
                "description":
                  {"_content":""},
                "dates":
                  {"posted":"1499932304", "taken":"2017-06-17 11:12:52", "takengranularity":"0","takenunknown":"0", "lastupdate":"1499932591" },
                  "views":"0", "comments":{"_content":"0"}, "tags":{"tag":[] }
              }, "stat": 'ok'
            };

  getPhoto(photoId) {
    return Observable.of(this.photo);
  }
}

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, RouterTestingModule, HttpModule ],
      declarations: [ PhotoDetailsComponent ],
      providers: [ { provide: PhotosService, useClass: MockPhotosService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    component.id = '35504939420';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load photo detail with title', async(inject([], () => {
    fixture.componentInstance.getPhotoDetails();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('md-card-title h4').innerText).toEqual('_J6A9295');
      });
  })));

  it('Should load photo detail with image', async(inject([], () => {
    fixture.componentInstance.getPhotoDetails();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.mat-card-image').src).toEqual('https://farm5.staticflickr.com/4277/35852468176_da034bf351_z.jpg');
      });
  })));

  it('Should load photo detail with owner image', async(inject([], () => {
    fixture.componentInstance.getPhotoDetails();
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.owner-img').src).toEqual('http://farm3.staticflickr.com/2851/buddyicons/108482374@N04.jpg');
      });
  })));
});
