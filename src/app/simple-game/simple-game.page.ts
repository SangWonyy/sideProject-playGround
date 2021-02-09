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
    let gameBox = document.querySelector('.gameBox');
    let gameBoxWidth = gameBox.clientWidth - 1;
    let gameBoxHeight = gameBox.clientHeight
    let engine = Matter.Engine.create();
    let render = Matter.Render.create({
      element: gameBox,
      engine: engine,
      options: {
        width: gameBoxWidth,
        height: gameBoxHeight
      }
    });

    let ground = Matter.Bodies.rectangle(gameBoxWidth / 2, gameBoxHeight - 30, gameBoxWidth, 1, {isStatic: true});
    let boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
    let boxB = Matter.Bodies.rectangle(450, 50, 80, 80);

    let mouse = Matter.Mouse.create(render.canvas);
    let mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        render: {visible: false}
      }
    });
    render.mouse = mouse;

    Matter.World.add(engine.world, [boxA, boxB, ground, mouseConstraint]);
    Matter.Engine.run(engine);
    Matter.Render.run(render);
  }

}
