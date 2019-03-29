import { Injectable } from '@angular/core';
import { DataService } from '../../../data.service';
import { Observable } from 'rxjs/Observable';
import { Rental } from '../../../org.cpp.csdept.assets';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class RentalService {

  private NAMESPACE = 'Rental';

  constructor(private dataService: DataService<Rental>) {
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
