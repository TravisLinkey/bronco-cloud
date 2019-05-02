import { Component, OnInit } from '@angular/core';
import { WalletService } from 'app/services/Wallet.service';
import { RentalService } from 'app/services/Rental.service';

@Component({
  selector: 'app-student-rental-tab',
  templateUrl: './rental-tab.component.html',
  styleUrls: ['./rental-tab.component.css'],
})
export class StudentRentalTabComponent implements OnInit {
  public current_out = [];

  constructor(public walletService: WalletService, private rentalService: RentalService) { }

  ngOnInit() {
    this.loadRentals();
  }

  async loadRentals() {
    const returned = await this.rentalService.getAll().toPromise();

    if(returned.length > 0)
    {
      this.current_out = returned;
    }

    console.log(this.current_out);

  }

}
