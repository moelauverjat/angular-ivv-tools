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

  /*Les variables*/
  /*Les composants importés*/
  userService: UserService;
  /*Variable pour temporairement stocker l'utilisateur et le mot de passe*/
  loginUser!: User;

  /*Le constructeur*/
  constructor(private user: UserService, private router: Router) {
    this.userService = user;
  }

  ngOnInit(): void {
  }

  /**
   * Traite la soumission du formulaire pour se connecter à l'appli
   * @param form 
   */
  onFormSubmit(form: NgForm) {
    /*Stocke les données du formulaire dans une variable*/
    this.loginUser = {
      email: form.value.email,
      password: form.value.password
    };

    /*S'abonne à un observable qui attend la réponse du serveur*/
    this.userService.validate(this.loginUser).subscribe(
        (v : Validate) => {
          if (v.valid == true) {
            sessionStorage.setItem('user', this.loginUser.email);
            this.router.navigate(['/ivvtools'])
          }
          if (v.valid == false) {
            console.log(v.error);
          }
        }
      );
  }
  
  /*S'abonne à un observable qui attend la réponse du serveur*/
  formValueToUser(form: any): User {
    return {
      email: form.value.email,
      password: form.value.password
    } as User

  }

  /*Permet de récupérer l'email de l'utilisateur connecté*/
  getUser() {
    return sessionStorage.getItem('user');
  }

}
