import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Add_Money } from '../../../org.cpp.csdept.user';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class Add_MoneyService {

  private NAMESPACE = 'Add_Money';
  private currentCard;

  constructor(private dataService: DataService<Add_Money>, private walletService: WalletService) {
    this.currentCard = walletService.getCurrentCard();
  };

  public getAll(): Observable<Add_Money[]> {
      return this.dataService.getAll(this.currentCard, this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<Add_Money> {
    return this.dataService.getSingle(this.currentCard, this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<Add_Money> {
    return this.dataService.add(this.currentCard, this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<Add_Money> {
    return this.dataService.update(this.currentCard, this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<Add_Money> {
    return this.dataService.delete(this.currentCard, this.NAMESPACE, id);
  }

}

