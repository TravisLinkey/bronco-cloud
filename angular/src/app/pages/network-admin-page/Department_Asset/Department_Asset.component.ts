import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Department_AssetService } from './Department_Asset.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-department_asset',
  templateUrl: './Department_Asset.component.html',
  styleUrls: ['./Department_Asset.component.css'],
  providers: [Department_AssetService]
})
export class Department_AssetComponent implements OnInit {

  myForm: FormGroup;

  public allAssets;
  private asset;
  private currentId;
  public errorMessage;

  asset_Id = new FormControl('', Validators.required);
  asset_name = new FormControl('', Validators.required);
  in_use = new FormControl('', Validators.required);
  renter = new FormControl('', Validators.required);

  constructor(public serviceDepartment_Asset: Department_AssetService, fb: FormBuilder) {
    this.myForm = fb.group({
      asset_Id: this.asset_Id,
      asset_name: this.asset_name,
      in_use: this.in_use,
      renter: this.renter
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceDepartment_Asset.getAll()
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
      $class: 'org.cpp.csdept.assets.Department_Asset',
      'asset_Id': this.asset_Id.value,
      'asset_name': this.asset_name.value,
      'in_use': this.in_use.value,
      'renter': this.renter.value
    };

    this.myForm.setValue({
      'asset_Id': null,
      'asset_name': null,
      'in_use': null,
      'renter': null
    });

    return this.serviceDepartment_Asset.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'asset_Id': null,
        'asset_name': null,
        'in_use': null,
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
      $class: 'org.cpp.csdept.assets.Department_Asset',
      'asset_name': this.asset_name.value,
      'in_use': this.in_use.value,
      'renter': this.renter.value
    };

    return this.serviceDepartment_Asset.updateAsset(form.get('asset_Id').value, this.asset)
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

    return this.serviceDepartment_Asset.deleteAsset(this.currentId)
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

    return this.serviceDepartment_Asset.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'asset_Id': null,
        'asset_name': null,
        'in_use': null,
        'renter': null
      };

      if (result.asset_Id) {
        formObject.asset_Id = result.asset_Id;
      } else {
        formObject.asset_Id = null;
      }

      if (result.asset_name) {
        formObject.asset_name = result.asset_name;
      } else {
        formObject.asset_name = null;
      }

      if (result.in_use) {
        formObject.in_use = result.in_use;
      } else {
        formObject.in_use = null;
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
      'asset_Id': null,
      'asset_name': null,
      'in_use': null,
      'renter': null
      });
  }

}
