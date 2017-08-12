import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { FriendsPage } from '../friends/friends';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SettingsPage;
  tab3Root = FriendsPage;

  constructor() {

  }
}
