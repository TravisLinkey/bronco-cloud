import { Component, OnInit } from '@angular/core';
import { WalletService } from 'app/services/Wallet.service';
import { RentalService } from 'app/services/Rental.service';
import { Rental } from 'app/org.cpp.csdept.assets';

@Component({
  selector: 'app-dept-admin-rentals-tab',
  templateUrl: './rentals-tab.component.html',
  styleUrls: ['./rentals-tab.component.css'],
  providers: [RentalService]
})
export class DeptAdminRentalsTabComponent implements OnInit {
  current_out: Rental[]
  // [
  //   { "department_asset" : "Macbook", "checked_out" : "10:15:2019", "renter" : "Travis Linkey", "due_by" : "10:17:2019"},
  //   { "department_asset" : "Linux-Machine", "checked_out" : "10:15:2019", "renter" : "Zurone Chen", "due_by" : "10:17:2019"},
  //   { "department_asset" : "VR_Goggles", "checked_out" : "10:15:2019", "renter" : "David Barnes", "due_by" : "10:17:2019"},
  //   { "department_asset" : "Mini_Drone", "checked_out" : "10:15:2019", "renter" : "Nima Davarpannah", "due_by" : "10:17:2019"},
  // ]

  constructor(private walletService: WalletService, private rentalService: RentalService) { }

  ngOnInit() {
    this.loadAllRentals();
  }

  async loadAllRentals() {
    this.current_out = await this.rentalService.getAll().toPromise();
  }

}
