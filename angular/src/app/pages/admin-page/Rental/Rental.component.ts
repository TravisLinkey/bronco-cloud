/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RentalService } from './Rental.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-rental',
  templateUrl: './Rental.component.html',
  styleUrls: ['./Rental.component.css'],
  providers: [RentalService]
})
export class RentalComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  checkout_ID = new FormControl('', Validators.required);
  due_by = new FormControl('', Validators.required);
  department_asset = new FormControl('', Validators.required);
  renter = new FormControl('', Validators.required);

  constructor(public serviceRental: RentalService, fb: FormBuilder) {
    this.myForm = fb.group({
      checkout_ID: this.checkout_ID,
      due_by: this.due_by,
      department_asset: this.department_asset,
      renter: this.renter
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceRental.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.cpp.csdept.assets.Rental',
      'checkout_ID': this.checkout_ID.value,
      'due_by': this.due_by.value,
      'department_asset': this.department_asset.value,
      'renter': this.renter.value
    };

    this.myForm.setValue({
      'checkout_ID': null,
      'due_by': null,
      'department_asset': null,
      'renter': null
    });

    return this.serviceRental.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'checkout_ID': null,
        'due_by': null,
        'department_asset': null,
        'renter': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.cpp.csdept.assets.Rental',
      'due_by': this.due_by.value,
      'department_asset': this.department_asset.value,
      'renter': this.renter.value
    };

    return this.serviceRental.updateAsset(form.get('checkout_ID').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceRental.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceRental.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'checkout_ID': null,
        'due_by': null,
        'department_asset': null,
        'renter': null
      };

      if (result.checkout_ID) {
        formObject.checkout_ID = result.checkout_ID;
      } else {
        formObject.checkout_ID = null;
      }

      if (result.due_by) {
        formObject.due_by = result.due_by;
      } else {
        formObject.due_by = null;
      }

      if (result.department_asset) {
        formObject.department_asset = result.department_asset;
      } else {
        formObject.department_asset = null;
      }

      if (result.renter) {
        formObject.renter = result.renter;
      } else {
        formObject.renter = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'checkout_ID': null,
      'due_by': null,
      'department_asset': null,
      'renter': null
      });
  }

}
