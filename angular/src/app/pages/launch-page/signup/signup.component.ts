import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SystemService } from 'app/services/System.service';
import { WalletService } from 'app/services/Wallet.service';
import { StudentService } from 'app/services/Student.service';
import { AdminService } from 'app/services/Admin.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { QueryService } from 'app/services/Query.service';


export interface Account {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [StudentService, AdminService, WalletService,]
})
export class SignupComponent implements OnInit {
  selectedAccount: string;
  private headers: HttpHeaders;

  private participant;
  private identity;
  private spinnerOn = false;
  private alertMessage = {
    'message': '',
    'activated': false
  };

  accounts: Account[] = [
    { value: 'Student', viewValue: 'Student' },
    { value: 'DeptAdmin', viewValue: 'Department Admin' }
  ];

  constructor(
    public studentService: StudentService,
    public adminService: AdminService,
    public queryService: QueryService,
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
  };

  async setAdminDefault() {
    this.walletService.setDefault('admin');
  };

  async onSubmit(form: NgForm) {
    const cpp_email = form.form.value.cpp_email;
    const user_name = form.form.value.name;
    const bronco_id = form.form.value.bronco_id;

    const user_type = form.form.value.account;
    this.spinnerOn = true;

    const student_found = await this.queryService.getStudentInfo(cpp_email).toPromise();
    const admin_found = await this.queryService.getAdminInfo(cpp_email).toPromise();

    console.log('STUDENT FOUND');
    console.log(student_found);

    console.log('ADMIN FOUND');
    console.log(admin_found);

    // check if user already exists
    if (student_found.length == 0 && admin_found.length == 0) {

      // Create Student user
      if (user_type === 'Student') {

        // create user params
        this.participant = {
          $class: 'org.cpp.csdept.user.Student',
          'cpp_email': cpp_email,
          'name': user_name,
          'bronco_id': bronco_id,
          'balance': 100.00,
          'department': 'Computer Science'
        };

        // Add the participant to the student registry
        this.participant = await this.studentService.addParticipant(this.participant).toPromise().catch((error) => {

          if (error === 'Server error') {
            console.log('Could not connect to REST server. Please check your configuration details');
          } else if (error === '500 - Internal Server Error') {
            this.userExistsError();
            return;
          } else {
            console.log(error);
          }
        });

        // Create card params
        this.identity = {
          'participant': 'org.cpp.csdept.user.Student#' + cpp_email,
          'userID': form.form.value.name,
          'options': {}
        }

      // user is a department admin
      } else {

        // Create Dept Admin user
        this.participant = {
          $class: 'org.cpp.csdept.user.Admin',
          'cpp_email': cpp_email,
          'name': user_name,
          'bronco_id': bronco_id,
          'balance': 100.00,
          'department': 'Computer Science'
        };

        // Add the participant to the respective registry
        this.participant = await this.adminService.addParticipant(this.participant).toPromise().catch((error) => {

          if (error === 'Server error') {
            console.log('Could not connect to REST server. Please check your configuration details');
          } else if (error === '500 - Internal Server Error') {
            this.userExistsError();
            return;

          } else {
            console.log(error);
            return;
          }
        });

        // create card params
        this.identity = {
          'participant': 'org.cpp.csdept.user.Admin#' + form.form.value.cpp_email,
          'userID': user_name,
          'options': {}
        }
      }

      // Issue the new user's ID
      const cardData = await this.systemService.issueId(this.identity).toPromise()
        .catch((error) => {
          console.log(error);
        })

      // Import the card into the wallet
      await this.walletService.importCard(cardData, this.identity.userId).toPromise();

      this.spinnerOn = false;

      setTimeout(() => {
        this.alertMessage.activated = false;
        this.router.navigate(['/signin']);
      }, 3000);

      this.alertMessage.message = 'User Created!'
      this.alertMessage.activated = true;
    }
    // User with that cpp email already exists
    else {
      this.spinnerOn = false;

      setTimeout(() => {
        this.alertMessage.activated = false;
      }, 3000);

      this.alertMessage.message = 'User Already Exists with that cpp_email'
      this.alertMessage.activated = true;

    }

  }

  messageActive(): boolean {
    return this.alertMessage.activated;
  }

  userExistsError() {
    console.log('User Exists Error thrown');

    this.spinnerOn = false;
    this.alertMessage.message = 'User Already Exists!';

    setTimeout(() => {
      this.alertMessage.activated = false;
    }, 3000);


    this.alertMessage.activated = true;
  }

}
