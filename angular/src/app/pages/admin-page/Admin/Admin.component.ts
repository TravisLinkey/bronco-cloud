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
import { AdminService } from './Admin.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  cpp_email = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  bronco_id = new FormControl('', Validators.required);
  balance = new FormControl('', Validators.required);
  department = new FormControl('', Validators.required);


  constructor(public serviceAdmin: AdminService, fb: FormBuilder) {
    this.myForm = fb.group({
      cpp_email: this.cpp_email,
      name: this.name,
      bronco_id: this.bronco_id,
      balance: this.balance,
      department: this.department
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAdmin.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
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
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.cpp.csdept.user.Admin',
      'cpp_email': this.cpp_email.value,
      'name': this.name.value,
      'bronco_id': this.bronco_id.value,
      'balance': this.balance.value,
      'department': this.department.value
    };

    this.myForm.setValue({
      'cpp_email': null,
      'name': null,
      'bronco_id': null,
      'balance': null,
      'department': null
    });

    return this.serviceAdmin.addParticipant(this.participant)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'cpp_email': null,
        'name': null,
        'bronco_id': null,
        'balance': null,
        'department': null
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


   updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.cpp.csdept.user.Admin',
      'name': this.name.value,
      'bronco_id': this.bronco_id.value,
      'balance': this.balance.value,
      'department': this.department.value
    };

    return this.serviceAdmin.updateParticipant(form.get('cpp_email').value, this.participant)
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


  deleteParticipant(): Promise<any> {

    return this.serviceAdmin.deleteParticipant(this.currentId)
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

    return this.serviceAdmin.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'cpp_email': null,
        'name': null,
        'bronco_id': null,
        'balance': null,
        'department': null
      };

      if (result.cpp_email) {
        formObject.cpp_email = result.cpp_email;
      } else {
        formObject.cpp_email = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.bronco_id) {
        formObject.bronco_id = result.bronco_id;
      } else {
        formObject.bronco_id = null;
      }

      if (result.balance) {
        formObject.balance = result.balance;
      } else {
        formObject.balance = null;
      }

      if (result.department) {
        formObject.department = result.department;
      } else {
        formObject.department = null;
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
      'cpp_email': null,
      'name': null,
      'bronco_id': null,
      'balance': null,
      'department': null
    });
  }
}
