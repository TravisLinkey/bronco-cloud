import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Department_Asset } from '../org.cpp.csdept.assets';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class Department_AssetService {

  private NAMESPACE = 'Department_Asset';
  private currentCard;

  constructor(private dataService: DataService<Department_Asset>, private walletService: WalletService) {
    this.currentCard = walletService.getCurrentCard();
  };

  public getAll(): Observable<Department_Asset[]> {
    return this.dataService.getAll(this.currentCard, this.NAMESPACE);
  }

  public getAsset(id: any): Observable<Department_Asset> {
    return this.dataService.getSingle(this.currentCard, this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<Department_Asset> {
    return this.dataService.add(this.currentCard, this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<Department_Asset> {
    return this.dataService.update(this.currentCard, this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<Department_Asset> {
    return this.dataService.delete(this.currentCard, this.NAMESPACE, id);
  }

}
