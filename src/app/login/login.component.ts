import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';
import { FCMService } from '../fcm.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private message : any;
  constructor(public http:Http,private fcmService : FCMService) { }

  ngOnInit() {
       this.fcmService.initialise()
         this.fcmService.getPermission()
         this.fcmService.receiveMessage()
         this.message = this.fcmService.currentMessage
  }
  signIn(userName,password)
  {
     var headers = [];
        headers.push('Content-Type', 'application/vnd.api+json');
        return this.http.post('/api/signIn',
            { userName:userName,password:password },
            { headers: headers[0] })
            .map((res: Response) => res.json()).subscribe(
              isLogin=>
              {
                localStorage.setItem("token",isLogin.token);
                console.log("token for user "+localStorage.getItem("token"));
                   this.fcmService.receiveMessage()
         this.message = this.fcmService.currentMessage
               // this.requestNotificationsPermissions();
              }
            )
  }
   
}
