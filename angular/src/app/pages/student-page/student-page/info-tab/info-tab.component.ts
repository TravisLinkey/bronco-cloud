import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css']
})
export class StudentInfoTabComponent implements OnInit {
  
  public user_info = {
    name: '',
    email: '',
    bronco_Id: '',
    balance: '',
    department: ''
  };

  constructor() { }

  ngOnInit() {}

}
