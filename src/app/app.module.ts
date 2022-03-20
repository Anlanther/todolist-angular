import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskListComponent } from './task/task-list/task-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // For 2 way binding. Will use for filtering
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
