import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormmeComponent } from './formme/formme.component';
import { PlayformComponent } from './playform/playform.component';
import { RegisterComponent } from './register/register.component';
import { ShowallComponent } from './showall/showall.component';

const routes: Routes = [
  {path:"",component:FormmeComponent},
  {path:"playform",component:PlayformComponent},
  {path:"register",component:RegisterComponent},
  {path:"showall",component:ShowallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
