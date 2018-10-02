import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';


import { HomeComponent } from './../app/home/home.component';
import { ProfileComponent } from './../app/profile/profile.component';
import { SearchComponent } from './../app/search/search.component';
import { IframeComponent } from './../app//iframe/iframe.component';
import { OtherNewsComponent } from './other-news/other-news.component';
import { LogoutComponent } from './logout/logout.component';
import { SensitivitySettingComponent } from './sensitivity-setting/sensitivity-setting.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'search/:q',
    component: SearchComponent
  },
  {
    path: 'iframe/:id',
    component: IframeComponent
  },
  {
    path: 'other',
    component: OtherNewsComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'sensitivity-setting',
    component: SensitivitySettingComponent
  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
