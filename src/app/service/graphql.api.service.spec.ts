import {TestBed} from '@angular/core/testing';

import {GraphqlApiService} from './graphql.api.service';

describe('Graphql.ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphqlApiService = TestBed.get(GraphqlApiService);
    expect(service).toBeTruthy();
  });
});
