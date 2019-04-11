import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dept-admin-rentals-tab',
  templateUrl: './rentals-tab.component.html',
  styleUrls: ['./rentals-tab.component.css']
})
export class DeptAdminRentalsTabComponent implements OnInit {
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
