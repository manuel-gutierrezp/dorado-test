import { Component } from '@angular/core';
import { DynamicContentPage } from "../dynamic-content/dynamic-content";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
	dynamic = DynamicContentPage;

  constructor() {

  }
}
