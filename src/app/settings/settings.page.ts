import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage  {

  userImage = "assets/user.jpg";
  photo: SafeResourceUrl = null;

  constructor(private sanitize: DomSanitizer) { }


  async doNotification() {
//     this.localNotifications.schedule({
//         id: 1,
//         text: 'Single ILocalNotification',
//         sound: 'assets/sounds/sound.mp3',
//         // data: { secret: key }
//       });
const notifs = await LocalNotifications.schedule({
    notifications: [
      {
        title: "Title",
        body: "Body",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        sound: null,
        attachments: null,
        actionTypeId: "",
        extra: null
      }
    ]
  });
   }

  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitize.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
    console.log(image);
    
  }

}
