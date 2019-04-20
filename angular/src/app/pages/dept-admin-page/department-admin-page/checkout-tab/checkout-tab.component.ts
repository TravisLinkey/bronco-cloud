import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
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
 
  private checkout_form: FormGroup;
  private transaction;
  private spinnerOn = false;
  private checkoutMessage = false;
  private assets: FormArray;
  all_dept_assets;

  constructor(
    private formBuilder: FormBuilder,
    private queryService: QueryService,
    private checkoutAssetService: Checkout_AssetService,
    private departmentAdminPageService: DepartmentAdminPageService,
    ) {}

  async ngOnInit() {

    this.checkout_form = this.formBuilder.group({
      assets: this.formBuilder.array([])
    });

    // subscribe to button-click-event subject
    this.departmentAdminPageService.assetCreated.subscribe(
      async () => {
        console.log('UPDATING ASSETS');
        await this.loadAllAssets();
      });

      this.initForm();

      await this.loadAllAssets();

      this.initForm();
  }

  async loadAllAssets() {
    
    // Fetch the department assets from REST server
    const fetched_assets = await this.queryService.getAllAvailableAssets().toPromise()
    .catch((error) => {
      console.log(error);
    })

    console.log(fetched_assets);

    this.all_dept_assets = fetched_assets;
  }

  initForm() {
    let asset_array = new FormArray([]);

    if(this.all_dept_assets)
    {
      console.log('Loading Department Assets');

      console.log(this.all_dept_assets);

      for(let asset of this.all_dept_assets) {
        asset_array.push(
          new FormGroup({
            'asset_name': new FormControl(),
            'checked_out': new FormControl()
          })
        );
      }
    }

    this.checkout_form = new FormGroup({
      'asset_array': asset_array
    });

  }

  async onSubmit() {
    console.log(this.checkout_form);

    // this.spinnerOn = true;
    // const user_name = form.form.value.user_name;
    // const asset_Id = this.getAssetName();

    // TODO - need some verification that the student exists
    // var student = await this.queryService.getStudentInfo(user_name).toPromise();
    // console.log(student);

    // this.transaction = {
    //   $class: 'org.cpp.csdept.assets.Checkout_Item',
    //   'renter': `org.cpp.csdept.user.Student#${user_name}`,
    //   'department_asset': `org.cpp.csdept.assets.Department_Asset#${asset_Id}`,
    //   'transactionId': null,
    //   'timestamp': null
    // };
    
    // Checkout the item for the user
    // await this.checkoutAssetService.addTransaction(this.transaction).toPromise()
    // .catch((error) => {
    //   console.log(error);
    // })
    // // Reset the spinner and form and display the checkout message
    // .then(() => {
    //   this.spinnerOn = false;

    //   setTimeout(()=> {
    //     this.checkoutMessage = false;
    //   }, 3000);

    //   this.checkoutMessage = true;
    //   // form.form.reset();
    // })
    // // Reload the assets after new checkout was created
    // .then(async () => {
    //   await this.loadAllAssets();
    // })
    // // Emit asset created event
    // .then(() => {
    //   this.departmentAdminPageService.rentalCreated.next();
    // })
  }

  async checkoutAsset() {}

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

  getControls() {
    return (<FormArray>this.checkout_form.get('asset_array')).controls;
  }

}
