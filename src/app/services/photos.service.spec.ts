import { TestBed, async, inject } from '@angular/core/testing';
import { PhotosService } from './photos.service';
import { MaterialModule } from '@angular/material'
import { HttpModule, XHRBackend, Response, ResponseOptions} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('PhotosService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, HttpModule ]
      providers: [PhotosService, { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it('should ...', inject([PhotosService], (service: PhotosService) => {
    expect(service).toBeTruthy();
  }));

  describe('getPhotos()', () => {

    it('should return an array of photos',
      inject([PhotosService, XHRBackend], (photosService, mockBackend) => {
        const mockResponse = {
          "photos":{ "page":1,"pages":2029,"perpage":100,"total":"202823",
            "photo":
              [
                { "id":"35504939420", "owner":"25198384@N03", "secret":"2c15b5f698", "server":"4304", "farm":5, "title":"Dior", "ispublic":1, "isfriend":0, "isfamily":0 },
                { "id":"35852011396", "owner":"149762420@N02", "secret":"efb241ffdf", "server":"4257", "farm":5, "title":"Detailn\u00ed",  "ispublic":1, "isfriend":0, "isfamily":0 },
                { "id":"35892674745", "owner":"145094655@N06", "secret":"f43ff7ac8a", "server":"4214", "farm":5, "title":"#dogalize Razze cani: il cane Hokkaido, carattere e caratteristiche https:\/\/t.co\/5lUmy8U2TL #dogs #cats #pets https:\/\/t.co\/WL84K6Kjyj, dogalize", "ispublic":1, "isfriend":0, "isfamily":0 }
              ]
          }
        };
        mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });
        photosService.getPhotos('dog', 1).subscribe((photos) => {
          expect(photos.length).toBe(3);
          expect(photos[0].id).toEqual('35504939420');
          expect(photos[1].id).toEqual('35852011396');
          expect(photos[2].id).toEqual('35892674745');
        });
    }));
  });


  describe('getPhoto()', () => {
    it('should return a photo with given photoId',
      inject([PhotosService, XHRBackend], (photosService, mockBackend) => {
        const mockResponse = {
          "photo": {
            "id":"35852468176", "secret":"da034bf351", "server":"4277", "farm":5, "dateuploaded":"1499932304", "isfavorite":0, "license":"0", "safety_level":"0", "rotation":0, "originalsecret":"3730d8cf37", "originalformat":"jpg", "owner": { "nsid":"108482374@N04", "username":"SpecialOlympicsSask", "realname":"Special Olympics Saskatchewan", "location":"", "iconserver":"2851", "iconfarm":3,  "path_alias":"specialolympicssask" }, "title":{"_content":"_J6A9295"}, "description":{"_content":""}, "visibility":{"ispublic":1, "isfriend":0, "isfamily":0 }, "dates":{"posted":"1499932304", "taken":"2017-06-17 11:12:52", "takengranularity":"0","takenunknown":"0", "lastupdate":"1499932591" }, "views":"0", "comments":{"_content":"0"}, "notes":{"note":[]},"people":{"haspeople":0}, "tags":{"tag":[] } }
          };
          mockBackend.connections.subscribe((connection) => {
          connection.mockRespond(new Response(new ResponseOptions({
              body: JSON.stringify(mockResponse)
            })));
          });

          photosService.getPhoto('35852468176').subscribe((photo) => {
            expect(photo).toEqual(photo);
          });
      }));
  });
});
