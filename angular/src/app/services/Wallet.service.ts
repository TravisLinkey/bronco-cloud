import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class WalletService {
    public cardFile;
    private headers: HttpHeaders;
    public user_name: string;

    constructor(public httpClient: HttpClient) {
        this.headers = new HttpHeaders();
    };

    public importCard(cardData: any, userId: string): Observable<any> {

        // save the card for future use
        this.cardFile = new File([cardData], `${userId}`, { type: 'application/octect-stream', lastModified: Date.now() });

        const formData = new FormData();
        formData.append('card', this.cardFile);
        
        // return this.dataService.add(this.NAMESPACE+`/import?name=${data.name}`, formData);
        this.headers.set('Content-Type', 'multipart/form-data');

        return this.httpClient.post('http://localhost:3001/api/wallet/import', formData, {
          withCredentials: true,
        })
    }

    public setDefault(cardName: string): Observable<any> {
        this.user_name = cardName.replace('@bronco-cloud', '');
        this.importCard(cardName, this.user_name);

        return this.httpClient.post(`http://localhost:3001/api/wallet/${cardName}/setDefault`, this.user_name);
    }

    public getAllWallets(): Observable<{}> {
        const formData = new FormData();
        formData.append('card', this.cardFile);

        return this.httpClient.get('http://localhost:3001/api/wallet', {
            withCredentials: true
        });
    }

    public getUserWallet(user: string): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.cardFile);

        return this.httpClient.get(`http://localhost:3001/api/wallet/${user}`, {
            withCredentials: true
        })
    }

    public getCurrentCard(): File{
        return this.cardFile;
    } 
}