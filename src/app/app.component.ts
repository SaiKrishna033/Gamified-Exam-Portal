import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(){
     this.router.events
       .pipe(filter((event) => event instanceof NavigationEnd))
       .subscribe(() => {
         // Get the current route URL after navigation is complete
         const currentRoute = this.router.url;
         console.log('Current Route:', currentRoute);
       });
  }
  title = 'Kuhoot-one';
}