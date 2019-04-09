import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  onSubmit() {
    console.log('Signing in')
    this.router.navigate(['student']);

    // check what wallet is default
    
    // navigate to the respective homescreen
  }

}
