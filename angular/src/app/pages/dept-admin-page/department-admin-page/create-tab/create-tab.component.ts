import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Create_AssetService } from 'app/services/Create_Asset.service';
import { WalletService } from 'app/services/Wallet.service';
import { SELECT_PANEL_PADDING_X } from '@angular/material';

@Component({
  selector: 'app-dept-admin-create-tab',
  templateUrl: './create-tab.component.html',
  styleUrls: ['./create-tab.component.css'],
  providers: [Create_AssetService]
})
export class DeptAdminCreateTabComponent implements OnInit {
  private spinnerOn = false;
  private messageOn = false;
  private cardData;

  constructor(private createAssetService: Create_AssetService, private walletService: WalletService) {
    this.cardData = walletService.cardFile;
  }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    const asset = {
      "asset_name": form.form.value.assetName
    }
    this.spinnerOn = true;
    
    // Create the asset
    return this.createAssetService.addTransaction(asset).toPromise()
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      this.spinnerOn = false;
    })
    .then(() => {
      setTimeout(() => {
        this.messageOn = false;
      }, 3000);

      console.log(`${asset.asset_name} Asset Created`);
      this.messageOn = true;
    })
    
  }

}
