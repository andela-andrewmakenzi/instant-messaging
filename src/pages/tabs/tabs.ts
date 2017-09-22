import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = 'InboxPage';
  tab2Root = 'ChannelsPage';
  tab3Root = 'ProfilePage';

  constructor() {
  }
}
