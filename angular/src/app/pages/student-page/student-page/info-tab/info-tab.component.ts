import { Component, OnInit } from '@angular/core';
import { StudentService } from 'app/services/Student.service';
import { HttpClient } from '@angular/common/http';
import { WalletService } from 'app/services/Wallet.service';

@Component({
  selector: 'app-student-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css'],
  providers: [
    StudentService
  ]
})
export class StudentInfoTabComponent implements OnInit {
  
  public user_info = {
    name: '',
    email: '',
    bronco_Id: 0,
    balance: 0,
    department: ''
  };
  public user;
  public user_Id = 'jeremy';
  public errorMessage;

  constructor(private walletService: WalletService, private studentService: StudentService) { }

  ngOnInit() {
    this.loadInfo();
  }
  
  async loadInfo() {
    const user_name = this.walletService.user_name;
    const student = await this.studentService.getparticipant(user_name).toPromise();

    this.user_info = {
      name: student.name,
      email: student.cpp_email,
      bronco_Id: student.bronco_id,
      balance: student.balance,
      department: student.department
    }
  }
  
}
