import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(10)]),
    gender:new FormControl(),
    email:new FormControl(),
    address: new FormGroup({
      country:new FormControl('',[Validators.required]),
      street:new FormControl()
    })
  })
  
  handelForm(){
    console.log(this.contactForm.value)
  }
  // isVisible=true
 
  // handleVisable(){
  //   this.isVisible = !this.isVisible
  // }
  xtest = 5


  constructor() { }

  ngOnInit(): void {
  }
  increase(){
    this.xtest++
  }
}
