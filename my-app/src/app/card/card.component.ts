import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  data = [
    {name: "n1",imgurl:"assets/card1.jpg",content:"content 1" },
    {name: "n2",imgurl:"assets/card2.jpg",content:"content 2" },
    {name: "n3",imgurl:"assets/card3.jpg",content:"content 3" },
    {name: "n4",imgurl:"assets/card1.jpg",content:"content 4" }

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
