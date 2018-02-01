import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Geofence } from '@ionic-native/geofence';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import { Fence } from './declarations/geofences.model';
import { Place } from './declarations/places.model';

import 'rxjs/add/operator/filter';
import { Platform } from 'ionic-angular/platform/platform';

@Component({
  selector: 'page-dynamic-content',
  templateUrl: 'dynamic-content.html'
})
export class DynamicContentPage {

  networkStatus: boolean;
  status: string;
  type: string;
  name: any;
  lat: number | string;
  lng: number | string;
  alt: number | string;
  placesToShow: Place[] = [];
  // tslint:disable-next-line:member-ordering
  places: Place[] = [
    {
      id: 'estacion del metro',
      name: 'Est. Industriales',
      avatar: 'https://www.interacpedia.com/images/cache/width750/companies/14/metro.png',
      description: 'estacion ubicada cerca ciudad del rio en la ciudad de Medellín'
    },
    {
      id: 'Hospital M',
      name: 'Hosp. General',
      avatar: 'http://www.hgm.gov.co/images/HospitalGeneralMedellinLogo.png',
      description: 'Hospital cerca a la estación Exposiciones. del Metro en la ciudad de Medellín'
    },
    {
      id: 'Museo Arte Moderno Medellin',
      name: 'MAMM',
      avatar: 'https://www.pagomio.com/uploads/cache/logo_big/uploads/media/logo/0001/01/57e1a215c5867.jpg',
      description:
        // tslint:disable-next-line:max-line-length
        'MAMM esta dedicado a la investigación, conservación y divulgación en los campos del arte moderno y contemporáneo, así como al desarrollo cultural de la ciudad.'
    },
    {
      id: 'YuxiGlobal',
      name: 'Yuxi Global',
      avatar: 'https://www.interacpedia.com/images/cache/width750/companies/14/metro.png',
      description: 'We love what we do',
      category: 'Bussiness'
    },
    {
      id: 'Geofence 1',
      name: 'Geofence 1',
      avatar: 'http://www.yuxiglobal.com/pages/img/yuxiSign.png',
      description: 'We love what we do'
    },
    {
      id: 'Geofence 2',
      name: 'Geofence 2',
      avatar:
        'https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAfwAAAAJGMzMjBhYzIzLTI3NDAtNGNiZi04Yjk0LTVmNDc2ZjY2ODljYw.png',
      description: 'We love what we do'
    }
  ];
  fences: Fence[] = [
    {
      id: 'estacion del metro',
      latitude: 6.230907,
      longitude: -75.575732,
      radius: 300,
      transitionType: 3,
      notification: {
        id: 1,
        title: 'You crossed a fence',
        text: 'You are close to Estacion Industriales',
        openAppOnClick: true
      }
    },
    {
      id: 'Hospital M',
      latitude: 6.234385,
      longitude: -75.57271,
      radius: 300,
      transitionType: 3,
      notification: {
        id: 1,
        title: 'You crossed a fence',
        text: 'You are close to Hospital General',
        openAppOnClick: true
      }
    },
    {
      id: 'Museo Arte Moderno Medellin',
      latitude: 6.223859,
      longitude: -75.574022,
      radius: 150,
      transitionType: 3,
      notification: {
        id: 1,
        title: 'You crossed a fence',
        text: 'You are close to Arte Moderno',
        openAppOnClick: true
      }
    },
    {
      id: 'YuxiGlobal',
      latitude: 6.224767,
      longitude: -75.574682,
      radius: 250,
      transitionType: 3,
      notification: {
        id: 1,
        title: 'You crossed a fence',
        text: 'You are close to Yuxi Global',
        openAppOnClick: true
      }
    },
    {
      id: 'Geofence 2',
      latitude: 4.705588263758575,
      longitude: -74.03993636369705,
      radius: 150,
      transitionType: 3,
      notification: {
        id: 1,
        title: 'You crossed a Geofence 2',
        text: 'You are close to Geofence 2',
        openAppOnClick: true
      }
    },
    {
      id: 'Geofence 1',
      latitude: 4.705695190483763,
      longitude: -74.04174953699112,
      radius: 100,
      transitionType: 3,
      notification: {
        id: 1,
        title: 'You crossed a Geofence 1',
        text: 'You are close to Geofence 1',
        openAppOnClick: true
      }
    }
  ];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geofence: Geofence,
    private ngZone: NgZone,
    private network: Network,
    private geolocation: Geolocation,
    private platform: Platform
  ) {

  }

  ionViewDidLoad() {

    this.platform.ready().then(() => {
      this.initilizeGeofence();
      this.verifyNetworkStatus();
    });

  }

  initilizeGeofence() {
    this.geofence.initialize().then(
      () => {
        console.log('Geofence Plugin Ready');
        this.geolocation.watchPosition().filter((p) => p.coords !== undefined).subscribe((resp) => {
          this.lat = resp.coords.latitude;
          this.lng = resp.coords.longitude;
          this.alt = resp.coords.altitude;
          console.dir(resp);
        }, (err) => {
          this.lat = 'xxx.x';
          this.lng = 'xxx.x';
          this.alt = 'xxx.x';
        });
      },
      (err) => {
        console.log(err);
      }
    );

    this.addGeofence(this.fences);
    this.geofence.onTransitionReceived().subscribe(transition => {
      this.ngZone.run(() => {
        if (transition) {
          this.managePlaces(transition);
          this.name = transition;
        }
      });
    });
  }

  private addGeofence(fences) {
    this.geofence
      .addOrUpdate(fences)
      .then(() => console.log('Geofence added'), err => console.log('Geofence failed to add'));
  }

  managePlaces(transition: Fence[]) {
    transition.map(place => {
      if (place.transitionType !== 1) {
        const index = this.placesToShow.findIndex(x => x.id === place.id);
        this.placesToShow.splice(index, 1);
      } else {
        const index = this.places.findIndex(find => find.id === place.id);
        this.placesToShow.push(this.places[index]);
      }
    });
  }

  verifyNetworkStatus() {
    if (this.network.type === 'none') {
      this.status = 'Offline';
      this.networkStatus = false;
    } else {
      this.status = 'Online';
      this.networkStatus = true;
    }
    this.network.onDisconnect().subscribe(() => {
      this.ngZone.run(() => {
        this.networkStatus = false;
        this.status = 'Offline';
      });
    });

    this.network.onConnect().subscribe(() => {
      this.ngZone.run(() => {
        this.networkStatus = true;
        this.status = 'Online';
      });
    });
  }

  launchAlert() {
    alert('icon touched');
  }

}
