import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-img-edit',
    templateUrl: './img-edit.page.html',
    styleUrls: ['./img-edit.page.scss'],
})


export class ImgEditPage implements OnInit {
    constructor(public router: Router) {
    }

    ngOnInit() {
    }

}
