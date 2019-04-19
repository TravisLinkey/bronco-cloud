import { Component, OnInit } from '@angular/core';
import { WalletService } from 'app/services/Wallet.service';
import { RentalService } from 'app/services/Rental.service';

@Component({
  selector: 'app-student-rental-tab',
  templateUrl: './rental-tab.component.html',
  styleUrls: ['./rental-tab.component.css'],
  providers: [RentalService]
})
export class StudentRentalTabComponent implements OnInit {
  // checkedOut = [
  //   { "asset_name" : "Google Glasses", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
  //   { "asset_name" : "Macbook", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
  //   { "asset_name" : "Linux-Machine", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
  //   { "asset_name" : "VR-Goggles", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
  //   { "asset_name" : "Apple Pen", "time_checkedout" : "10:12:2019", "due" : "10:25:2019" },
  // ];
  checkedOut;

  constructor(public walletService: WalletService, private rentalService: RentalService) { }

  ngOnInit() {
    this.loadRentals();
  }

  async loadRentals() {
    const userId = this.walletService.user_name;
    console.log(`User name is: ${userId}`);

    const returned = await this.rentalService.getAll().toPromise();
    
    console.log(returned);

    if(returned.length == 0)
    {
      console.log('NOTHING THERE');
      this.checkedOut = []
    }
    else
    {
      this.checkedOut = returned;
    }
  }

}
