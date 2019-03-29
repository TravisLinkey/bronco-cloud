import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../../services/Student.service';

export interface Account {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [StudentService]
})
export class SignupComponent implements OnInit {
  selectedAccount: string;

  accounts: Account[] = [
    {value: 'Student', viewValue: 'Student'},
    {value: 'DeptAdmin', viewValue: 'Department Admin'}
  ]

  user = {
    cpp_email: '',
    name: '',
    bronco_id: '',
    balance: 100,
    department: 'Computer Science'
  }

  constructor(public studentService: StudentService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.user.cpp_email = form.form.value.cpp_email;
    this.user.name = form.form.value.name;
    this.user.bronco_id = form.form.value.bronco_id;

    console.log(this.user);

    return this.studentService.addParticipant(this.user)
    .toPromise()
    .catch((error) => {
      if (error === 'Server error') {
        console.log('Could not connect to REST server. Please check your configuration details');
      } else {
        console.log(error);
      }
    });
  }

}
