import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotosService } from './photos/photos.service';

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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES) 
  ],
  providers: [PhotosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
