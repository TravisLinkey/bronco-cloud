import { Component, OnInit } from '@angular/core';
import { WalletService } from 'app/services/Wallet.service';
import { QueryService } from 'app/services/Query.service';

@Component({
  selector: 'app-available-tab',
  templateUrl: './available-tab.component.html',
  styleUrls: ['./available-tab.component.css'],
  providers: [QueryService]
})

export class StudentAvailableTabComponent implements OnInit {
  // dept_assets = [
  //   { "asset_name" : "Macbook", "available" : 1 },
  //   { "asset_name" : "Computer Monitor", "available" : 3 },
  //   { "asset_name" : "Linux Machine", "available" : 3 },
  //   { "asset_name" : "VR Glasses", "available" : 6 },
  // ];
  dept_assets;

  textValue: 'This is an element';

  constructor(private walletService: WalletService, private queryService: QueryService) { }

  ngOnInit() {
    this.loadAvailable();
  }

  async loadAvailable() {
    const assets = await this.queryService.getAllAvailableAssets().toPromise();
    this.dept_assets = assets;
  }
}
