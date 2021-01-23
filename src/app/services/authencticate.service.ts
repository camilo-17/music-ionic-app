import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class AuthencticateService {

  constructor(private storage: Storage) { }

  loginUser(crednetial: any) {
      return new Promise((resolve, reject) => {
          if(crednetial.email === "test@test.com" && crednetial.password == "12345") {
            resolve(true);
          } else {
            resolve(false);
          }
      })
  }
  logOut() {
    this.storage.remove("isUserLoggedIn");  
  }
}
