import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { StudentService } from './Student.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-student',
  templateUrl: './Student.component.html',
  styleUrls: ['./Student.component.css'],
  providers: [StudentService]
})
export class StudentComponent implements OnInit {

  myForm: FormGroup;

  public allParticipants;
  private participant;
  private currentId;
  public errorMessage;

  cpp_email = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  bronco_id = new FormControl('', Validators.required);
  balance = new FormControl('', Validators.required);
  department = new FormControl('', Validators.required);


  constructor(public serviceStudent: StudentService, fb: FormBuilder) {
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
    return this.serviceStudent.getAll()
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
      $class: 'org.cpp.csdept.user.Student',
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

    return this.serviceStudent.addParticipant(this.participant)
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
      $class: 'org.cpp.csdept.user.Student',
      'name': this.name.value,
      'bronco_id': this.bronco_id.value,
      'balance': this.balance.value,
      'department': this.department.value
    };

    return this.serviceStudent.updateParticipant(form.get('cpp_email').value, this.participant)
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

    return this.serviceStudent.deleteParticipant(this.currentId)
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

    return this.serviceStudent.getparticipant(id)
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
