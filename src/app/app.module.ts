import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DynamicContentPage } from '../pages/dynamic-content/dynamic-content';

import { Network } from '@ionic-native/network';
import { Geofence } from '@ionic-native/geofence';
import { Geolocation } from '@ionic-native/geolocation';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapPage } from '../pages/map/map';
import { DynamicPage } from '../pages/dynamic/dynamic';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DynamicContentPage,
    MapPage,
    DynamicPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DynamicContentPage,
    MapPage,
    DynamicPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Geofence,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
