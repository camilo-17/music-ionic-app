import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    registerForm: FormGroup;
    Object = Object;
    errorMsg: string = '';
    validationMessage: any = {
        name: [
            { type: "required", message: 'El nombre es requerido' },
            { type: "pattern", message: 'El nombre no puede contener numeros o caracteres especiales' }
        ],
        lastname: [
            { type: "required", message: 'El apellido es requerido' },
            { type: "pattern", message: 'El apellido no puede contener numeros o caracteres especiales' }
        ],
        genre: [
            { type: "required", message: 'El genero es requerido' },
            // { type: "minlength", message: 'password debe contener minimo 5 letras' }
        ],
        email: [
            { type: "required", message: 'El email es requerido' },
            { type: "email", message: 'El email no es valido' }
        ],
        password: [
            { type: "required", message: 'El password es requerido' },
            { type: "minlength", message: 'password debe contener minimo 5 letras' }
        ],
        confirmPassword: [
            { type: "required", message: 'la confirmacion es requerida es requerido' },
            { type: "equalTo", message: 'la contraseña no coincide' },
            { type: "minlength", message: 'password debe contener minimo 5 letras' }
        ]
    }
    
    constructor(private formBuilder: FormBuilder ) {
        const password = new FormControl('', Validators.compose([
            Validators.required,
            Validators.minLength(5)
        ]));

        this.registerForm = this.formBuilder.group({
            name: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[a-zA-Z ]+")
            ])),
            lastname: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern("[a-zA-Z ]+")
            ])),
            genre: new FormControl(''),
            email: new FormControl('', Validators.compose([
                Validators.required,
                Validators.email
            ])),
            password: password,
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.pattern("[a-zA-Z ]+"),
                CustomValidators.equalTo(password)
            ]))
        });
    }
    
    ngOnInit() {
    }

    loginUser() {

    }

    formIsValid( type, input ) {
        try {
            const property = this.registerForm.get(input);
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

}
