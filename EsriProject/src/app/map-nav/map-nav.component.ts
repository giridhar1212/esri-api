import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-nav',
  templateUrl: './map-nav.component.html',
  styleUrls: ['./map-nav.component.css']
})
export class MapNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mapCenter = [-122.4194, 37.7749];
  basemapType = 'satellite';
  mapZoomLevel = 12;

  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

}
