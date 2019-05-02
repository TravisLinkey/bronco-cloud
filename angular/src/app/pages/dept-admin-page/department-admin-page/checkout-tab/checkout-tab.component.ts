import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Checkout_AssetService } from 'app/services/Checkout_Asset.service';
import { QueryService } from 'app/services/Query.service';
import { DepartmentAdminPageService } from '../department-admin-page.service';
import { Department_AssetService } from 'app/services/Department_Asset.service';
import { Department_Asset } from 'app/org.cpp.csdept.assets';
import { MatCheckbox } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dept-admin-checkout-tab',
  templateUrl: './checkout-tab.component.html',
  styleUrls: ['./checkout-tab.component.css']
})
export class DeptAdminCheckoutTabComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: QueryList<MatCheckbox>;

  private transaction;
  private spinnerOn = false;
  private dept_assets = [];
  private userExists = false;
  private checkoutMessage = {
    message: ''
  };

  constructor(
    private queryService: QueryService,
    private checkoutAssetService: Checkout_AssetService,
    private departmentAdminPageService: DepartmentAdminPageService,
    private departmentAssetService: Department_AssetService
  ) { }

  async ngOnInit() {
    // subscribe to button-click-event subject
    this.departmentAdminPageService.assetCreated.subscribe(
      async () => {
        await this.loadAllAssets();
      });

    this.departmentAdminPageService.rentalReturned.subscribe(
      async () => {
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

    var asset_names = this.getAssetNames();
    const user_name = form.form.value.user_name;

    // TODO - need some verification that the student exists
    var student = await this.queryService.getStudentInfo(user_name).toPromise();

    // check that the user exists
    if (student !== undefined && student.length != 0) {

      var rentals = await this.queryService.getUserRentals(user_name).toPromise();

      // check that the user does not have any rentals
      if(rentals === undefined || rentals.length == 0)
      {

        var final_array = this.getAssets(asset_names, user_name);

        this.transaction = {
          $class: 'org.cpp.csdept.assets.Checkout_Item',
          'renter': `org.cpp.csdept.user.Student#${student[0].cpp_email}`,
          'department_assets': final_array
        };
  
        // Checkout the item for the user
        const transaction = await this.checkoutAssetService.addTransaction(this.transaction).toPromise()
          // response gives an error  
          .catch(async (error) => {
            if(error === '500 - Internal Server Error') {
              this.userHasRental();
              return;
            }
          })
          // If response is successful
          .then(async () => {
  
            // Reset the spinner and display the checkout message
            this.spinnerOn = false;
            this.checkoutMessage.message = "Checkout Created!";
  
            setTimeout(() => {
              this.checkoutMessage.message = '';
            }, 3000);
  
            // Reload the assets after new checkout was created
            await this.loadAllAssets();
  
            // Emit asset created event
            this.departmentAdminPageService.rentalCreated.next();
            form.reset();
          })
      }
      // the user already has a rental checked out
      else {
        this.userHasRental();
      }
    }
    // student doesnt exist
    else {
      this.userNotFound();
    }
  }

  async checkoutAsset(form: NgForm) { }

  getAssets(asset_names: any[], user_name: string): Department_Asset[] {
    var new_assets = [];

    asset_names.forEach((asset) => {
      var new_asset = 'org.cpp.csdept.assets.Department_Asset#' + asset;
      new_assets.push(new_asset);
    });

    return new_assets;
  }

  getAssetNames() {
    var user_names = [];

    this.checkboxes.forEach((asset) => {
      if (asset.checked == true) {
        user_names.push(asset.name);
      }
    })

    return user_names;
  }

  clearCheckBoxes() {
    this.checkboxes.forEach((element) => {
      element.checked = false;
    });
  }

  userNotFound() {

    console.log('Student doesnt exist');

    this.spinnerOn = false;
    
    setTimeout(() => {
      this.checkoutMessage.message = '';
    }, 3000);

    this.checkoutMessage.message = "User Not Found";
    
  }

  userHasRental() {
    console.log('User already has rental');

    this.spinnerOn = false;
    
    setTimeout(() => {
      this.checkoutMessage.message = '';
    }, 3000);

    this.checkoutMessage.message = "User already has a Rental!";
  }

}