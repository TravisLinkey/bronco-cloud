import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept-admin-checkin-tab',
  templateUrl: './checkin-tab.component.html',
  styleUrls: ['./checkin-tab.component.css']
})
export class DeptAdminCheckinTabComponent implements OnInit {

  options = [
    { "asset_name" : "Linux_Machine", "asset_Id" : "12345" },
    { "asset_name" : "Holo_Lenses", "asset_Id" : "12345" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
