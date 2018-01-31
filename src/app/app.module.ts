import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { environment } from '../environments/environment';
import { AngularFireModule} from 'angularfire2';

import { FCMService } from './fcm.service'; 


const routes = [ 
  { path: 'home', component: HomeComponent } ,
  { path: 'login', component: LoginComponent } ,
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,    
    AngularFireModule.initializeApp(environment.firebase,'pushdemo'),
    RouterModule.forRoot(routes)
  ],
  providers: [FCMService],
  bootstrap: [AppComponent]
})
export class AppModule { }
