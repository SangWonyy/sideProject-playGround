import {Injectable} from '@angular/core';
import {GraphqlApiService} from '../graphql.api.service';
import gql from 'graphql-tag';
import {map, retry} from 'rxjs/operators';
import { FetchResult } from 'apollo-link';
import { Observable } from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';
@Injectable({
    providedIn: 'root'
})

export class ImgResourceService {

    constructor(public graphql: GraphqlApiService) {
    }

    // 이미지 url get
    getImgSource(): Observable<ApolloQueryResult<any>> {
        return this.graphql.query(gql`
                        query {
                            getImgSource {
                                imgId
                                base64
                                fabricObject
                            }
                        }`
        ).pipe(map((result) => {
            result.data = result.data.getImgSource;
            return result;
        }));
    }

    imgResourceUpload(imgData): Observable<FetchResult<any>> {
        return this.graphql.mutate(gql`
                        mutation ($imgData:InputImgResourceCreate!) {
                            imgResourceUpload(imgData: $imgData) {
                                imgId
                                base64
                            }
                        }`,
            {
                imgData
            }
        ).pipe(
            map((result) => {
                result.data = result.data.imgResourceUpload;
                return result;
            })
        );
    }

    imgResourceDelete(imgId: number): Observable<FetchResult<any>> {
        return this.graphql.mutate(gql`
                        mutation ($imgId:ID!){
                            imgResourceDelete(imgId: $imgId)
                        }`,
            {
                imgId
            }
        ).pipe(
            map((result) => {
                result.data = result.data.imgResourceDelete;
                return result;
            })
        );
    }

}
