import { Component } from '@angular/core';
import { routerTransition } from './animations/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent {

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
