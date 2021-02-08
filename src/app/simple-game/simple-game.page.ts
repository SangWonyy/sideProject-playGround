import { Component, OnInit } from '@angular/core';
import * as Matter from 'matter-js';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-simple-game',
  templateUrl: './simple-game.page.html',
  styleUrls: ['./simple-game.page.scss'],
})
export class SimpleGamePage implements OnInit {
  public isMoreLoad = false;
  constructor(public app: AppService) { }

  ngOnInit() {
  }


  ionViewWillEnter() {
    this.drawBlock();
  }
  drawBlock() {
    let engine = Matter.Engine.create();
    let render = Matter.Render.create({
      element: document.querySelector('.gameBox'),
      engine: engine
    });

    let ground = Matter.Bodies.rectangle(400,600,810,60, {isStatic: true});
  }

}
