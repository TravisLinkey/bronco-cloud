import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SystemService } from 'app/services/System.service';
import { WalletService } from 'app/services/Wallet.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

export interface Account {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SystemService]
})
export class SignupComponent implements OnInit {
  selectedAccount: string;
  private headers: HttpHeaders;

  private participant;
  private identity;
  private cardData;
  private spinnerOn = false;

  accounts: Account[] = [
    { value: 'Student', viewValue: 'Student' },
    { value: 'DeptAdmin', viewValue: 'Department Admin' }
  ]

  constructor(
    public systemService: SystemService,
    public walletService: WalletService,
    public httpClient: HttpClient,
    private router: Router) {
    this.headers = new HttpHeaders({
      // 'x-access-token': 'L11y3UgFW60jWpuprf1pNzArSAIJiR4M6jZGOq86ln6O4zFYYII4FcoPCzqRa6iG',
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream',
      'responseType': 'blob'
    });
  };

  ngOnInit() {
  }

  async onSubmit(form: NgForm) {
    const user_type = form.form.value.account;
    this.spinnerOn = true;

    // Create Student user
    if (user_type === 'Student') {

      // create user params
      this.participant = {
        $class: 'org.cpp.csdept.user.Student',
        'cpp_email': form.form.value.cpp_email,
        'name': form.form.value.name,
        'bronco_id': form.form.value.bronco_id,
        'balance': 100.00,
        'department': 'Computer Science'
      };

      // create card params
      this.identity = {
        'participant': 'org.cpp.csdept.user.Student#' + form.form.value.cpp_email,
        'userID': form.form.value.name,
        'options': {}
      }

      // add the participant to the student registry
      this.participant = await this.httpClient.post('http://localhost:3000/api/org.cpp.csdept.user.Student', this.participant).toPromise().catch((error) => {
        if (error === 'Server error') {
          console.log('Could not connect to REST server. Please check your configuration details');
        } else { console.log(error); }
      });

    } else {

      // Create Dept Admin user
      this.participant = {
        $class: 'org.cpp.csdept.user.Admin',
        'cpp_email': form.form.value.cpp_email,
        'name': form.form.value.name,
        'bronco_id': form.form.value.bronco_id,
        'balance': 100.00,
        'department': 'Computer Science'
      };

      // create card params
      this.identity = {
        participant: 'org.cpp.csdept.user.Admin#' + form.form.value.cpp_email,
        userID: form.form.value.name,
        options: {}
      }


      this.participant = await this.httpClient.post('http://localhost:3000/api/org.cpp.csdept.user.Admin', this.participant).toPromise().catch((error) => {
        if (error === 'Server error') {
          console.log('Could not connect to REST server. Please check your configuration details');
        } else { console.log(error); }
      });
    }

    console.log('Identity: ');
    console.log(this.identity);

    return this.httpClient.post('http://localhost:3000/api/system/identities/issue', this.identity, { responseType: 'blob' }).toPromise()
      .then((cardData) => {
        console.log('Card Data');
        console.log(cardData);

        const file = new File([cardData], `${this.identity.userID}`, { type: 'application/octet-stream', lastModified: Date.now() });

        const formData = new FormData();
        formData.append('card', file);

        const headers = new HttpHeaders();
        headers.set('Content-Type', 'multipart/form-data');

        return this.httpClient.post('http://localhost:3001/api/wallet/import', formData, {
          withCredentials: true,
          headers
        })
          .toPromise()
          .then(() => {
            this.spinnerOn = false;

            console.log(user_type)

            // redirect the user based on what type of credentials they have
            if(user_type === 'Student')
              this.router.navigate(['/student']);
            else if(user_type === 'DeptAdmin') {
              this.router.navigate(['/departmentadmin']);
            }
          })
      })

  }

}
