import { Component, createPlatform, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/User';
import { Validate } from '../models/Validate';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {

  userService: UserService;
  loginUser!: User;

  constructor(private user: UserService, private router: Router) {
    this.userService = user;
  }

  ngOnInit(): void {
    console.log("On est dans le constructeur du composant connect");
  }

  /**
   * Traite la soumission du formulaire
   * d'ajout d'une personne
   * @param form 
   */
  onFormSubmit(form: NgForm) {

    console.log("On est dans onFormSubmit");

    this.loginUser = {
      email: form.value.email,
      password: form.value.password
    };

    this.userService.validate(this.loginUser).subscribe(
        (v : Validate) => {
          if (v.valid == true) {
            sessionStorage.setItem('user', this.loginUser.email);
            console.log("Cet email est dans l'api : " + sessionStorage.getItem('user'));
            this.router.navigate(['/ivvtools'])
          }
          if (v.valid == false) {
            console.log(v.error);
          }
        }
      );
  }

  formValueToUser(form: any): User {
    return {
      email: form.value.email,
      password: form.value.password
    } as User

  }

  getUser() {
    return sessionStorage.getItem('user');
  }

}
