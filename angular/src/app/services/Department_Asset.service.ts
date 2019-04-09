import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Department_Asset } from '../org.cpp.csdept.assets';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class Department_AssetService {

  private NAMESPACE = 'Department_Asset';

  constructor(private dataService: DataService<Department_Asset>) {
  };

  public getAll(): Observable<Department_Asset[]> {
    return this.dataService.getAll(this.NAMESPACE);
  }

  public getAsset(id: any): Observable<Department_Asset> {
    return this.dataService.getSingle(this.NAMESPACE, id);
  }

  public addAsset(itemToAdd: any): Observable<Department_Asset> {
    return this.dataService.add(this.NAMESPACE, itemToAdd);
  }

  public updateAsset(id: any, itemToUpdate: any): Observable<Department_Asset> {
    return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
  }

  public deleteAsset(id: any): Observable<Department_Asset> {
    return this.dataService.delete(this.NAMESPACE, id);
  }

}
