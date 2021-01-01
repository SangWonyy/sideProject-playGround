import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../service/app.service';
import {MenuController} from '@ionic/angular';
import {Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Input() menuType: any;
    constructor(public app: AppService, public appCompo: AppComponent, private menu: MenuController) {
    }

    async ngOnInit() {
    }

    async openSideMenu() {
        await this.menu.enable(true, 'menuBar');
        await this.menu.open('menuBar');
    }
}
