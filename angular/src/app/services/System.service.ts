import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { Observable } from "rxjs";
import { User } from '../org.cpp.csdept.user';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { IssueIdentity } from "app/org.hyperledger.composer.system";

@Injectable()
export class SystemService {
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient, private dataService: DataService<User>) {
        this.headers = new HttpHeaders({
            // 'x-access-token': 'L11y3UgFW60jWpuprf1pNzArSAIJiR4M6jZGOq86ln6O4zFYYII4FcoPCzqRa6iG',
            'Content-Type': 'application/json',
            'Accept': 'application/octet-stream',
            'responseType': 'blob'
        });

    };

    public issueid(id: any): Observable<any> {

        return this.httpClient.post('http://localhost:3000/api/system/identities/issue', id, {
            observe: 'body',
            responseType: 'blob',
            headers: this.headers
        });
    }


  public issueID(itemToAdd: any): Observable<User> {
    const NAMESPACE = 'System';

    return this.dataService.add(NAMESPACE, itemToAdd);
  }
}