import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { AppService } from "../service/app.service";
import { Platform } from "@ionic/angular";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: 'app-playground-main',
  templateUrl: './playground-main.page.html',
  styleUrls: ['./playground-main.page.scss'],
})
export class PlaygroundMainPage implements OnInit {
  public yOffset = 0; // window.pagethis.yOffset 대신 쓸 변수
  public prevScrollHeight = 0; // 현재 스크롤 위치(this.yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  public currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  public delayedYOffset = 0;
  public rafState = true;
  public sceneInfo;
  public resize$ = new Subject();
  public h1Position: number;
  public contentHeight: number;
  @ViewChild('showScene', {static: true}) showScene: ElementRef;
  @HostListener('window:load')
  playMain() {
    this.setLayout(); // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행
  }

  @HostListener('window:resize')
  resizeEvent() {
    this.resize$.next();
  }

  constructor(public app: AppService, public platform: Platform) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.checkMenu();
  }

  async goMain() {
    await this.app.go('img-block');
  }

  checkMenu() {
    const currentContent = document.querySelector(`#show-scene-${this.currentScene}`);
    const localContent = document.querySelector(`.local-nav`);

    if (this.yOffset > 44) {
      currentContent.classList.add('local-nav-sticky');
      localContent.setAttribute('style', 'display: block');
    } else {
      currentContent.classList.remove('local-nav-sticky');
      localContent.setAttribute('style', 'display: none');
    }
  }

  setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    this.contentHeight = 3 * window.innerHeight;
    this.yOffset = window.pageYOffset;

    if(!this.h1Position) {
      const h1Ele = document.querySelector('#scroll-section-0 h1');
      this.h1Position = (this.platform.height() + 100) / 2;
      h1Ele.setAttribute('style', `top: -${this.h1Position}px`);
      this.h1Position += h1Ele.clientHeight;
    }
  }

  scrollEvent(scrollTop) {
    this.yOffset = scrollTop;
    this.checkMenu();
  }
}
