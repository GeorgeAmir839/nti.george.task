import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrls: ['./showall.component.css']
})
export class ShowallComponent implements OnInit {

  constructor(private _user:UserService) {
    this.getdata()
   }

  ngOnInit(): void {
  }
  getdata(){
    this._user.showalldata().subscribe(data=>{
      console.log(data)
    })
  }

}
