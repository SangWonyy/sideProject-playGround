import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Matter from 'matter-js';
import { AppService } from '../service/app.service';
import {fromEvent, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-simple-game',
  templateUrl: './simple-game.page.html',
  styleUrls: ['./simple-game.page.scss'],
})
export class SimpleGamePage implements OnInit, OnDestroy {
  public isMoreLoad = false;
  public keyDownObservable$: Observable<Event>;
  public subscriptions: Array<Subscription> = [];
  public controllBarLeft;
  public controllBarRight;
  public gameBoxWidth: number;
  public gameBoxHeight: number;
  constructor(public app: AppService) { }

  ngOnInit() {
    this.keyDownObservable$ = fromEvent(document, 'keydown');
    this.subscriptions.push(
        this.keyDownObservable$.subscribe(
            (event) => {
              let y: number;
              let x: number;
              // @ts-ignore
              if (event.keyCode === 38) { // 위 방향키
                y = this.controllBarRight.position.y - 20;
                x = this.controllBarRight.position.x;
                if (y > 30) {
                  Matter.Body.setPosition(this.controllBarRight, {y, x});
                }
                // @ts-ignore
              } else if (event.keyCode === 40) { // 아래 방향키
                y = this.controllBarRight.position.y + 20;
                x = this.controllBarRight.position.x;
                if(y < this.gameBoxHeight - 28) {
                  Matter.Body.setPosition(this.controllBarRight, {y, x});
                }
                // @ts-ignore
              } else if (event.keyCode === 87) { // w
                y = this.controllBarLeft.position.y - 20;
                x = this.controllBarLeft.position.x;
                if (y > 30) {
                  Matter.Body.setPosition(this.controllBarLeft, {y, x});
                }
                // @ts-ignore
              } else if (event.keyCode === 83) { // s
                y = this.controllBarLeft.position.y + 20;
                x = this.controllBarLeft.position.x;
                if(y < this.gameBoxHeight - 28) {
                  Matter.Body.setPosition(this.controllBarLeft, {y, x});
                }
              }
            }
        )
    );
  }


  ionViewWillEnter() {
    this.playDefence();
  }
  playDefence() {
    try {
      const {engine, render} = this.createEngine();

      const bottomWall = Matter.Bodies.rectangle(this.gameBoxWidth / 2, this.gameBoxHeight - 10, this.gameBoxWidth, 1, {isStatic: true});
      const topWall = Matter.Bodies.rectangle(this.gameBoxWidth / 2, 10, this.gameBoxWidth, 1, {isStatic: true});
      const leftWall = Matter.Bodies.rectangle(10, this.gameBoxHeight / 2, 1, this.gameBoxHeight, {isStatic: true});
      const rightWall = Matter.Bodies.rectangle(this.gameBoxWidth - 10, this.gameBoxHeight / 2, 1, this.gameBoxHeight, {isStatic: true});
      const obstacle1 = Matter.Bodies.rectangle(this.gameBoxWidth / 4, (this.gameBoxHeight + 10) / 3, 15, 25,  {
        isStatic: true,
        render: {
          fillStyle: '#FF9F59',
        }
      });
      const obstacle2 = Matter.Bodies.rectangle((this.gameBoxWidth * 2 + 30) / 3, (this.gameBoxHeight * 2) / 3, 15, 25,  {
        isStatic: true,
        render: {
          fillStyle: '#FF9F59',
        }
      });

      const obstacle3 = Matter.Bodies.circle(this.gameBoxWidth / 2, (this.gameBoxHeight) / 2, 15,  {
        isStatic: true,
        render: {
          fillStyle: '#FF9F59',
        },
        restitution: 1
      });

      this.controllBarLeft = Matter.Bodies.rectangle(this.gameBoxWidth * 0.05, this.gameBoxHeight * 0.07, 15, 35,  {
        isStatic: true,
        render: {
          fillStyle: '#1FFF26',
        },
        restitution: 1
      });

      this.controllBarRight = Matter.Bodies.rectangle(this.gameBoxWidth * 0.95, this.gameBoxHeight * 0.07, 15, 35,  {
        isStatic: true,
        render: {
          fillStyle: '#1FFF26',
        },
        restitution: 1
      });

      const ball = Matter.Bodies.circle((this.gameBoxWidth / 2) - 12.5, 100, 25, {
        render: {
          sprite: {
            texture: '../../assets/game/ball.png',
            xScale: 0.2,
            yScale: 0.2
          },
          // isStatic: true
        },
        friction: 0,
        frictionAir: 0.001,
        restitution: 1
      });

      // Matter.Events.1
      // Matter.Events.on(engine, 'collisionStart', (event) => {
      //   debugger
      // });
      Matter.World.add(engine.world, [bottomWall, topWall, leftWall, rightWall, obstacle1, obstacle2, obstacle3, this.controllBarLeft, this.controllBarRight, ball]);
      Matter.Engine.run(engine);
      Matter.Render.run(render);
    } catch (e) {
      console.error(e);
    }
  }

  createEngine() {
    const gameBox = document.querySelector('.gameBox');
    this.gameBoxWidth = gameBox.clientWidth - 1;
    this.gameBoxHeight = gameBox.clientHeight;
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: gameBox,
      engine,
      options: {
        width: this.gameBoxWidth,
        height: this.gameBoxHeight,
        wireframes: false
      }

    });

    return {engine, render};
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

}
