import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
  }

  signout(){
    localStorage.clear();
    localStorage.setItem('usertoken',"");
    localStorage.setItem('userId',"");
    localStorage.setItem('username',"");
    this.router.navigate(['../login/']);
  }

}
