import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept-admin-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css']
})
export class DeptAdminInfoTabComponent implements OnInit {

  user_info = {
    "email" : "ndavarpannah@gmail.com",
    "name" : "Nima Davarpannah",
    "bronco_Id" : "57246987",
    "balance" : "100.00",
    "department" : "Computer Science"
  }

  constructor() { }

  ngOnInit() {
  }

}
