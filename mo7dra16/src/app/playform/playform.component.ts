import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playform',
  templateUrl: './playform.component.html',
  styleUrls: ['./playform.component.css']
})
export class PlayformComponent implements OnInit {
  formData ={
    fname:"",
    lname:"",
    emails: "",
    gender: "", 
    phones: "", 
    country: "", 
    address: { 
      street: "", 
      buildingNo: "" 
    },
    type:1
  }
  countries = ['egypt', 'plastine', 'canda', 'saudia', 'iraq', 'jordon']
  constructor() { }

  ngOnInit(): void {
  }
  submitMe(data:any){
    console.log(data.value)
    this.formData = data.value
    
  }
}
