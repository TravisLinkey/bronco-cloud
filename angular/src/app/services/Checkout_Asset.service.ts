import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Checkout_Item } from '../org.cpp.csdept.assets';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class Checkout_AssetService {

  private NAMESPACE = 'Checkout_Item';
  private currentCard;

  constructor(private dataService: DataService<Checkout_Item>) {
  };

  public getAll(): Observable<Checkout_Item[]> {
      return this.dataService.getAll(this.currentCard, this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<Checkout_Item> {
    return this.dataService.getSingle(this.currentCard, this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<Checkout_Item> {
    return this.dataService.add(this.currentCard, this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<Checkout_Item> {
    return this.dataService.update(this.currentCard, this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<Checkout_Item> {
    return this.dataService.delete(this.currentCard, this.NAMESPACE, id);
  }

}

