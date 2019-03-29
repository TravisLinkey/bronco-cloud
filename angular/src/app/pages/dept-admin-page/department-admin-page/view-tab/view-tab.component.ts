import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept-admin-view-tab',
  templateUrl: './view-tab.component.html',
  styleUrls: ['./view-tab.component.css']
})
export class DeptAdminViewTabComponent implements OnInit {
  current_out = [
    { "asset_name" : "Macbook", "checked_out" : "10:15:2019", "owner" : "Travis Linkey", "due_by" : "10:17:2019", "overdue" : "false" },
    { "asset_name" : "Linux-Machine", "checked_out" : "10:15:2019", "owner" : "Zurone Chen", "due_by" : "10:17:2019", "overdue" : "false" },
    { "asset_name" : "VR_Goggles", "checked_out" : "10:15:2019", "owner" : "David Barnes", "due_by" : "10:17:2019", "overdue" : "false" },
    { "asset_name" : "Mini_Drone", "checked_out" : "10:15:2019", "owner" : "Nima Davarpannah", "due_by" : "10:17:2019", "overdue" : "true" },
  ]

  constructor() { }

  ngOnInit() {
  }

}
