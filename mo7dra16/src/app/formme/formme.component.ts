import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formme',
  templateUrl: './formme.component.html',
  styleUrls: ['./formme.component.css']
})
export class FormmeComponent implements OnInit {
  formData :any
  countries = ['egypt', 'plastine', 'canda', 'saudia', 'iraq', 'jordon']
  constructor() { }

  ngOnInit(): void {
  }
  submitMe(data:any){
    console.log(data.value)
    this.formData = data.value
  }
}
