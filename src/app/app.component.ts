import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DynamicContentPage } from '../pages/dynamic-content/dynamic-content';
// import { ListPage } from '../pages/list/list';
// import { DynamicContentPage } from '../pages/dynamic-content/dynamic-content';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // // @ViewChild(Nav) nav: Nav;

  // rootPage: any = HomePage;

  // // pages: Array<{title: string, component: any}>;

  // constructor(
  //   public platform: Platform, 
  //   public statusBar: StatusBar, 
  //   public splashScreen: SplashScreen) {
  //   this.initializeApp();

  //   // used for an example of ngFor and navigation
  //   // this.pages = [
  //   //   { title: 'Home', component: HomePage },
  //   //   { title: 'List', component: ListPage },
  //   //   { title: 'around', component: DynamicContentPage },
  //   // ];

  // }

  // initializeApp() {
  //   this.platform.ready().then(() => {
  //     // Okay, so the platform is ready and our plugins are available.
  //     // Here you can do any higher level native things you might need.
  //     this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  // }

  // // openPage(page) {
  // //   // Reset the content nav to have just this page
  // //   // we wouldn't want the back button to show in this scenario
  // //   this.nav.setRoot(page.component);
  // // }
}
