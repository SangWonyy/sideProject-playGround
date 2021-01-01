import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../service/user/user.resource.service';
import {AppService} from '../service/app.service';

@Component({
    selector: 'app-editsomething-main',
    templateUrl: './editSomething-main.html',
    styleUrls: ['./editSomething-main.page.scss'],
})


export class EditSomeThingMainPage implements OnInit {
    constructor(public app: AppService) {
    }

    ngOnInit() {
    }

    async goMain() {
        await this.app.go('img-upload');
    }
}
