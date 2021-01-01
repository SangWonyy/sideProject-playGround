import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FileService {
    public isBase64 = require('is-base64');

    constructor() {
    }

    // blob -> file
    public blobToFile = (theBlob: object, fileName: string): File => {
        const b: any = theBlob;
        const fabricFile = new File([b], fileName);
        return fabricFile;
    };

    public base64ToArrayBuffer(base64Data: string): ArrayBuffer {
        const byteString = atob(base64Data.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        // ia 지우면 안된다 arraybuffer 의 view로 사용
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return ab;
    }


    // base64 -> file
    public async b64toFile(dataURI, baseName): Promise<File> {
        try {
            let base64Data: string;
            if (this.isBase64(dataURI, { allowMime: true })) {
                base64Data = dataURI;
            } else {
                throw new Error('it is not base64');
            }
            const ab = this.base64ToArrayBuffer(base64Data);
            const blob = new Blob([ab], { type: 'text/plain' });
            const baseFile = new File([blob], baseName, { type: 'text/plain', lastModified: new Date().getTime() });
            return baseFile;
        } catch (e) {
            return null;
        }
    }


    base64ToFile(base64Image: string): Blob {
        const split = base64Image.split(',');
        const type = split[0].replace('data:', '').replace(';base64', '');
        const byteString = atob(split[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type });
    }

    // fabric -> File
    public fabricToFile(fabric) {
        const json = JSON.stringify(fabric);
        const fabricObjectBlob = new Blob([json], {
            type: 'application/json',
        });
        const fabricFile = this.blobToFile(fabricObjectBlob, 'fabric');
        return fabricFile;
    }

    public fabricToBlob(fabric) {
        const json = JSON.stringify(fabric);
        const fabricObjectBlob = new Blob([json], {
            type: 'application/json',
        });

        return fabricObjectBlob;
    }


}
