import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Geolocation } from '@ionic-native/geolocation';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import { Subscription } from 'rxjs/Subscription';
import { Coords } from './declarations/coords.interface';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  browser: InAppBrowserObject;
  locationSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private iab: InAppBrowser,
    private ngZone: NgZone
  ) { }

  ionViewDidEnter(): void {
    this.launchMap();
  }

  launchMap(): void {
    this.browser = this.iab.create(
      'http://locusmap-test.singlehtml.com/',
      '_blank',
      'EnableViewPortScale=yes,closebuttoncaption=Done, toolbar=no, presentationstyle=pagesheet'
    );
    this.browser.on('loadstop').subscribe(_ => {
      this.initTrackingCurrentLocation();
    }, error => console.error(error));

    this.browser.on('exit').subscribe(_ => {
      this.goToAroundMeTab();
    }, error => console.error(error));
  }

  goToAroundMeTab(): void {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
    const aroundMeIndex = 0;
    this.ngZone.run(() => {
      this.navCtrl.parent.select(aroundMeIndex);
    });
  }

  initTrackingCurrentLocation(): void {
    const context = this;

    // Bogotá
    // let offsetCoordsLat = 4.705529454052709;
    // let offsetCoordsLng = -74.03905659914017;

    // Medellín
    let offsetCoordsLat = 6.224849;
    let offsetCoordsLng = -75.574731;

    offsetCoordsLat = 51.468999 - offsetCoordsLat;
    offsetCoordsLng = -0.450903 - offsetCoordsLng;

    setTimeout(() => {
      context.locationSubscription = context.geolocation
        .watchPosition({
          timeout: 30000,
          enableHighAccuracy: true
        })
        .throttleTime(500)
        .map(coordsToCenterMap => {
          const coords: Coords = {
            latitude: coordsToCenterMap.coords.latitude + offsetCoordsLat,
            longitude: coordsToCenterMap.coords.longitude + offsetCoordsLng
          };
          console.log(coords);
          return coords;
        })
        .subscribe(coords => {
          const codeToExecute = `LocusMaps({command:"setPosition", lat:"${coords.latitude}", lng:"${
            coords.longitude
            }", timeout:0})`;

          context.browser.executeScript({
            code: codeToExecute
          });
        });
    }, 10000);
  }
}
