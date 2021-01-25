import { Component } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent  {

  constructor() { }

  currentSong: any = {};
  newTime: any;
  song:any = {};
  finshSong : boolean = false;
  newSong: any = false;


  sliderChange(e: any) {  
      const newTime = (e.detail.value * this.currentSong.duration) / 100;
      if((this.currentSong.currentTime - newTime ) >= 1 || (newTime - this.currentSong.currentTime) >= 1 ) {
          this.currentSong.currentTime = newTime;
      }
      if(this.currentSong.currentTime >= this.currentSong.duration) {
          this.song.playing = false;
          this.finshSong = true;
      }

      if(this.currentSong.currentTime < this.currentSong.duration && this.finshSong) {
          this.song.playing = true;
          this.currentSong.currentTime = newTime;
          this.finshSong = false;
          this.play();
      }

  }
  play() {

      this.finshSong = false;
      if(this.newSong === true) {
          this.currentSong = new Audio(this.song.preview_url);
      }
      this.currentSong.play();
      this.currentSong.addEventListener("timeupdate", () => {
          this.newTime = (( 1 / this.currentSong.duration ) * this.currentSong.currentTime) * 100;
      });
      this.song.playing = true;
      this.newSong = false;
  }

  pause() {
      this.currentSong.pause();
      this.song.playing = false;
  }
  getAndPlaySong(dataRetun: any) {
      this.song = dataRetun.data;
      this.newSong = true;
      if(this.song !== null){
          if(!(Object.keys(this.currentSong).length === 0 && this.currentSong.constructor === Object)) {
              this.pause();
              this.currentSong = {};
          }
          this.play();
      } 
  }

  parserTime(time = "0:00") {
      if(time) {
          const partTime = parseInt(time.toString().split('.')[0], 10);
          let minutes = Math.floor(partTime/60).toString();
          if(minutes.length == 1 ){
              minutes = "0" + minutes;
          }

          let seconds = (partTime % 60).toString();
          if(seconds.length == 1 ){
              seconds = "0" + seconds;
          }

          return `${minutes}:${seconds}`;

      }
  }


}
