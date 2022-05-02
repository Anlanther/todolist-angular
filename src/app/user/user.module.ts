import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { UserData } from './user-data';
@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    HttpClientInMemoryWebApiModule.forFeature(UserData, { delay: 1000 }),
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports: [SignupComponent, LoginComponent],
})
export class UserModule {}
