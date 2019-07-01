import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapserviceService {
  private _points: __esri.Graphic[] = [];
  get points() {
    console.log(JSON.stringify(this._points) + 'Points...........')
    return this._points;
  }
  addPoint(point: __esri.Graphic) {
    this.points.push(point);
  }
  constructor() { }
}
