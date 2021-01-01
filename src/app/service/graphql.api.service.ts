import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {DocumentNode} from 'graphql';
import {ApolloQueryResult} from 'apollo-client';
import {Observable} from 'rxjs';
import {FetchResult} from 'apollo-link';
// import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqlApiService {

  constructor(private apollo: Apollo) {}

  query(gql: DocumentNode, variables: any = {}): Observable<ApolloQueryResult<any>> {
    // https://github.com/kamilkisiela/apollo-angular
    // https://www.apollographql.com/docs/angular/basics/queries/
    return this.apollo.query({
      query: gql,
      variables: variables,
      fetchPolicy: 'no-cache'
    });
  }
  mutate(gql: DocumentNode, variables: any = {}): Observable<FetchResult<any>> {
    // https://github.com/kamilkisiela/apollo-angular
    // https://www.apollographql.com/docs/angular/basics/mutations/
    return this.apollo.mutate({
      mutation: gql,
      variables: variables,
      context: {useMultipart: true},
      fetchPolicy: 'no-cache'
    });
  }

  // // We use the gql tag to parse our query string into a query document
  // CurrentUserForProfile = gql`
  //   query CurrentUserForProfile {
  //     currentUser {
  //       login
  //       avatar_url
  //     }
  //   }
  // `;

}
