import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  seatchkey=""
  varname = ""
  constructor() { }

  ngOnInit(): void {
  }
  func1(data){
    console.log(data.target.value)
    this.seatchkey = data.target.value
  }

}
