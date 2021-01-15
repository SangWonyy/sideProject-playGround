import {Component, HostListener, OnInit} from '@angular/core';
import {AppService} from "../service/app.service";
import {Platform} from "@ionic/angular";

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
  @HostListener('window:load')
  playMain() {
    this.sceneInfo = [
      {
        // 0
        type: 'sticky',
        heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-1') as HTMLElement,
          messageA: document.querySelector('#scroll-section-1 .main-message.a') as HTMLElement,
          messageB: document.querySelector('#scroll-section-1 .main-message.b') as HTMLElement,
          messageC: document.querySelector('#scroll-section-1 .main-message.c') as HTMLElement,
          messageD: document.querySelector('#scroll-section-1 .main-message.d') as HTMLElement,
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
      },
      {
        // 1
        type: 'normal',
        // heightNum: 5, // type normal에서는 필요 없음
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-1-5') as HTMLElement,
          content: document.querySelector('#scroll-section-1-5 .description') as HTMLElement
        }
      },
      {
        // 2
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-2') as HTMLElement,
          messageA: document.querySelector('#scroll-section-2 .a') as HTMLElement,
          messageB: document.querySelector('#scroll-section-2 .b') as HTMLElement,
          messageC: document.querySelector('#scroll-section-2 .c') as HTMLElement,
          pinB: document.querySelector('#scroll-section-2 .b .pin') as HTMLElement,
          pinC: document.querySelector('#scroll-section-2 .c .pin') as HTMLElement,
          canvas: document.querySelector('#video-canvas-1') as HTMLCanvasElement,
          // context: document.querySelector('#video-canvas-1').getContext('2d'),
          videoImages: []
        },
        values: {
          videoImageCount: 960,
          imageSequence: [0, 959],
          canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
          canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
          messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
          messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
          messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
          messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
          messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
          messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
          messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
          messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
          messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
          messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
          messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
          messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
          pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
          pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
        }
      },
      {
        // 3
        type: 'sticky',
        heightNum: 5,
        scrollHeight: 0,
        objs: {
          container: document.querySelector('#scroll-section-3') as HTMLElement,
          canvasCaption: document.querySelector('.canvas-caption') as HTMLElement,
          canvas: document.querySelector('.image-blend-canvas') as HTMLCanvasElement,
          // context: document.querySelector('.image-blend-canvas').getContext('2d'),
          imagesPath: [
            'assets/main/image/blend-image-1.jpg',
            'assets/main/image/blend-image-2.jpg'
          ],
          images: []
        },
        values: {
          rect1X: [ 0, 0, { start: 0, end: 0 } ],
          rect2X: [ 0, 0, { start: 0, end: 0 } ],
          blendHeight: [ 0, 0, { start: 0, end: 0 } ],
          canvas_scale: [ 0, 0, { start: 0, end: 0 } ],
          canvasCaption_opacity: [ 0, 1, { start: 0, end: 0 } ],
          canvasCaption_translateY: [ 20, 0, { start: 0, end: 0 } ],
          rectStartY: 0
        }
      }
    ];
    this.setLayout(); // 중간에 새로고침 시, 콘텐츠 양에 따라 높이 계산에 오차가 발생하는 경우를 방지하기 위해 before-load 클래스 제거 전에도 확실하게 높이를 세팅하도록 한번 더 실행

    const img = new Image();
    img.src = `assets/main/video/001/IMG_6726.JPG`;
    const context = this.sceneInfo[0].objs.canvas.getContext('2d');
    img.onload = (() => {
      context.drawImage(img, 0, 0);
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
    if (window.innerWidth > 900) {
      window.location.reload();
    }
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

  }

  ionViewDidEnter() {


  }
  async goMain() {
    await this.app.go('img-upload');
  }

  checkMenu() {
    const currentContent = document.querySelector(`#show-scene-${this.currentScene}`);
    if (this.yOffset > 44) {
      currentContent.classList.add('local-nav-sticky');
    } else {
      currentContent.classList.remove('local-nav-sticky');
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

    let totalScrollHeight = 0;
    for (let i = 0; i < this.sceneInfo.length; i++) {
      totalScrollHeight += this.sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= this.yOffset) {
        this.currentScene = i;
        break;
      }
    }

    const heightRatio = window.innerHeight / 1080;
    this.sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    this.sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
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
    const canvas = objs.canvas as HTMLCanvasElement;
    const context = canvas.getContext('2d');
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

    switch (this.currentScene) {
      case 0:
        // console.log('0 play');
        // let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
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

      case 2:
        // console.log('2 play');
        // let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = this.calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          // out
          objs.canvas.style.opacity = this.calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.32) {
          // in
          messageA.style.opacity = this.calcValues(values.messageA_opacity_in, currentYOffset);
          messageA.style.transform = `translate3d(0, ${this.calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          messageA.style.opacity = this.calcValues(values.messageA_opacity_out, currentYOffset);
          messageA.style.transform = `translate3d(0, ${this.calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          // in
          messageB.style.transform = `translate3d(0, ${this.calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          messageB.style.opacity = this.calcValues(values.messageB_opacity_in, currentYOffset);
          pinB.style.transform = `scaleY(${this.calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          messageB.style.transform = `translate3d(0, ${this.calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          messageB.style.opacity = this.calcValues(values.messageB_opacity_out, currentYOffset);
          pinB.style.transform = `scaleY(${this.calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          messageC.style.transform = `translate3d(0, ${this.calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          messageC.style.opacity = this.calcValues(values.messageC_opacity_in, currentYOffset);
          pinC.style.transform = `scaleY(${this.calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          messageC.style.transform = `translate3d(0, ${this.calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          messageC.style.opacity = this.calcValues(values.messageC_opacity_out, currentYOffset);
          pinC.style.transform = `scaleY(${this.calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        // this.currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
        if (scrollRatio > 0.9) {
          const objs = this.sceneInfo[3].objs;
          const values = this.sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            // 캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
          } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
          }

          canvas.style.transform = `scale(${canvasScaleRatio})`;
          context.fillStyle = 'white';
          const img = new Image();
          img.src = 'assets/main/image/blend-image-1.jpg';
          img.onload = (() => {
            context.drawImage(img, 0, 0);
          })


          // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          const recalculatedInnerWidth = this.platform.width() / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // 좌우 흰색 박스 그리기
          context.fillRect(
              Math.round(values.rect1X[0]),
              0,
              Math.round(whiteRectWidth),
              objs.canvas.height
          );
          context.fillRect(
              Math.round(values.rect2X[0]),
              0,
              Math.round(whiteRectWidth),
              objs.canvas.height
          );
        }

        break;

      case 3:
        // console.log('3 play');
        let step = 0;
        // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }

        canvas.style.transform = `scale(${canvasScaleRatio})`;
        context.fillStyle = 'white';
        const img = new Image();
        img.src = 'assets/main/image/blend-image-1.jpg';
        img.onload = (() => {
          context.drawImage(img, 0, 0);
        })

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth = this.platform.width() / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        if (!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          // @ts-ignore
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
          // @ts-ignore
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
          // @ts-ignore
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          // @ts-ignore
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 흰색 박스 그리기
        context.fillRect(
            parseInt(this.calcValues(values.rect1X, currentYOffset)),
            0,
            Math.round(whiteRectWidth),
            objs.canvas.height
        );
        context.fillRect(
            parseInt(this.calcValues(values.rect2X, currentYOffset)),
            0,
            Math.round(whiteRectWidth),
            objs.canvas.height
        );

        // @ts-ignore
        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          // console.log('캔버스 닿기 전');
          objs.canvas.classList.remove('sticky');
        } else {
          step = 2;
          // console.log('캔버스 닿은 후');
          // 이미지 블렌드
          // values.blendHeight: [ 0, 0, { start: 0, end: 0 } ]
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          // @ts-ignore
          values.blendHeight[2].start = values.rect1X[2].end;
          // @ts-ignore
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          const blendHeight = this.calcValues(values.blendHeight, currentYOffset);
          const img = new Image();
          img.src = 'assets/main/image/blend-image-2.jpg';
          img.onload = (() => {
            context.drawImage(img, 0,
                objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
                0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight);
          })

          objs.canvas.classList.add('sticky');
          objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
          // @ts-ignore
          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] = this.platform.width() / (1.5 * objs.canvas.width);
            // @ts-ignore
            values.canvas_scale[2].start = values.blendHeight[2].end;
            // @ts-ignore
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            canvas.style.transform = `scale(${this.calcValues(values.canvas_scale, currentYOffset)})`;
            canvas.style.marginTop = "0";
          }

          // @ts-ignore
          if (scrollRatio > values.canvas_scale[2].end
              // @ts-ignore
              && values.canvas_scale[2].end > 0) {
            objs.canvas.classList.remove('sticky');
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;
            // @ts-ignore
            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            // @ts-ignore
            values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;
            // @ts-ignore
            values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].star
            // @ts-ignorevalues.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;
            canvasCaption.style.opacity = this.calcValues(values.canvasCaption_opacity, currentYOffset);
            canvasCaption.style.transform = `translate3d(0, ${this.calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`;
          } else {
            // @ts-ignore
            canvasCaption.style.opacity = values.canvasCaption_opacity[0];
          }
        }

        break;
    }
  }

  scrollLoop() {
    this.enterNewScene = false;
    this.prevScrollHeight = 0;
    const currentContent = document.querySelector(`#show-scene-${this.currentScene}`);
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
      this.currentScene--;
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
      if (this.currentScene === 0 || this.currentScene === 2) {
        const currentYOffset = this.delayedYOffset - this.prevScrollHeight;
        const objs = this.sceneInfo[this.currentScene].objs;
        const values = this.sceneInfo[this.currentScene].values;
        let sequence = Math.round(this.calcValues(values.imageSequence, currentYOffset));
        console.log(sequence);
        console.log(objs.videoImages[sequence])
        if(this.currentScene === 0) {
          img.src = `assets/main/video/001/IMG_${6726 + sequence}.JPG`;
        } else if (this.currentScene === 2) {
          img.src = `assets/main/video/002/IMG_${7027 + sequence}.JPG`;
        }
        const context = this.sceneInfo[0].objs.canvas.getContext('2d');
        img.onload = (() => {
          context.drawImage(img, 0, 0);
        })
      }
    }

    // 일부 기기에서 페이지 끝으로 고속 이동하면 body id가 제대로 인식 안되는 경우를 해결
    // 페이지 맨 위로 갈 경우: scrollLoop와 첫 scene의 기본 캔버스 그리기 수행
    if (this.delayedYOffset < 1) {
      this.scrollLoop();
      canvas.style.opacity = "1";
      img.src = `assets/main/video/001/IMG_6726.JPG`;
      img.onload = (() => {
        context.drawImage(img, 0, 0);
      });
    }
    // 페이지 맨 아래로 갈 경우: 마지막 섹션은 스크롤 계산으로 위치 및 크기를 결정해야할 요소들이 많아서 1픽셀을 움직여주는 것으로 해결
    if ((this.platform.height() - window.innerHeight) - this.delayedYOffset < 1) {
      scrollTo(0, 0);
    }

    if (Math.abs(this.yOffset - this.delayedYOffset) > 1) {
      this.requestAni();
    }
  }

  scrollEvent(scrollTop) {
    this.yOffset = scrollTop;
    this.scrollLoop();
    this.checkMenu();
    this.softLoop();
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
