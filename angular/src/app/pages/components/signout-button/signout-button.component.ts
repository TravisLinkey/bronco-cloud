import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-button',
  templateUrl: './signout-button.component.html',
  styleUrls: ['./signout-button.component.css'],
})

export class SignoutButtonComponent implements OnInit {
  btnText = 'Sign Out';
  toggle : boolean;
  
  constructor(private router: Router) {}

  ngOnInit() {
  }

  changeText() {
      this.toggle = !this.toggle;

      if(this.toggle)
      {
        this.btnText = 'Sign In';
        this.router.navigate(['signin']);

      }
      else
        this.btnText = 'Sign Out';
    }

}
