import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const uri = 'http://localhost:8080/graphql';

export function createApollo(httpLink: HttpLink) {
    // 모든 graphql 요청 전송 전에 실행됨.
    // localStorage에서 토큰이 있으면 요청 헤더에 추가
    const token = localStorage.getItem('tokenGraphql');
    const auth = setContext((operation, context) => ({
        headers: {
            authorization: token
        },
    }));
    const link = token != null
        ? ApolloLink.from([auth, httpLink.create({ uri })])
        : httpLink.create({ uri });

    return {
        link: link,
        cache: new InMemoryCache(),
    };
}

// deps
// The deps property is an array of provider tokens.
// HttpLink classes serve as tokens for their own class providers.
// The injector resolves these tokens and injects the corresponding services into the matching factory function parameters

// useFactory
// The useFactory field tells Angular that the provider is a factory function whose implementation is createApollo.
@NgModule({
    exports: [ApolloModule, HttpLinkModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
