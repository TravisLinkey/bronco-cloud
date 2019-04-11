import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';


@Component({
  selector: 'app-dept-admin-checkout-tab',
  templateUrl: './checkout-tab.component.html',
  styleUrls: ['./checkout-tab.component.css']
})
export class DeptAdminCheckoutTabComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
 
  dept_assets = [
    { "asset_name" : "Macbook", "available" : 1 },
    { "asset_name" : "Computer Monitor", "available" : 3 },
    { "asset_name" : "Linux Machine", "available" : 3 },
    { "asset_name" : "VR Glasses", "available" : 6 },
  ];
  constructor() { }

  ngOnInit() {
  }

  clearCheckBoxes() {
    this.checkboxes.forEach(element => {
        element.nativeElement.checked = false;
    });
  }

}
