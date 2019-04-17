import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { WalletService } from 'app/services/Wallet.service';
import { QueryService } from 'app/services/Query.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [QueryService]
})
export class SigninComponent implements OnInit {
  private user_type: string;
  private spinnerOn = false;

  constructor(private router: Router,
    private walletService: WalletService,
    private queryService: QueryService) { }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    this.spinnerOn = true;
    var user_name = form.form.value.bronco_Id;
    
    console.log(`Signing in: ${user_name}`);

    // quick fix for the @ symbol in the card name
    user_name = user_name.replace('@', '%40');

    // check if user is a student
    if(await this.isStudent(user_name))
    {
      await this.walletService.setDefault(user_name);
      this.router.navigate(['student']);
    }
    
    // check if user is a dept admin
    if(await this.isDeptAdmin(user_name))
    {
      await this.walletService.setDefault(user_name);
      this.router.navigate(['departmentadmin']);  
    }

    // TODO - Display user not found message
    console.log('Error - User not found')

    this.spinnerOn = false;
  }

  async isStudent(user_name : string) {
    var exists = await this.queryService.isStudent(user_name).toPromise();

    if(exists.length == 0) {
      return false;
    }

    return true;
  }

  async isDeptAdmin(user_name: string) {
    var exists = await this.queryService.isDeptAdmin(user_name).toPromise();

    if(exists.length == 0) {
      return false;
    }

    return true;
  }

}
