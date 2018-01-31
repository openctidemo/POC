import { Injectable, Inject }          from '@angular/core';
// import * as firebase from 'firebase/app'; // brings in app in typings
// import 'firebase/messaging'; // naked import to bring in feature
// import 'rxjs/add/operator/take';
import { FirebaseApp } from "angularfire2";
import * as firebase from 'firebase';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FCMService {
  // messaging : firebase.messaging.Messaging;
  private messaging: firebase.messaging.Messaging;

  currentMessage = new BehaviorSubject(null)
  constructor(@Inject(FirebaseApp) private firebaseApp: firebase.app.App) {
      console.log("constructor FCMService");
  }
  initialise() {

      console.log("initialise FCMService");
       this.messaging = firebase.messaging(this.firebaseApp);
    //   this.messaging = firebase.messaging();
      this.currentMessage = new BehaviorSubject(null)
  }
  getPermission() {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken()
      })
      .then(token => {
        console.log("FCM token " + token);

        //this.updateToken(token)
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    }
    receiveMessage() {
       this.messaging.onMessage((payload : any) => {
        console.log("Message received. ", payload);
        this.currentMessage.next(payload)
      });
    }
}
