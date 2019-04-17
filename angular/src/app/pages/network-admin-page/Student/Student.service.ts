import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Student } from '../../../org.cpp.csdept.user';
import 'rxjs/Rx';
import { WalletService } from 'app/services/Wallet.service';

// Can be injected into a constructor
@Injectable()
export class StudentService {

  private NAMESPACE = 'Student';
  private currentCard;

  constructor(private dataService: DataService<Student>, private walletService: WalletService) {
    this.currentCard = walletService.getCurrentCard();
  };

  public getAll(): Observable<Student[]> {
    return this.dataService.getAll(this.currentCard, this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Student> {
    return this.dataService.getSingle(this.currentCard, this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Student> {
    return this.dataService.add(this.currentCard, this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Student> {
    return this.dataService.update(this.currentCard, this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Student> {
    return this.dataService.delete(this.currentCard, this.NAMESPACE, id);
  }

}
