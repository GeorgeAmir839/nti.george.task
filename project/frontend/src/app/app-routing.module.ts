import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"test2", component:ProfileComponent},
  {path:'login',component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"test", component:TestComponent},
  {path:"**", component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
