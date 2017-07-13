/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@angular/material';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PhotosService } from '../services/photos.service'
import { PhotosComponent } from './photos.component';

class MockPhotosService {
  public photos: any = { "page":1, "pages":2029, "perpage":100, "total":"202823",
            "photo":
              [
                { "id":"35504939420", "owner":"25198384@N03", "secret":"2c15b5f698", "server":"4304", "farm":5, "title":"Dior", "ispublic":1, "isfriend":0, "isfamily":0 },
                { "id":"35852011396", "owner":"149762420@N02", "secret":"efb241ffdf", "server":"4257", "farm":5, "title":"Detailn\u00ed",  "ispublic":1, "isfriend":0, "isfamily":0 },
                { "id":"35892674745", "owner":"145094655@N06", "secret":"f43ff7ac8a", "server":"4214", "farm":5, "title":"#dogalize Razze cani: il cane Hokkaido, carattere e caratteristiche https:\/\/t.co\/5lUmy8U2TL #dogs #cats #pets https:\/\/t.co\/WL84K6Kjyj, dogalize", "ispublic":1, "isfriend":0, "isfamily":0 }
              ]
            };

  getPhotos(text, page) {
    return Observable.of(this.photos.photo);
  }
}

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule, RouterTestingModule, HttpModule, BrowserAnimationsModule ],
      declarations: [ PhotosComponent ],
      providers: [ { provide: PhotosService, useClass: MockPhotosService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should load search field', async(inject([], () => {
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('label').innerText).toEqual('Search photos by keyword');
      });
  })));

  it('Should list photos', async(inject([], () => {
    component.query = 'nature';
    fixture.detectChanges();
    let searchBtn = fixture.debugElement.query(By.css('.mat-raised-button'));
    searchBtn.triggerEventHandler('click');
    fixture.whenStable()
      .then(() => {
        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        const compiled = fixture.debugElement.nativeElement;
        console.log("compiled==", compiled);
        expect(compiled.querySelector('.mat-grid-tile a').getAttribute("href")).toEqual('/photos/35504939420');
    });
  })));
});
