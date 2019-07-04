import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-map-nav',
  templateUrl: './map-nav.component.html',
  styleUrls: ['./map-nav.component.css']
})
export class MapNavComponent implements OnInit {

  cities: SelectItem[];

    selectedCity: string;

    constructor() {
        this.cities = [];
        this.cities.push({label:'Moscow', value:'1'});
        this.cities.push({label:'Istanbul', value:'2'});
        this.cities.push({label:'Berlin', value:'3'});
        this.cities.push({label:'Paris', value:'4'});
    }

   
  ngOnInit() {
  }

  mapCenter = [-73.95, 40.702];
  basemapType = 'satellite';
  mapZoomLevel = 12;

  mapLoadedEvent(status: boolean) {
    console.log('The map loaded: ' + status);
  }

}
