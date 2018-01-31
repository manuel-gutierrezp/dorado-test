import { SafePipe } from './../pipes/safe.pipe';
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

import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBJTmt3LGBm5CTiO5DUZ4W3O5mTLphaoKY',
  authDomain: 'javebratt-playground.firebaseapp.com',
  databaseURL: 'https://javebratt-playground.firebaseio.com',
  projectId: 'javebratt-playground',
  storageBucket: 'javebratt-playground.appspot.com',
  messagingSenderId: '369908572440'
};

@NgModule({
  declarations: [MyApp, HomePage, ListPage, TabsPage, DynamicContentPage, SafePipe],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, ListPage, DynamicContentPage, TabsPage],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Geofence,
    Geolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InAppBrowser
  ]
})
export class AppModule {}
