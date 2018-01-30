import { Component } from '@angular/core';
import { DynamicContentPage } from "../dynamic-content/dynamic-content";
import { ListPage } from '../list/list';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  dynamic = DynamicContentPage;
  list = ListPage;
  home = HomePage;

  constructor() {

  }
}
