import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-view-tab',
  templateUrl: './view-tab.component.html',
  styleUrls: ['./view-tab.component.css']
})
export class StudentViewTabComponent implements OnInit {
  current_out = [
    { "asset_name" : "Google Glasses", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
    { "asset_name" : "Macbook", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
    { "asset_name" : "Linux-Machine", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
    { "asset_name" : "VR-Goggles", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
    { "asset_name" : "Apple Pen", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
