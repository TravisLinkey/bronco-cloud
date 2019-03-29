import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-tab',
  templateUrl: './checkout-tab.component.html',
  styleUrls: ['./checkout-tab.component.css']
})

export class CheckoutTabComponent implements OnInit {

  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
  
  dept_assets = [
    { "asset_name" : "Shovel", "available" : 1 },
    { "asset_name" : "Ice", "available" : 3 },
    { "asset_name" : "Linux Machine", "available" : 3 },
    { "asset_name" : "VR Glasses", "available" : 6 },
  ];

  textValue: 'This is an element';

  constructor() { }

  ngOnInit() {
    
  }

  clearCheckBoxes() {
    this.checkboxes.forEach(element => {
        element.nativeElement.checked = false;
    });
  }

}
