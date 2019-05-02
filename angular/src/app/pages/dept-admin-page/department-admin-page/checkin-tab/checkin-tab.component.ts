import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QueryService } from 'app/services/Query.service';
import { Checkin_AssetService } from 'app/services/Checkin_Asset.service';
import { DepartmentAdminPageService } from '../department-admin-page.service';

@Component({
  selector: 'app-dept-admin-checkin-tab',
  templateUrl: './checkin-tab.component.html',
  styleUrls: ['./checkin-tab.component.css']
})
export class DeptAdminCheckinTabComponent implements OnInit {
  private currentOut = [];
  spinnerOn = false;
  returnButtonVisible = false;
  private checkinMessage = {
    message: '',
    showMessage: false
  };

  constructor(
    private queryService: QueryService,
    private checkinService: Checkin_AssetService,
    private departmentAdminPageService: DepartmentAdminPageService) { }

  ngOnInit() { }

  async onSubmit(form: NgForm) {
    this.spinnerOn = true;
    console.log('Transaction Submitted!');

    const user_name = form.form.value.user_name;

    // look up student rentals
    this.currentOut = await this.queryService.getUserRentals(user_name).toPromise();

    // if user has assets checked out
    if (this.currentOut !== undefined && this.currentOut.length > 0) {

      /**
       * TODO - only return the assets that are checked!!!
       */

      // populate the asset array
      var department_assets = [];
      const asset_array = this.currentOut[0].department_assets;

      for (var asset of asset_array) {
        department_assets.push(asset);
      }

      const transaction = {
        "$class": "org.cpp.csdept.assets.Return_Item",
        "renter": `org.cpp.csdept.user.Student#${user_name}`,
        department_assets
      }

      await this.checkinService.addTransaction(transaction).toPromise();

      // reset everything
      this.currentOut = [];
      this.spinnerOn = false;
      this.returnButtonVisible = false;
      this.checkinMessage.message = `${department_assets.length} Assets Returned!`;
      this.checkinMessage.showMessage = true;
      form.reset();
      this.departmentAdminPageService.rentalReturned.next();
    }
    // if user has no assets checked out
    else {
      this.returnButtonVisible = false;
      this.spinnerOn = false;

      this.checkinMessage.message = `User: ${user_name} does not have a Rental`;
      this.checkinMessage.showMessage = true;
    }

    setTimeout(() => {
      this.checkinMessage.showMessage = false;
    }, 3000)

  }

  async searchStudent(form: NgForm) {
    this.spinnerOn = true;

    const user_name = form.form.value.user_name;

    // look up student rentals
    this.currentOut = await this.queryService.getUserRentals(user_name).toPromise();

    if (this.currentOut.length > 0) {
      this.returnButtonVisible = true;
    }
    else {
      this.returnButtonVisible = false;
      this.checkinMessage.message = `No Rentals Found for ${user_name}!`;
      this.checkinMessage.showMessage = true;
    }

    setTimeout(() => {
      this.checkinMessage.showMessage = false;
    }, 3000);

    this.spinnerOn = false;
  }
}
