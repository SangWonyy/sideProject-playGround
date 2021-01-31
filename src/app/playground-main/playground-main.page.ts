import { Component, HostListener, OnInit } from '@angular/core';
import { AppService } from "../service/app.service";
import { Platform } from "@ionic/angular";
import { Subject, Subscription } from "rxjs";
import { throttle, throttleTime } from "rxjs/operators";

@Component({
  selector: 'app-playground-main',
  templateUrl: './playground-main.page.html',
  styleUrls: ['./playground-main.page.scss'],
})
export class PlaygroundMainPage implements OnInit {
  public yOffset = 0; // window.pagethis.yOffset 대신 쓸 변수
  public prevScrollHeight = 0; // 현재 스크롤 위치(this.yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  public currentScene = 0; // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  public enterNewScene = false; // 새로운 scene이 시작된 순간 true
  public acc = 0.2;
  public delayedYOffset = 0;
  public rafId;
  public rafState = true;
  public sceneInfo;
  public resize$ = new Subject();
  public disapearH1Point: number;
  public h1Position: number;
  @HostListener('window:load')
  playMain() {
    this.sceneInfo = [
      {
        // 0
        type: 'sticky',
        heightNum: 3, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-0') as HTMLElement,
          messageA: document.querySelector('#scroll-section-0 .main-message.a') as HTMLElement,
          messageB: document.querySelector('#scroll-section-0 .main-message.b') as HTMLElement,
          messageC: document.querySelector('#scroll-section-0 .main-message.c') as HTMLElement,
          messageD: document.querySelector('#scroll-section-0 .main-message.d') as HTMLElement,
        },
        values: {
          videoImageCount: 300,
          imageSequence: [0, 299],
          canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
          messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
          messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
          messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
          messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
          messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
          messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
          messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
          messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
          messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
          messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
          messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
          messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
          messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
          messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
          messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
          messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
        }
      }
    ];
    this.setLayout(); // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행
    const h1Ele = document.querySelector('#scroll-section-0 h1');
    this.h1Position = (this.platform.height() + 100) / 2;
    h1Ele.setAttribute('style', `top: -${this.h1Position}px`);
    this.h1Position += h1Ele.clientHeight;

  }

  @HostListener('window:resize')
  resizeEvent() {
    this.resize$.next();
  }

  constructor(public app: AppService, public platform: Platform) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
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
    for (let i = 0; i < this.sceneInfo.length; i++) {
      if (this.sceneInfo[i].type === 'sticky') {
        this.sceneInfo[i].scrollHeight = this.sceneInfo[i].heightNum * window.innerHeight;
      } else if (this.sceneInfo[i].type === 'normal') {
        const content = this.sceneInfo[i].objs.content as HTMLCanvasElement;
        this.sceneInfo[i].scrollHeight = content.offsetHeight + window.innerHeight * 0.5;
      }
      const container = this.sceneInfo[i].objs.container as HTMLElement;
      container.style.height = `${this.sceneInfo[i].scrollHeight}px`;
    }

    this.yOffset = window.pageYOffset;
  }

  opacityMessage() {
    const stickyElem = document.querySelector('.sticky-elem') as HTMLElement;
    if (this.yOffset > this.h1Position) {
      
      if (!stickyElem.style.top) {
        const stickyElePosition = ((this.platform.height() - 300) / 2);
        stickyElem.style.top = `${stickyElePosition}px`;
      }
      if (+stickyElem.style.opacity <= 1) {
        stickyElem.style.opacity = `${(this.yOffset - this.h1Position)/ 500 }`;
      }
      
    }

    // if (this.h1Position + 800 > this.yOffset) {
    //   stickyElem.style.opacity = `${(this.h1Position + 800 - this.yOffset)/ 500 }`;
    // }
  }

  scrollEvent(scrollTop) {
    this.yOffset = scrollTop;
    console.log(this.yOffset);
    console.log('platform height ::', this.platform.height())
    this.checkMenu();
    this.opacityMessage();
  }

  calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = this.sceneInfo[0].scrollheight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
        // start ~ end 사이에 애니메이션 실행
        const partScrollStart = values[2].start * scrollHeight;
        const partScrollEnd = values[2].end * scrollHeight;
        const partScrollHeight = partScrollEnd - partScrollStart;

        if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
            rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
        } else if (currentYOffset < partScrollStart) {
            rv = values[0];
        } else if (currentYOffset > partScrollEnd) {
            rv = values[1];
        }
    } else {
        rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
}

}
