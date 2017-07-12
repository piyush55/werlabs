import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotosService } from './services/photos.service';
import { PhotoDetailsComponent } from './photo-details/photo-details.component';

// Define the routes
const ROUTES = [
  {
    path: '',
    redirectTo: 'photos',
    pathMatch: 'full'
  },
  {
    path: 'photos',
    component: PhotosComponent
  },
  {
    path: 'photos/:id',
    component: PhotoDetailsComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    NoopAnimationsModule,
    InfiniteScrollModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
