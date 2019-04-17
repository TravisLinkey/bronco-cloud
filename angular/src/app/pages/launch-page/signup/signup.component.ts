import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SystemService } from 'app/services/System.service';
import { WalletService } from 'app/services/Wallet.service';
import { StudentService } from 'app/services/Student.service';
import { AdminService } from 'app/services/Admin.service';

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
  providers: [StudentService, AdminService, WalletService, SystemService]
})
export class SignupComponent implements OnInit {
  selectedAccount: string;
  private headers: HttpHeaders;

  private participant;
  private identity;
  private spinnerOn = false;

  accounts: Account[] = [
    { value: 'Student', viewValue: 'Student' },
    { value: 'DeptAdmin', viewValue: 'Department Admin' }
  ]

  constructor(
    public studentService: StudentService,
    public adminService: AdminService,
    public systemService: SystemService,
    public walletService: WalletService,
    public httpClient: HttpClient,
    private router: Router
    ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream',
      'responseType': 'blob'
    });
  };

  ngOnInit() {
    this.setAdminDefault();
  }

  async setAdminDefault() {
    this.walletService.setDefault('admin');
  };

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

      // add the participant to the student registry
      this.participant = await this.studentService.addParticipant(this.participant).toPromise().catch((error) => {
        if (error === 'Server error') {
          console.log('Could not connect to REST server. Please check your configuration details');
        } else { console.log(error); }
      });

      // create card params
      this.identity = {
        'participant': 'org.cpp.csdept.user.Student#' + form.form.value.cpp_email,
        'userID': form.form.value.name,
        'options': {}
      }

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

      this.participant = await this.adminService.addParticipant(this.participant).toPromise().catch((error) => {
        if (error === 'Server error') {
          console.log('Could not connect to REST server. Please check your configuration details');
        } else { console.log(error); }
      });

      // create card params
      this.identity = {
        'participant': 'org.cpp.csdept.user.Admin#' + form.form.value.cpp_email,
        'userID': form.form.value.name,
        'options': {}
      }
    }
    
    // issue the new user's ID
    return this.systemService.issueId(this.identity).toPromise()
      .then((cardData) => {
        
        // import the card into the wallet
        return this.walletService.importCard(cardData, this.identity.userId)
          .toPromise()
          .then(() => {
            this.spinnerOn = false;

           this.router.navigate(['/signin']);
          })
      })
  }

}
