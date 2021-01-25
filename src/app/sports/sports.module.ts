import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportsPageRoutingModule } from './sports-routing.module';

import { SportsPage } from './sports.page';

import { AgmCoreModule } from '@agm/core';

import { PlayerComponent } from '../home/components/player/player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule,
    SportsPageRoutingModule
  ],
  declarations: [SportsPage, PlayerComponent]
})
export class SportsPageModule {}
