import {Component, HostListener, OnInit} from '@angular/core';
import {AppService} from "../service/app.service";
import {Platform} from "@ionic/angular";
import {Subject, Subscription} from "rxjs";
import {throttle, throttleTime} from "rxjs/operators";

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
          canvas: document.querySelector('#video-canvas-0') as HTMLCanvasElement,
          // context: document.querySelector('#video-canvas-0').getContext('2d'),
          videoImages: []
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
    const img = new Image();
    img.src = `assets/main/video/001/IMG_ (1).jpg`;
    const context = this.sceneInfo[0].objs.canvas.getContext('2d');
    this.sceneInfo[this.currentScene].objs.canvas.width = this.platform.width();

    img.onload = (() => {
      context.drawImage(img, 0, 0, this.platform.width(), this.platform.height());
    })

    // 중간에서 새로고침 했을 경우 자동 스크롤로 제대로 그려주기
    let tempYOffset = this.yOffset;
    let tempScrollCount = 0;
    if (tempYOffset > 0) {
      let siId = setInterval(() => {
        scrollTo(0, tempYOffset);
        tempYOffset += 5;

        if (tempScrollCount > 20) {
          clearInterval(siId);
        }
        tempScrollCount++;
      }, 20);
    }

    // this.transitionendEvent();
  }

  @HostListener('window:resize')
  resizeEvent() {
    this.resize$.next();
  }

  // @HostListener('window:orientationchange')
  // orientationchangeEvent() {
  //   scrollTo(0, 0);
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 500);
  // }

  constructor(public app: AppService, public platform: Platform) {
  }

  ngOnInit() {
    this.resize$.pipe(
        throttleTime( 500)
    ).subscribe(
        (result) => {
          this.drawCanvasImg(this);
        }
    )
  }

  ionViewDidEnter() {
    this.checkMenu();
  }

  drawCanvasImg(self) {
    const img = new Image();
    const context = self.sceneInfo[0].objs.canvas.getContext('2d');
    this.sceneInfo[self.currentScene].objs.canvas.width = self.platform.width();
    const currentYOffset = self.delayedYOffset - self.prevScrollHeight;
    const values = self.sceneInfo[self.currentScene].values;
    let sequence = Math.round(self.calcValues(values.imageSequence, currentYOffset));
    if(this.currentScene === 0 && (1 + sequence) <= 300 && (1 + sequence) >= 1) {
      img.src = `assets/main/video/001/IMG_ (${1 + sequence}).jpg`;
      img.onload = (() => {
        context.drawImage(img, 0, 0, self.platform.width(), self.platform.height());
      })
    }
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
      } else if (this.sceneInfo[i].type === 'normal')  {
        const content = this.sceneInfo[i].objs.content as HTMLCanvasElement;
        this.sceneInfo[i].scrollHeight = content.offsetHeight + window.innerHeight * 0.5;
      }
      const container = this.sceneInfo[i].objs.container as HTMLElement;
      container.style.height = `${this.sceneInfo[i].scrollHeight}px`;
    }

    this.yOffset = window.pageYOffset;
  }

  calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = this.sceneInfo[this.currentScene].scrollHeight;
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

  playAnimation() {
    const objs = this.sceneInfo[this.currentScene].objs;
    const values = this.sceneInfo[this.currentScene].values;
    const messageA = objs.messageA as HTMLElement;
    const messageB = objs.messageB as HTMLElement;
    const messageC = objs.messageC as HTMLElement;
    const messageD = objs.messageD as HTMLElement;
    const pinB = objs.pinB as HTMLElement;
    const pinC = objs.pinC as HTMLElement;
    const canvasCaption = objs.canvasCaption as HTMLElement;
    const currentYOffset = this.yOffset - this.prevScrollHeight;
    const scrollHeight = this.sceneInfo[this.currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;
    const canvas = objs.canvas as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    switch (this.currentScene) {
      case 0:
        canvas.style.opacity = this.calcValues(values.canvas_opacity, currentYOffset);

        if (scrollRatio <= 0.22) {
          // in
          messageA.style.opacity = this.calcValues(values.messageA_opacity_in, currentYOffset);
          messageA.style.transform = `translate3d(0, ${this.calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          messageA.style.opacity = this.calcValues(values.messageA_opacity_out, currentYOffset);
          messageA.style.transform = `translate3d(0, ${this.calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          messageB.style.opacity = this.calcValues(values.messageB_opacity_in, currentYOffset);
          messageB.style.transform = `translate3d(0, ${this.calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          messageB.style.opacity = this.calcValues(values.messageB_opacity_out, currentYOffset);
          messageB.style.transform = `translate3d(0, ${this.calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          messageC.style.opacity = this.calcValues(values.messageC_opacity_in, currentYOffset);
          messageC.style.transform = `translate3d(0, ${this.calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          messageC.style.opacity = this.calcValues(values.messageC_opacity_out, currentYOffset);
          messageC.style.transform = `translate3d(0, ${this.calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          messageD.style.opacity = this.calcValues(values.messageD_opacity_in, currentYOffset);
          messageD.style.transform = `translate3d(0, ${this.calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          messageD.style.opacity = this.calcValues(values.messageD_opacity_out, currentYOffset);
          messageD.style.transform = `translate3d(0, ${this.calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }

        break;
    }
  }

  scrollLoop() {
    this.enterNewScene = false;
    this.prevScrollHeight = 0;
    let currentContent = document.querySelector(`#show-scene-0`);
    for (let i = 0; i < this.currentScene; i++) {
      this.prevScrollHeight += this.sceneInfo[i].scrollHeight;
    }

    if (this.delayedYOffset < this.prevScrollHeight + this.sceneInfo[this.currentScene].scrollHeight) {
      currentContent.classList.remove('scroll-effect-end');
    }
    if (this.delayedYOffset > this.prevScrollHeight + this.sceneInfo[this.currentScene].scrollHeight) {
      this.enterNewScene = true;
      if (this.currentScene === this.sceneInfo.length - 1) {
        currentContent.classList.add('scroll-effect-end');
      }

      if (this.currentScene < this.sceneInfo.length - 1) {
        this.currentScene++;
      }
      currentContent.setAttribute('id', `show-scene-${this.currentScene}`);
    }

    if (this.delayedYOffset < this.prevScrollHeight) {
      this.enterNewScene = true;
      // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      if (this.currentScene === 0) return;
      // this.currentScene--;
      currentContent.setAttribute('id', `show-scene-${this.currentScene}`);
    }

    if (this.enterNewScene) return;


    this.playAnimation();
  }

  softLoop() {
    const canvas = this.sceneInfo[this.currentScene].objs.canvas;
    const context = this.sceneInfo[this.currentScene].objs.canvas.getContext('2d');
    this.delayedYOffset = this.delayedYOffset + (this.yOffset - this.delayedYOffset) * this.acc;
    let img = new Image();
    if (!this.enterNewScene) {
      if (this.currentScene === 0) {
        const currentYOffset = this.delayedYOffset - this.prevScrollHeight;
        const objs = this.sceneInfo[this.currentScene].objs;
        const values = this.sceneInfo[this.currentScene].values;
        let sequence = Math.round(this.calcValues(values.imageSequence, currentYOffset));
        if(this.currentScene === 0 && (1 + sequence) <= 300 && (1 + sequence) >= 1) {
          img.src = `assets/main/video/001/IMG_ (${1 + sequence}).jpg`;
          img.onload = (() => {
            context.drawImage(img, 0, 0, this.platform.width(), this.platform.height());
          })
        }
      }
    }

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (this.delayedYOffset < 1) {
      this.scrollLoop();
      canvas.style.opacity = "1";
      img.src = `assets/main/video/001/IMG_ (1).jpg`;
      img.onload = (() => {
        context.drawImage(img, 0, 0, this.platform.width(), this.platform.height());
      })

    }
    // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
    if ((this.platform.height() - window.innerHeight) - this.delayedYOffset < 1) {
      scrollTo(0, 0);
    }

    if (Math.abs(this.yOffset - this.delayedYOffset) > 1) {
      if(this.currentScene === 0) {
        this.requestAni();
      }
    }
  }

  scrollEvent(scrollTop) {
    this.yOffset = scrollTop;
    this.scrollLoop();
    this.checkMenu();
    this.softLoop()
  }

  requestAni() {
    this.softLoop();
  }

  //

  // transitionendEvent() {
  //   document.querySelector('.loading').addEventListener('transitionend', (e) => {
  //     document.body.removeChild(<Node>e.currentTarget);
  //   });
  // }

}
