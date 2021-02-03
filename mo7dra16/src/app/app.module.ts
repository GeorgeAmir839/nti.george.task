import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormmeComponent } from './formme/formme.component';
import { PlayformComponent } from './playform/playform.component';
import { RegisterComponent } from './register/register.component';
import { ShowallComponent } from './showall/showall.component';
import {from} from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    FormmeComponent,
    PlayformComponent,
    RegisterComponent,
    ShowallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
