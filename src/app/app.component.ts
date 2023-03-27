import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'baltic-star-login';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              public router: Router) {
    this.matIconRegistry
      .addSvgIcon(
        'icon_baltic_star',
        this.domSanitizer
          .bypassSecurityTrustResourceUrl('/assets/icons/baltic-star.svg')
      );

  }
}
