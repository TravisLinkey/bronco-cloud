import { Injectable } from "@angular/core";
import { DataService } from "app/data.service";
import { User } from "app/org.cpp.csdept.user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class WalletService {
    private NAMESPACE = 'wallet';

    constructor(
        private dataService: DataService<User>,
        public httpClient: HttpClient) {};

    public importCard(id: any): Observable<any> {
        console.log('ASSET:');
        console.log(id);

        const data = {
            'card' : id.card,
            'name' : id.name
        };

        const file = new File([id.card], `${id.name}`, { type: 'application/octect-stream', lastModified: Date.now() });

        const formData = new FormData();
        formData.append('card', file);
        
        
        // return this.dataService.add(this.NAMESPACE+`/import?name=${data.name}`, formData);
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');
        return this.httpClient.post('http://localhost:3000/api/wallet/import', formData, {
          withCredentials: true,
          headers
        })
    }

    public setDefault(id: any): Observable<User> {
        return this.dataService.add(this.NAMESPACE+`/${id}/setDefault`, id);
    }
}