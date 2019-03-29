import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Create_Asset } from '../../../org.cpp.csdept.assets';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class Create_AssetService {

  private NAMESPACE = 'Create_Asset';

  constructor(private dataService: DataService<Create_Asset>) {
  };

  public getAll(): Observable<Create_Asset[]> {
      return this.dataService.getAll(this.NAMESPACE);
  }

  public getTransaction(id: any): Observable<Create_Asset> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addTransaction(itemToAdd: any): Observable<Create_Asset> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateTransaction(id: any, itemToUpdate: any): Observable<Create_Asset> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteTransaction(id: any): Observable<Create_Asset> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}

