import { Component } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { routerTransition } from './animations/router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routerTransition]
})
export class AppComponent {

  navLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router, private contexts: ChildrenOutletContexts) {
    this.navLinks = [
      {
        label: 'Zaloguj się',
        link: './login',
        index: 0
      },
      {
        label: 'Załóż konto',
        link: './signup',
        index: 1
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  getState(outlet: any) {
    return outlet.activatedRouteData.state;
  }
}
