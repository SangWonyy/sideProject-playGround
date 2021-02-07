import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FileService} from '../service/file.service';
import {ImgResourceService} from '../service/img/img.resource.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AppService} from "../service/app.service";
import {Platform} from "@ionic/angular";
import { HostListener } from '@angular/core';
const createKeyframe = require('create-keyframe')
const insertCss = require('insert-css');
@Component({
    selector: 'app-img-block',
    templateUrl: './img-block.page.html',
    styleUrls: ['./img-block.page.scss'],
    encapsulation: ViewEncapsulation.None
})


export class ImgBlockPage implements OnInit {
    public thumbnail;
    public imgList = [];
    public isMoreLoad = true;
    public animationType = 'block';
    public position = document.documentElement;
    public insertText = 'Please, Enter any text';
    constructor(public app: AppService, private fileService: FileService, private imgResourceService: ImgResourceService, public domSanitizer: DomSanitizer, public platform: Platform) {
    }

    @HostListener('document:mousemove', ['$event']) 
    onMouseMove(e) {
        this.position.style.setProperty('--moveX', e.clientX + 'px');
    }
    
    ngOnInit() {

    }

    async ionViewWillEnter() {
        this.insertAnimationBlock("../../assets/background/background.jpg");
        this.isMoreLoad = false;
        this.drawBlock();
    }

    drawBlock() {
        console.log('2 : drawBlock');
        const banner = document.querySelector('.banner');

        // this.platform.width() / (this.platform.width() * 0.05) = 20
        // this.platform.height() / (this.platform.height() * 0.05) = 20
        for(let i = 0; i < 20 * 20; i++) {
            banner.innerHTML += "<div class='blocks'></div>";
            banner.children[i].setAttribute('style', `animation-delay: ${i * 0.04}s`);
        }
    }

    async imgUpload(event) {
        this.isMoreLoad = true;
        document.querySelectorAll('.blocks').forEach((element) => element.parentNode.removeChild(element));
        const imgUrl = await this.getImgUrl(event);

        this.insertAnimationBlock(imgUrl);
        this.isMoreLoad = false;
        this.drawBlock();
    }

    async getImgUrl(event) {
        return new Promise((resolve, reject) => {
            try {
                let imgUrl;
                const fileList: FileList = event.target.files;
                if (fileList.length > 0) {
                    const file: File = fileList[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e: any) => {
                        imgUrl = e.target.result;
                        resolve(imgUrl);
                    };
                }
            } catch (e) {
                reject(e);
            }
        })
    }

    file_input_rest(event) {
        event.target.value = null;
    }

    changeType(changeValue) {
        if(changeValue === 'text') {

        }
    }

    insertAnimationBlock(imgUrl) {
        const insertBackground = createKeyframe({
            0: {
                opacity: 0,
                transform: 'scale(0) translateY(400px)'
            },
            50: {
                opacity: 1,
                background: `url(${imgUrl}) fixed center/cover`
            },
            100: {
                opacity: 1,
                transform: 'scale(1) translateY(0px)',
                background: `url(${imgUrl}) fixed center/cover`
            }
        }, 'animate')

        insertCss(insertBackground.css);
    }

    // async file_upload(event) {
    //     for (const file of event.target.files) {
    //         await this.handleFileList(file);
    //     }
    // }
    //
    // async handleFileList(file) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const reader = new FileReader();
    //             if (file.type !== 'image/svg+xml') {
    //                 reader.readAsDataURL(file);
    //             } else {
    //                 reader.readAsText(file);
    //             }
    //             const imgData = await this.readerEvent(reader, file);
    //
    //             await this.imgUpload(imgData);
    //             resolve(true);
    //         } catch (e) {
    //             reject(e);
    //         }
    //     });
    //
    // }
    //
    // async imgUpload(imgData) {
    //     const inputImgResource = new ModelImgResourceBasic();
    //     inputImgResource.base64 = imgData.base64;
    //     inputImgResource.fabricObject = JSON.stringify(imgData.fabricObject);
    //     try {
    //         const {data} = await this.imgResourceService.imgResourceUpload(inputImgResource).toPromise();
    //         this.imgList.push(data);
    //
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    //
    // async deleteImg(imgId) {
    //     try {
    //         this.imgList = this.imgList.filter((img) => img.imgId !== imgId);
    //         await this.imgResourceService.imgResourceDelete(imgId).toPromise();
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
    //
    // async readerEvent(reader, file) {
    //     const fileArr: File[] = [];
    //     return new Promise((resolve, reject) => {
    //         try {
    //             reader.addEventListener('load', async () => {
    //                 // 썸네일생성
    //                 if (typeof reader.result === 'string') {
    //                     // tslint:disable-next-line:variable-name
    //                     const string = reader.result;
    //                     let fabricObject;
    //                     if (file.type === 'image/svg+xml') {
    //                         fabricObject = await this.svgStringToFabricObject(string); // svg => fabric
    //                     } else {
    //                         fabricObject = await this.imgToFabricObj(string); // png => fabric
    //                     }
    //
    //                     const base64 = fabricObject.toDataURL({
    //                         format: 'jpeg',
    //                         quality: 0.8
    //                     });
    //                     resolve({fabricObject, base64});
    //
    //                 } else {
    //                     reject('reader error');
    //                 }
    //             });
    //         } catch (e) {
    //             reject(e);
    //         }
    //
    //     });
    // }
    //
    // async svgStringToFabricObject(svgString: string) {
    //     return new Promise((resolve, reject) => {
    //         fabric.loadSVGFromString(svgString, (objects, options) => {
    //             const loadedObjects = fabric.util.groupSVGElements(objects, options);
    //             // @ts-ignore
    //             loadedObjects.set({
    //                 originX: 'center',
    //                 originY: 'center',
    //                 left: 540,
    //                 top: 540
    //             });
    //             resolve(loadedObjects);
    //         });
    //
    //     });
    // }
    //
    // async imgToFabricObj(url) {
    //     return new Promise((resolve, reject) => {
    //         try {
    //             // tslint:disable-next-line:only-arrow-functions
    //             fabric.Image.fromURL(url, function(objects) {
    //                 // @ts-ignore
    //                 objects.set({
    //                     originX: 'center',
    //                     originY: 'center',
    //                     left: 540,
    //                     top: 540,
    //                 });
    //                 resolve(objects);
    //             });
    //         } catch (e) {
    //             reject(e);
    //         }
    //     });
    // }
    //
    //
    // async fetchObj(url) {
    //     const res = await fetch(url);
    //     const OBJ = await res.json();
    //     debugger
    // }
    //
    // fetchUrl(url) {
    //     return fetch(url)
    //         .then(response => response.blob())
    //         .then(blob => new Promise((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.onloadend = () => resolve(reader.result);
    //             reader.onerror = reject;
    //             reader.readAsDataURL(blob);
    //         }));
    // }

}
