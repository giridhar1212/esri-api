import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapNavComponent } from './map-nav/map-nav.component';

const routes: Routes = [
  {path : 'map', component  : MapNavComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
