import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

    slideOpts = {
      initialSlide: 0,
      slidePerView: 1,
      centerSlides: true,
      speed: 400
    }

    slides:any = [{
      title: "Bienvenido a la aplicación",
      subtitle: "Todavia no sabemos de que sera",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. At aperiam placeat eum, obcaecati, tempore aliquam reiciendis magnam provident culpa corporis nulla sequi necessitatibus dolorem voluptatum debitis dicta! Ab, alias labore.",
      icon: "play",
      buttonText: 'saltar'
    },{
      title: "Bienvenido a la aplicación",
      subtitle: "Todavia no sabemos de que sera",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. At aperiam placeat eum, obcaecati, tempore aliquam reiciendis magnam provident culpa corporis nulla sequi necessitatibus dolorem voluptatum debitis dicta! Ab, alias labore.",
      icon: "play",
      buttonText: 'saltar'
    },{
      title: "Bienvenido a la aplicación",
      subtitle: "Todavia no sabemos de que sera",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. At aperiam placeat eum, obcaecati, tempore aliquam reiciendis magnam provident culpa corporis nulla sequi necessitatibus dolorem voluptatum debitis dicta! Ab, alias labore.",
      icon: "play",
      buttonText: 'continuar'
    },
  ];
  constructor(private router: Router, private storage: Storage) {
      this.storage.set('isIntroShowed', true);
  }

  ngOnInit() {
  }

  finish() {
      this.router.navigateByUrl("/home");
  }

}
