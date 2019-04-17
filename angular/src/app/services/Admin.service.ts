import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Admin } from '../org.cpp.csdept.user';
import { WalletService } from './Wallet.service';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AdminService {

  private NAMESPACE = 'Admin';
  private currentCard;

  constructor(private dataService: DataService<Admin>, private walletService: WalletService) {
    this.currentCard = walletService.getCurrentCard();
    console.log(`current card: ${this.currentCard}`);
  };

  public getAll(): Observable<Admin[]> {
    return this.dataService.getAll(this.currentCard, this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Admin> {
    return this.dataService.getSingle(this.currentCard, this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Admin> {
    return this.dataService.add(this.currentCard, this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Admin> {
    return this.dataService.update(this.currentCard, this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Admin> {
    return this.dataService.delete(this.currentCard, this.NAMESPACE, id);
  }

}
