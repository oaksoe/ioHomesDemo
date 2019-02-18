import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { HttpService } from '../api/http.service';

@Injectable()
export class Items {

  constructor(public api: HttpService<any>) { }

  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
