import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Delete_Asset } from '../../../org.cpp.csdept.assets';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class Delete_AssetService {

  private NAMESPACE = 'Delete_Asset';
  private currentCard;

  constructor(private dataService: DataService<Delete_Asset>, private walletService: WalletService) {
  };

  public getAll(): Observable<Delete_Asset[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<Delete_Asset> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<Delete_Asset> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<Delete_Asset> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<Delete_Asset> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

