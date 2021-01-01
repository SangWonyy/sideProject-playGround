import {IsNotEmpty, ValidateIf} from 'class-validator';


export class ModelImgResourceBasic {

    constructor(data?: Partial<ModelImgResourceBasic>) {
        if (data != null) {
            Object.assign(this, data);
        }
    };

    // validator 사용법 : https://github.com/typestack/class-validator#usage
    // validator 리스트 : https://github.com/typestack/class-validator#validation-decorators
    @IsNotEmpty() fabricObject: string;
    @IsNotEmpty() base64: string;
}



