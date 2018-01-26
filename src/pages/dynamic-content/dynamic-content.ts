import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geofence } from '@ionic-native/geofence';
import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import { fence } from './declarations/geofences.model';
import { place } from './declarations/places.model';

import 'rxjs/add/operator/filter';

@IonicPage()
@Component({
  selector: 'page-dynamic-content',
  templateUrl: 'dynamic-content.html',
})
export class DynamicContentPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private geofence: Geofence,
    private ngZone: NgZone,
    private network: Network,
    private geolocation: Geolocation
  ) {
    this.initilizeGeofence();
  }

  networkStatus: boolean;
  status: string;
  type: string;
  name: any;
  lat: number | string;
  lng: number | string;
  placesToShow: place[] = [];
  places: place[] = [
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
      description: 'MAMM esta dedicado a la investigación, conservación y divulgación en los campos del arte moderno y contemporáneo, así como al desarrollo cultural de la ciudad.'
    },
    {
      id: 'YuxiGlobal',
      name: 'Yuxi Global',
      avatar: 'http://yuxiglobal.com/images/dockerB.png',
      description: 'We love what we do'
    }
  ]
  fences: fence[] = [
    {
      id: "estacion del metro",
      latitude: 6.230907,
      longitude: -75.575732,
      radius: 300,
      transitionType: 3,
      notification: {
        id: 1,
        title: "You crossed a fence",
        text: "You are close to Estacion Industriales",
        openAppOnClick: true
      }
    },
    {
      id: 'Hospital M',
      latitude: 6.234385,
      longitude: -75.572710,
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
    }
  ]


  ngOnInit() {
    this.verifyNetworkStatus();
    this.geolocation.watchPosition().filter((p) => p.coords !== undefined).subscribe((resp) => {
      this.lat = resp.coords.latitude
      this.lng = resp.coords.longitude
    }, (err) => {
      this.lat = 'xxx.x';
      this.lng = 'xxx.x';
    });
  }

  initilizeGeofence() {
    this.geofence.initialize().then(
      () => { console.log('Geofence Plugin Ready') },
      (err) => console.log(err)
    )

    this.addGeofence(this.fences);
    this.geofence.onTransitionReceived().subscribe((transition) => {
      this.ngZone.run(() => {
        if (transition) {
          this.managePlaces(transition);
          this.name = transition;
        }
      });
    });
  }

  private addGeofence(fences) {
    this.geofence.addOrUpdate(fences).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
  }

  managePlaces(transition: {}[]) {
    transition.map((place) => {
      if (place['transitionType'] !== 1) {
        const index = this.placesToShow.findIndex(x => x['id'] == place['id'])
        this.placesToShow.splice(index, 1);
      } else {
        const index = this.places.findIndex(find => find['id'] == place['id'])
        this.placesToShow.push(this.places[index])
      }
    })
  }

  verifyNetworkStatus() {
    if (this.network.type == 'none') {
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

}
