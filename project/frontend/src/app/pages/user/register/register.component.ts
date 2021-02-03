import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formFlag = false
  userData = new FormGroup({
    userName:new FormControl('', [Validators.required, Validators.minLength(5)]),
    phone:new FormControl('',[Validators.minLength(11), Validators.maxLength(11)]),
    age:new FormControl('',[Validators.required, Validators.min(21), Validators.max(60)]),
    password:new FormControl('',[Validators.minLength(8)]),
    userType:new FormControl('1')
  })

dataBuilder
  constructor(private fb: FormBuilder, private _user:UserService) { }

  ngOnInit(): void {
    // this.dataBuilder = this.fb.group({
    //   userName:['',[]],
    //   age:[''],
    //   password:[],
    //   phone:['']
    // })
  }
  get userName(){
    return this.userData.get('userName')
  }
  get phone(){
    return this.userData.get('phone')
  }
  get age(){
    return this.userData.get('age')
  }
  get password(){
    return this.userData.get('password')
  }
msg=""

  handelregister(){
    if(this.userData.valid){
      console.log(this.userData.value)
this._user.register(this.userData.value).subscribe(data=>{
  console.log(data)
  if(data.status==1){
    this.msg= "done"
    localStorage.setItem('token', data.data.token)
    this.userData.reset()
  }
  else{
    this.msg= data.data.error.message
  }
},
(err)=>{
  this.msg = err.error.message
  console.log(err)
})

    }
    else{
      this.formFlag=true
      console.log('error')
    }
  }
}
