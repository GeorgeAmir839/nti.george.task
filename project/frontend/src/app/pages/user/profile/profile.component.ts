import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor() { console.log('constructor') }
  ngOnInit(): void { console.log('onInit') }
  ngOnChanges(){console.log('ng On Changes')}
  ngDoCheck(){console.log('do check')}
  ngAfterContentInit(){console.log('after content Init')}
  ngAfterContentChecked(){console.log('after content checked')}
  ngAfterViewInit(){console.log('after view Init')}
  ngAfterViewChecked(){console.log('after view checked')}
  ngOnDestroy(){console.log('destroy')}
}
