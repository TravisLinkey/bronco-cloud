import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { User } from '../org.cpp.csdept.user';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { WalletService } from "./Wallet.service";

@Injectable()
export class SystemService {
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient, private walletService: WalletService) {
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            'responseType': 'blob'
        });
    };

    public issueId(id: any): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.walletService.getCurrentCard());

        return this.httpClient.post('http://localhost:3001/api/system/identities/issue', id, {
            observe: 'body',
            responseType: 'blob',
            headers: this.headers,
            withCredentials: true
        });
    }
}