import { Component,  OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { loadModules } from 'esri-loader';
import { MapserviceService } from '../services/mapservice.service';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esrimap.component.html',
  styleUrls: ['./esrimap.component.css']
})
export class EsrimapComponent implements OnInit {

  @Output() mapLoadedEvent = new EventEmitter<boolean>();

  // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  /**
   * _zoom sets map zoom
   * _center sets map center
   * _basemap sets type of map
   * _loaded provides map loaded status
   */
  private _zoom = 10;
  private _center: Array<number> = [0.1278, 51.5074];
  private _basemap = 'streets';
  private _loaded = false;

  public mapView: __esri.MapView;
  get mapLoaded(): boolean {
    return this._loaded;
  }

  @Input()
  set zoom(zoom: number) {
    this._zoom = zoom;
  }

  get zoom(): number {
    return this._zoom;
  }

  @Input()
  set center(center: Array<number>) {
    this._center = center;
  }

  get center(): Array<number> {
    return this._center;
  }

  @Input()
  set basemap(basemap: string) {
    this._basemap = basemap;
  }

  get basemap(): string {
    return this._basemap;
  }

  constructor(private msService:MapserviceService) { }

  ngOnInit() {
    this.MapInit()
  }

  public MapInit(){
    return loadModules([
      'esri/Map',
      'esri/layers/FeatureLayer',
      'esri/views/MapView',
      'esri/Graphic',
      'esri/geometry/SpatialReference'
    ])
      .then(([Map,FeatureLayer, MapView, Graphic,SpatialReference]) => {
        var map: __esri.Map = new Map({
          basemap: 'streets'
        });

        this.mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: this._center,
          zoom: 12,
          map: map
        });
       console.log('longitude: '+this._center[0],'latitude: '+this._center[1]);
       const spatialreference : __esri.SpatialReference = new SpatialReference({
        latestWkid:3857,
        wkid:102100
       })
        const pointGraphic: __esri.Graphic = new Graphic({
          geometry: {
            type: 'point',
            longitude: this._center[0],
            latitude: this._center[1],
            spatialReference: spatialreference
          },
          symbol: {
            type: 'simple-marker',
            color: [119, 40, 119],
            outline: {
              color: [255, 255, 255],
              width: 1
            }
          }
        });

        var template = {
          // autocasts as new PopupTemplate()
          title: "{NAME} in {COUNTY}",
          content: [
            {
              // It is also possible to set the fieldInfos outside of the content
              // directly in the popupTemplate. If no fieldInfos is specifically set
              // in the content, it defaults to whatever may be set within the popupTemplate.
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "B12001_calc_pctMarriedE",
                  label: "Married %"
                },
                {
                  fieldName: "B12001_calc_numMarriedE",
                  label: "People Married",
                  format: {
                    digitSeparator: true,
                    places: 0
                  }
                },
                {
                  fieldName: "B12001_calc_numNeverE",
                  label: "People that Never Married",
                  format: {
                    digitSeparator: true,
                    places: 0
                  }
                },
                {
                  fieldName: "B12001_calc_numDivorcedE",
                  label: "People Divorced",
                  format: {
                    digitSeparator: true,
                    places: 0
                  }
                }
              ]
            }
          ]
        };
        
         var featureLayer = FeatureLayer ({
          url:
          "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Marital_Status_Boundaries/FeatureServer/2",
        popupTemplate: template
        })
        
        map.add(featureLayer);
        this.msService.addPoint(pointGraphic);
        this.mapView.graphics.add(this.msService.points[this.msService.points.length - 1]);
        

        this.mapView.when(
          () => {
            if (this.msService.points.length) {
              // add any point graphics stored in the MapStateService
              // from the user's clicks from previous navigations to this app route
              this.mapView.graphics.addMany(this.msService.points);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  }
}
