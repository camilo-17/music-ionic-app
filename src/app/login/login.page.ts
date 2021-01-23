import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthencticateService } from '../services/authencticate.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    Object = Object;
    loginForm: FormGroup;
    errorMsg: string = '';
    validationMessage: any = {
        email: [
            { type: "required", message: 'El email es requerido' },
            { type: "email", message: 'El email no es valido' }
        ],
        password: [
            { type: "required", message: 'El password es requerido' },
            { type: "minlength", message: 'password debe contener minimo 5 letras' }
        ]
    }
    constructor(
        private formBuilder: FormBuilder, 
        private authService: AuthencticateService, 
        private router: Router, 
        private navCtrl: NavController,
        private storage: Storage
        ) {
        this.loginForm = this.formBuilder.group({
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ]))
        });
    }

    loginUser( credentials: any ) {
        this.authService.loginUser(credentials).then(res => {
            if(!res) {
                this.errorMsg = 'Login incorrecto';
                return;
            }
            this.storage.set('isUserLoggedIn', true);
            this.errorMsg = '';
            this.navCtrl.navigateForward('/menu/home');
        })
    }

    formIsValid( type, input ) {
        try {
            const property = this.loginForm.get(input);
            if(!property.touched) {
                return true;
            }
            const errors = property.hasOwnProperty('errors') ? property.errors : null;
            const response = (errors != null && errors.hasOwnProperty(type)) ? false : true;
            return response;
            
        } catch (error) {
            return false;
        }
    }

    goToRegister() {
        this.navCtrl.navigateForward('/register');
    }

    ngOnInit() {
       
    }
}
