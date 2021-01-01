import {Injectable} from '@angular/core';
import {GraphqlApiService} from '../graphql.api.service';
import gql from 'graphql-tag';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class UserService {


    constructor(public graphql: GraphqlApiService) {
    }

    // create user
    public createUser() {
        return this.graphql.mutate(gql`
                      mutation{
                           createUser
                      }`,
            {
            }
        ).pipe(map(
            (result) => {
                result.data = result.data.createUser;
                return result;
            }
        )).toPromise();
    }
}
