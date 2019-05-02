import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Rental } from '../../../org.cpp.csdept.assets';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class RentalService {

  private NAMESPACE = 'Rental';
  private currentCard;

  constructor(private dataService: DataService<Rental>, private walletService: WalletService) {
    this.currentCard = this.walletService.getCurrentCard();
  };

  public getAll(): Observable<Rental[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<Rental> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<Rental> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<Rental> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<Rental> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
