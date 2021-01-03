import { Component, OnInit } from '@angular/core';
import {AppService} from "../service/app.service";

@Component({
  selector: 'app-playground-main',
  templateUrl: './playground-main.page.html',
  styleUrls: ['./playground-main.page.scss'],
})
export class PlaygroundMainPage implements OnInit {

  constructor(public app: AppService) {
  }

  ngOnInit() {
  }

  async goMain() {
    await this.app.go('img-upload');
  }

}
