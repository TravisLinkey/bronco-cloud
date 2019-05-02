import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Return_Item } from '../../../org.cpp.csdept.assets';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class Return_ItemService {

  private NAMESPACE = 'Return_Item';
  private currentCard;

  constructor(private dataService: DataService<Return_Item>, private walletService: WalletService) {
    this.currentCard = walletService.getCurrentCard();
  };

  public getAll(): Observable<Return_Item[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<Return_Item> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<Return_Item> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<Return_Item> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<Return_Item> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

