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
  current_out: Rental[]
  private currentTime

  constructor(
    private walletService: WalletService,
    private rentalService: RentalService,
    private departmentAssetPageService: DepartmentAdminPageService
    ) {}

  async ngOnInit() {
    await this.loadAllRentals();
    this.setCurrentTime();
    this.departmentAssetPageService.rentalCreated.subscribe(
      // reload the rentals array
      async () => {
        console.log('Reload assets triggered');
        await this.loadAllRentals();
      }
    );
  }

  async loadAllRentals() {
    this.current_out = await this.rentalService.getAll().toPromise();
  }

  setCurrentTime() {
    var date = new Date();
    this.currentTime = date.getHours();
  }

}
