import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home-tab',
  templateUrl: './home-tab.component.html',
  styleUrls: ['./home-tab.component.css']
})
export class StudentHomeTabComponent implements OnInit {
  
  user_info = {
    "email" : "tlinkey@gmail.com",
    "name" : "Travis Linkey",
    "bronco_Id" : "011722438",
    "balance" : "100.00",
    "department" : "Computer Science"
  }

  constructor() { }

  ngOnInit() {
  }

}
