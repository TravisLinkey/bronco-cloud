import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WalletService } from "./Wallet.service";
import { DataService } from "app/data.service";
import { User } from "app/org.cpp.csdept.user";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class QueryService {
    private NAMESPACE = 'Query';
    private currentCard;

    constructor(private dataService: DataService<User>,
        private walletService: WalletService,
        private httpClient: HttpClient,
        private router: Router
        ) {
        
            this.loadCurrentCard();
    }

    async loadCurrentCard() {
        this.currentCard = await this.walletService.getCurrentCard();
    }

    public isStudent(cpp_email: string): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.currentCard);

        return this.httpClient.get(`http://localhost:3001/api/queries/isStudent?cpp_email=${cpp_email}`, {
            withCredentials: true
        });
    }

    public isDeptAdmin(cpp_email: string): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.currentCard);

        return this.httpClient.get(`http://localhost:3001/api/queries/isDeptAdmin?cpp_email=${cpp_email}`, {
            withCredentials: true
        });
    }

    public getUserRentals(cpp_email: string): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.currentCard);

        return this.httpClient.get(`http://localhost:3001/api/queries/getUserRentals?cpp_email=${cpp_email}`, {
            withCredentials: true
        });
    }

    public getAllAvailableAssets(): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.currentCard);

        return this.httpClient.get('http://localhost:3001/api/queries/getAllAvailableAssets', {
            withCredentials: true
        });
    }

    public getStudentInfo(cpp_email: string): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.currentCard);

        return this.httpClient.get(`http://localhost:3001/api/queries/getStudentInfo?cpp_email=${cpp_email}`, {
            withCredentials: true
        });
    }

    public getAdminInfo(cpp_email: string): Observable<any> {
        const formData = new FormData();
        formData.append('card', this.currentCard);

        return this.httpClient.get(`http://localhost:3001/api/queries/getAdminInfo?cpp_email=${cpp_email}`, {
            withCredentials: true
        });
    }

}