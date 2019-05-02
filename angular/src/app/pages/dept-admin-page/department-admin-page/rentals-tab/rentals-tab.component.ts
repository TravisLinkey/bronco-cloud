import { Component, OnInit } from '@angular/core';
import { WalletService } from 'app/services/Wallet.service';
import { RentalService } from 'app/services/Rental.service';
import { Rental } from 'app/org.cpp.csdept.assets';
import { DepartmentAdminPageService } from '../department-admin-page.service';

@Component({
  selector: 'app-dept-admin-rentals-tab',
  templateUrl: './rentals-tab.component.html',
  styleUrls: ['./rentals-tab.component.css'],
  providers: [RentalService]
})
export class DeptAdminRentalsTabComponent implements OnInit {
  private current_out = []
  private current_time

  constructor(
    private walletService: WalletService,
    private rentalService: RentalService,
    private departmentAssetPageService: DepartmentAdminPageService
    ) {}

  async ngOnInit() {
    await this.loadAllRentals();
    this.setCurrentTime();

    // subscribe to rental created subject
    this.departmentAssetPageService.rentalCreated.subscribe(
      // reload the rentals array
      async () => {
        await this.loadAllRentals();
      }
    );

    // subscribe to rental created subject
    this.departmentAssetPageService.rentalReturned.subscribe(
      async () => {
        await this.loadAllRentals();
      }
    )
  }

  async loadAllRentals() {
    this.current_out = await this.rentalService.getAll().toPromise();
  }

  setCurrentTime() {
    var date = new Date();
    this.current_time = date.getHours();
  }

  getNumber(arg: string): string {
    var ans = arg.split(':', 2);
    var first = ans[0];

    var final = first.replace(/^0/,'');

    this.setCurrentTime();
    
    return (final <= this.current_time ? 'true' : 'false');
    // return (parseInt(this.current_time) - 12).toString();
  }

}
