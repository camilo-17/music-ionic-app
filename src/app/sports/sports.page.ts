import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Subscription } from 'rxjs';
import { MusicService } from '../services/music.service';
import { PlayerComponent } from '../home/components/player/player.component';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-sports',
  templateUrl: './sports.page.html',
  styleUrls: ['./sports.page.scss'],
})
export class SportsPage implements OnDestroy {

  @ViewChild(PlayerComponent) playerComponent: PlayerComponent;
  
  currentCenter: any ;
  coordinates: any[] = [];
  defaultZoom = 14;
  songs: any[]  = [];
  
  ocurrences: Subscription = null;
  showLoader: boolean = false;
  
  constructor(private musicService: MusicService) { }

  ionViewDidEnter() {
    this.getCurrentPosition();
    this.watchPosition();
  }
  
  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentCenter = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
  }

  watchPosition() {
    Geolocation.watchPosition({}, position => {
      this.currentCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.coordinates.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
    })
  }

  searchChange(e:any) {
    this.showLoader = true;
    const entry = e.target.value;
    if(entry !== '') {
      this.ocurrences = this.musicService.searchTracks(entry).subscribe((tracks) => {
        this.songs = tracks.tracks.items;
        this.showLoader = false;
      });
    }
      
  }

  selectSong(song: any) {
    this.playerComponent.getAndPlaySong({data: song});
  }

  ngOnDestroy() {
    this.ocurrences !== null && this.ocurrences.unsubscribe();
  }




}
