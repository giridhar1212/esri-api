import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapNavComponent } from './map-nav/map-nav.component';
import { EsrimapComponent } from './esrimap/esrimap.component';
import { MapserviceService } from './services/mapservice.service';

@NgModule({
  declarations: [
    AppComponent,
    MapNavComponent,
    EsrimapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MapserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
