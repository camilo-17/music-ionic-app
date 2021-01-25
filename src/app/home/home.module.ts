import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SongsModalPageModule } from '../modals/songs-modal/songs-modal.module';

import { PlayerComponent } from './components/player/player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SongsModalPageModule
  ],
  declarations: [HomePage, PlayerComponent],
  exports:[
    PlayerComponent
  ]
})
export class HomePageModule {}
