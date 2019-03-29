import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-admin-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.css']
})
export class DepartmentAdminHomeTabComponent implements OnInit {

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
