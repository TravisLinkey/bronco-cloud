import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Checkout_AssetService } from 'app/services/Checkout_Asset.service';
import { QueryService } from 'app/services/Query.service';
import { DepartmentAdminPageService } from '../department-admin-page.service';

@Component({
  selector: 'app-dept-admin-checkout-tab',
  templateUrl: './checkout-tab.component.html',
  styleUrls: ['./checkout-tab.component.css'],
  providers: [QueryService, Checkout_AssetService]
})
export class DeptAdminCheckoutTabComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<ElementRef>;
 
  private transaction;
  private spinnerOn = false;
  private checkoutMessage = false;
  private dept_assets = [];

  constructor(
    private queryService: QueryService,
    private checkoutAssetService: Checkout_AssetService,
    private departmentAdminPageService: DepartmentAdminPageService,
    ) {}

  async ngOnInit() {
    // subscribe to button-click-event subject
    this.departmentAdminPageService.assetCreated.subscribe(
      async () => {
        console.log('UPDATING ASSETS');
        await this.loadAllAssets();
      });

      await this.loadAllAssets();
  }

  async loadAllAssets() {
    this.dept_assets = await this.queryService.getAllAvailableAssets().toPromise()
    .catch((error) => {
      console.log(error);
    })
  }

  async onSubmit(form: NgForm) {
    this.spinnerOn = true;
    const user_name = form.form.value.user_name;
    const asset_Id = this.getAssetName();

    // TODO - need some verification that the student exists
    // var student = await this.queryService.getStudentInfo(user_name).toPromise();
    // console.log(student);

    this.transaction = {
      $class: 'org.cpp.csdept.assets.Checkout_Item',
      'renter': `org.cpp.csdept.user.Student#${user_name}`,
      'department_asset': `org.cpp.csdept.assets.Department_Asset#${asset_Id}`,
      'transactionId': null,
      'timestamp': null
    };
    
    // Checkout the item for the user
    await this.checkoutAssetService.addTransaction(this.transaction).toPromise()
    .catch((error) => {
      console.log(error);
    })
    // Reset the spinner and display the checkout message
    .then(() => {
      this.spinnerOn = false;

      setTimeout(()=> {
        this.checkoutMessage = false;
      }, 3000);

      this.checkoutMessage = true;
    })
    // Reload the assets after new checkout was created
    .then(async () => {
      await this.loadAllAssets();
    })
    // Emit asset created event
    .then(() => {
      this.departmentAdminPageService.rentalCreated.next();
    })
  }

  async checkoutAsset(form: NgForm) {}

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
