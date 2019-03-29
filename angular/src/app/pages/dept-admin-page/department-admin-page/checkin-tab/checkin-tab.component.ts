import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkin-tab',
  templateUrl: './checkin-tab.component.html',
  styleUrls: ['./checkin-tab.component.css']
})
export class CheckinTabComponent implements OnInit {

  options = [
    { "asset_name" : "Linux_Machine", "asset_Id" : "12345" },
    { "asset_name" : "Holo_Lenses", "asset_Id" : "12345" },
  ];

  constructor() { }

  ngOnInit() {
  }

}
