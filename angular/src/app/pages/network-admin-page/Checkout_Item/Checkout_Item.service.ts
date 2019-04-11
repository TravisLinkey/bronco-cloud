import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Checkout_Item } from '../../../org.cpp.csdept.assets';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class Checkout_ItemService {

  private NAMESPACE = 'org.cpp.csdept.assets.Checkout_Item';

  constructor(private dataService: DataService<Checkout_Item>) {
  };

  public getAll(): Observable<Checkout_Item[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<Checkout_Item> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<Checkout_Item> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<Checkout_Item> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<Checkout_Item> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

