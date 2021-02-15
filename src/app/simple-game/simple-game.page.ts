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
    this.playDefence();
  }
  playDefence() {
    try {
      const {engine, render, gameBoxWidth, gameBoxHeight} = this.createEngine();

      const bottomWall = Matter.Bodies.rectangle(gameBoxWidth / 2, gameBoxHeight - 10, gameBoxWidth, 1, {isStatic: true});
      const topWall = Matter.Bodies.rectangle(gameBoxWidth / 2, 10, gameBoxWidth, 1, {isStatic: true});
      const leftWall = Matter.Bodies.rectangle(10, gameBoxHeight / 2, 1, gameBoxHeight, {isStatic: true});
      const rightWall = Matter.Bodies.rectangle(gameBoxWidth - 10, gameBoxHeight / 2, 1, gameBoxHeight, {isStatic: true});
      const obstacle1 = Matter.Bodies.rectangle(gameBoxWidth / 4, (gameBoxHeight + 10) / 3, 15, 25,  {
        isStatic: true,
        render: {
          fillStyle: '#FF9F59',
        }
      });
      const obstacle2 = Matter.Bodies.rectangle((gameBoxWidth * 2 + 30) / 3, (gameBoxHeight * 2) / 3, 15, 25,  {
        isStatic: true,
        render: {
          fillStyle: '#FF9F59',
        }
      });

      const obstacle3 = Matter.Bodies.circle(gameBoxWidth / 2, (gameBoxHeight) / 2, 15,  {
        isStatic: true,
        render: {
          fillStyle: '#FF9F59',
        }
      });

      const ball = Matter.Bodies.circle((gameBoxWidth / 2) - 12.5, 100, 25, {
        render: {
          sprite: {
            texture: '../../assets/game/ball.png',
            xScale: 0.2,
            yScale: 0.2
          },
          // isStatic: true
        },
        frictionStatic: 1
      });

      Matter.World.add(engine.world, [bottomWall, topWall, leftWall, rightWall, obstacle1, obstacle2, obstacle3, ball]);
      Matter.Engine.run(engine);
      Matter.Render.run(render);
    } catch (e) {
      console.error(e);
    }
  }

  createEngine() {
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

    return {engine, render, gameBoxWidth, gameBoxHeight};
  }


}
