import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Department_AssetService } from 'app/services/Department_Asset.service';
import { NgForm } from '@angular/forms';
import { Checkout_AssetService } from 'app/services/Checkout_Asset.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dept-admin-checkout-tab',
  templateUrl: './checkout-tab.component.html',
  styleUrls: ['./checkout-tab.component.css'],
  providers: [Department_AssetService, Checkout_AssetService]
})
export class DeptAdminCheckoutTabComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
 
  private transaction;
  private spinnerOn = false;

  dept_assets = [
    // { "asset_name" : "Macbook", "available" : 1 },
    // { "asset_name" : "Computer Monitor", "available" : 3 },
    // { "asset_name" : "Linux Machine", "available" : 3 },
    // { "asset_name" : "VR Glasses", "available" : 6 },
  ];

  constructor(private assetService: Department_AssetService, private checkoutAssetService: Checkout_AssetService) { }

  ngOnInit() {
    this.loadAllAssets();
  }

  async loadAllAssets() {
    this.dept_assets = await this.assetService.getAll().toPromise();
  }

  async onSubmit(form: NgForm) {
    const user_name = form.form.value.user_name;
    const asset_name = this.getAssetName();

    // this.transaction = {
    //   $class: 'org.cpp.csdept.assets.Checkout_Item',
    //   'renter': user_name,
    //   'department_asset': asset_name,
    //   'transactionId': '',
    //   'timestamp': ''
    // };

    const asset = 'org.cpp.csdept.assets.Department_Asset#Rocks:2019-3-17::17::26'

    this.transaction = {
      $class: 'org.cpp.csdept.assets.Checkout_Item',
      'renter': 'org.cpp.csdept.user.Student#bill',
      'department_asset': asset,
      'transactionId': null,
      'timestamp': null
    };

    console.log(this.transaction);
    
    // TODO - checkout the item for the user
    this.checkoutAssetService.addTransaction(this.transaction);
  }

  getAssetName() {
    var value;
    
    this.checkboxes.forEach((asset) => {
      if(asset.nativeElement.checked == true)
      {
        value = asset.nativeElement.name;
      }
    })

    return value;
  }

  clearCheckBoxes() {
    this.checkboxes.forEach(element => {
        element.nativeElement.checked = false;
    });
  }



}
