import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AuthencticateService } from '../services/authencticate.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor( 
    private menu: MenuController, 
    private navCtrl: NavController, 
    private authService: AuthencticateService ) {

   }

  ngOnInit() {
  }
  
  closeMenu() {
    this.menu.close();
  }
  logOut() {
    this.authService.logOut();
    this.navCtrl.navigateRoot('/login');
  }
}
