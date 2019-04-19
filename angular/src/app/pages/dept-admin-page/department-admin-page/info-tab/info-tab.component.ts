import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/services/Admin.service';
import { WalletService } from 'app/services/Wallet.service';

@Component({
  selector: 'app-dept-admin-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.css'],
  providers: [AdminService]
})
export class DeptAdminInfoTabComponent implements OnInit {

  private user_info = {};

  constructor(private walletService: WalletService, private adminService: AdminService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  async loadUserInfo() {
    const user_name = this.walletService.user_name;
    const admin = await this.adminService.getparticipant(user_name).toPromise();

    this.user_info = {
      name: admin.name,
      email: admin.cpp_email,
      bronco_Id: admin.bronco_id,
      balance: admin.balance,
      department: admin.department
    }
  }

}
