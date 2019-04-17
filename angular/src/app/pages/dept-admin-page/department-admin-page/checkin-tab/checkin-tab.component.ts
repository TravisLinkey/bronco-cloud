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

  currentOut = [
    // { "asset_name" : "Linux_Machine", "asset_Id" : "12345" },
    // { "asset_name" : "Holo_Lenses", "asset_Id" : "12345" },
  ];

  constructor(private queryService: QueryService) { }

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    const user_name = form.form.value.user_name;

    // look up student rentals
    this.currentOut = await this.queryService.getUserRentals(user_name).toPromise();
  }

}
