import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { SongsModalPageModule } from './modals/songs-modal/songs-modal.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
// import { SongsModalComponent } from './components/songs-modal/songs-modal.component';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:[
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: environment.mapsKeyApi
    }),
    HttpClientModule, 
    SongsModalPageModule
  ],
  providers: [
    StatusBar, 
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
