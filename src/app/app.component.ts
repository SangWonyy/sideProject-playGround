import { Component, OnInit } from '@angular/core';

import {MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AppService} from './service/app.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public menuType: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public app: AppService,
    public route: Router,
    public activatedRoute: ActivatedRoute,
    public menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.route.events
        .pipe(
            filter((event) => event instanceof NavigationEnd), // routing 시 navigationEnd 외 여러번 들어온다.
            map( () => {
              const child = this.activatedRoute.firstChild;
              return child.snapshot.data;
            })
        )
        .subscribe(
            (result) => {
                  this.menuType = result.menuType;
            },
            (err) => {
              console.error(err);
            }
        );
  }
    async selectMenu(url: string) {
        await this.menu.close('menuBar');
        await this.app.go(url);
    }

}
