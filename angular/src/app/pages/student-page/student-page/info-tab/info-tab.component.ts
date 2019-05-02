import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/services/Student.service';
import { HttpClient } from '@angular/common/http';
import { WalletService } from 'app/services/Wallet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css']
})
export class StudentInfoTabComponent implements OnInit {
  
  public user_info = {
    name: '',
    email: '',
    bronco_Id: null,
    balance: null,
    department: ''
  };
  public user;
  public user_Id = '';
  public errorMessage;

  constructor(
    private walletService: WalletService,
    private studentService: StudentService,
    private router: Router) { }

  ngOnInit() {
    this.loadInfo();
  }
  
  async loadInfo() {
    const user_name = this.walletService.user_name;
    const student = await this.studentService.getparticipant(user_name).toPromise()
    .catch((error) => {
      if(error === '404 - Not Found') {
        this.router.navigate(['signin']);
        }
      })

    if(student) {
      this.user_info = {
        name: student.name,
        email: student.cpp_email,
        bronco_Id: student.bronco_id,
        balance: student.balance,
        department: student.department
      }
    }
  }
  
}
