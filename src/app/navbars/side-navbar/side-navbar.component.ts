import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
[x: string]: any;
showFiller = false;


  constructor() { }

 

  ngOnInit(): void {
  }

}
