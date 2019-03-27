import { Component } from '@angular/core';

import { RolePage } from '../role/role';
import { MattersPage } from '../matters/matters';
import { WorkPage } from '../work/work';
import { ColleaguePage } from '../colleague/colleague';
import { CalendarPage } from '../calendar/calendar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = WorkPage;
  tab2Root = RolePage;
  tab3Root = MattersPage;
  tab4Root = ColleaguePage;
  tab5Root = CalendarPage;

  constructor() {

  }
}
