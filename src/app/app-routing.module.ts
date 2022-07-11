import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { HomeComponent } from './home/home.component';
import { IvvtoolsComponent } from './ivvtools/ivvtools.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },

  { 
    path: 'connect', 
    component: ConnectComponent
  },

  { 
    path: 'ivvtools', 
    component: IvvtoolsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }