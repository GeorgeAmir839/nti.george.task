import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/user.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
massege=""
  user = {
    name: "",
    age: "15",
    email: "",
    password: ""
  }
  massage=""
  flagr=false
  constructor(private _user:UserService) { }

  ngOnInit(): void {
  }
  handleRegister() {
   
    // console.log(this.user)
    this._user.register(this.user).subscribe(data => {
      console.log(data)
      this.flagr=data.status
      this.massege=data.message
    })
  }

}
