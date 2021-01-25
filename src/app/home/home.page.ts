import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../modals/songs-modal/songs-modal.page';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements  OnDestroy  {

    @ViewChild(PlayerComponent) playerComponent: PlayerComponent;

    slideOps: any = {
        initialSlide: 2,
        slidesPerView: 4,
        centeredSlides: true,
        speed: 400
    };
    artists: any[] = Array(20);

    songs: any = Array(20);
    albums: any = Array(20);

    artistSong: Subscription = null;
    albumSong: Subscription = null;
    artistModal: any;
    song:any = {};
    
    showContent: boolean = false;
    currentSong: any = {};
    newTime: any;
    vals: any = 0;
    finshSong : boolean = false;
    actualTime: any;
    newSong: any = false;
    subNewRealeases: Subscription = null;
    songsAlbum: any;

    constructor(private musicService: MusicService, private modalController: ModalController) {

    }

    ionViewDidEnter() {
        this.subNewRealeases = this.musicService.getNewReleases().subscribe((newReleases) => {
        if (newReleases) {
            this.artists = this.musicService.getdataArtist();
            this.songs = newReleases.albums.items.filter((e:any) => e.album_type === 'single');
            this.albums = newReleases.albums.items.filter((e:any) => e.album_type === 'album');
            this.showContent = true;
        }
        }, (err) => {
            console.log(`error `, err);
        });
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

    showSongsByArtist(artist: any) {
        if(artist !== undefined) {
            try {
                this.artistSong = this.musicService.getArtistTopTracks(artist.id).subscribe(async (songs) => {
                const modal = await this.modalController.create({
                    component: SongsModalPage,
                    componentProps: {
                        songs: songs.tracks,
                        artist: artist.name
                    }
                });

                modal.onDidDismiss().then((dataRetun: any) => {
                    // this.getAndPlaySong(dataRetun);
                    this.playerComponent.getAndPlaySong(dataRetun);
                })

                modal.present();
                })
                
            } catch (error) {
                console.error(error);
            }
        }
    }

    showSongsByAlbum(album: any) {
        this.albumSong = this.musicService.getAlbumsTracks(album.id).subscribe(async(songs) => {
            this.songsAlbum = songs.items;
            const modal = await this.modalController.create({
                component: SongsModalPage,
                componentProps: {
                    songs: songs.items,
                    artist: album.name
                }
            });

            modal.onDidDismiss().then((dataRetun: any) =>{
                // this.getAndPlaySong(dataRetun);
                this.playerComponent.getAndPlaySong(dataRetun);
            });
            
             modal.present();
        });
    }

    ngOnDestroy() {
        
        this.subNewRealeases !== null && this.subNewRealeases.unsubscribe();
        this.artistSong !== null && this.artistSong.unsubscribe();
        this.albumSong !== null && this.albumSong.unsubscribe();
    }


}
