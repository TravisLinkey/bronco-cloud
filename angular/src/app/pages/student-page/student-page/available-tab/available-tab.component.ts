import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-available-tab',
  templateUrl: './available-tab.component.html',
  styleUrls: ['./available-tab.component.css']
})

export class StudentAvailableTabComponent implements OnInit {

  dept_assets = [
    { "asset_name" : "Macbook", "available" : 1 },
    { "asset_name" : "Computer Monitor", "available" : 3 },
    { "asset_name" : "Linux Machine", "available" : 3 },
    { "asset_name" : "VR Glasses", "available" : 6 },
  ];

  textValue: 'This is an element';

  constructor() { }

  ngOnInit() {}

}
