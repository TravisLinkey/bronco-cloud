import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Admin } from '../org.cpp.csdept.user';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class AdminService {

  private NAMESPACE = 'Admin';

  constructor(private dataService: DataService<Admin>) {
  };

  public getAll(): Observable<Admin[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getparticipant(id: any): Observable<Admin> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addParticipant(itemToAdd: any): Observable<Admin> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateParticipant(id: any, itemToUpdate: any): Observable<Admin> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteParticipant(id: any): Observable<Admin> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
