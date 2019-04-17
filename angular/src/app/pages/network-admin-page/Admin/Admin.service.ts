import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Admin } from '../../../org.cpp.csdept.user';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class AdminService {

  private NAMESPACE = 'Admin';
  private currrentCard;

  constructor(private dataService: DataService<Admin>, private walletService: WalletService) {
    this.currrentCard = this.walletService.getCurrentCard;
  };

  public getAll(): Observable<Admin[]> {
    return this.dataService.getAll(this.currrentCard, this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Admin> {
    return this.dataService.getSingle(this.currrentCard, this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Admin> {
    return this.dataService.add(this.currrentCard, this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Admin> {
    return this.dataService.update(this.currrentCard, this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Admin> {
    return this.dataService.delete(this.currrentCard, this.NAMESPACE, id);
  }

}
