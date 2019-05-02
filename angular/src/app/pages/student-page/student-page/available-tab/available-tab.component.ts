import { Component, OnInit } from '@angular/core';
import { QueryService } from 'app/services/Query.service';

@Component({
  selector: 'app-available-tab',
  templateUrl: './available-tab.component.html',
  styleUrls: ['./available-tab.component.css'],
})

export class StudentAvailableTabComponent implements OnInit {
  dept_assets = [];

  constructor(private queryService: QueryService) { }

  ngOnInit() {
    this.loadAvailable();
  }

  async loadAvailable() {
    const assets = await this.queryService.getAllAvailableAssets().toPromise();
    this.dept_assets = assets;
  }
}
