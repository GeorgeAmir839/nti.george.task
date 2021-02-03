import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { EditprofileComponent } from './pages/user/editprofile/editprofile.component';
import { AddbookComponent } from './pages/user/addbook/addbook.component';
import { ShowbooksComponent } from './pages/user/showbooks/showbooks.component';
import { EditbookComponent } from './pages/user/editbook/editbook.component';
import { AddadminComponent } from './pages/admin/addadmin/addadmin.component';
import { ShowusersComponent } from './pages/admin/showusers/showusers.component';
import { ShowusersbooksComponent } from './pages/admin/showusersbooks/showusersbooks.component';
import { ConfirmbooksComponent } from './pages/admin/confirmbooks/confirmbooks.component';
import { EditbooksComponent } from './pages/admin/editbooks/editbooks.component';
import { AddcatComponent } from './pages/admin/addcat/addcat.component';
import { ShowcatComponent } from './pages/admin/showcat/showcat.component';
import { EditcatComponent } from './pages/admin/editcat/editcat.component';
import { AdduserbookComponent } from './pages/admin/adduserbook/adduserbook.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { TestComponent } from './test/test.component';
import { UserService } from './services/user.service';
import { UserInterceptor } from './user.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditprofileComponent,
    AddbookComponent,
    ShowbooksComponent,
    EditbookComponent,
    AddadminComponent,
    ShowusersComponent,
    ShowusersbooksComponent,
    ConfirmbooksComponent,
    EditbooksComponent,
    AddcatComponent,
    ShowcatComponent,
    EditcatComponent,
    AdduserbookComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    Error404Component,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:UserInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
