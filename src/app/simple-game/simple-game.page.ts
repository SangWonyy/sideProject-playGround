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
    try {
      const gameBox = document.querySelector('.gameBox');
      const gameBoxWidth = gameBox.clientWidth - 1;
      const gameBoxHeight = gameBox.clientHeight;
      const engine = Matter.Engine.create();
      const render = Matter.Render.create({
        element: gameBox,
        engine,
        options: {
          width: gameBoxWidth,
          height: gameBoxHeight,
          wireframes: false
        }

      });

      const ground = Matter.Bodies.rectangle(gameBoxWidth / 2, gameBoxHeight - 30, gameBoxWidth, 1, {isStatic: true});
      const boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
      const boxB = Matter.Bodies.rectangle(450, 50, 80, 80);
      const ball = Matter.Bodies.circle(70, 100, 25, {
        render: {
          sprite: {
            texture: '../../assets/game/ball.png',
            xScale: 0.2,
            yScale: 0.2
          },
        }
      });
      const mouse = Matter.Mouse.create(render.canvas);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          render: {visible: false}
        }
      });
      render.mouse = mouse;

      Matter.World.add(engine.world, [boxA, boxB, ground, mouseConstraint, ball]);
      Matter.Engine.run(engine);
      Matter.Render.run(render);
    } catch (e) {
      console.error(e);
    }
  }



}
