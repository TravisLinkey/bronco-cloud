import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { QueryService } from 'app/services/Query.service';

@Component({
  selector: 'app-dept-admin-checkin-tab',
  templateUrl: './checkin-tab.component.html',
  styleUrls: ['./checkin-tab.component.css'],
  providers: [QueryService]
})
export class DeptAdminCheckinTabComponent implements OnInit {
  private currentOut = [];

  constructor(private queryService: QueryService) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    const user_name = form.form.value.user_name;

    console.log(user_name);

    // look up student rentals
    this.currentOut = await this.queryService.getUserRentals(user_name).toPromise();

    console.log(this.currentOut);
  }

}
