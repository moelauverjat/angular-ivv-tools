import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { Validate } from '../models/Validate';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*Les strings contenant les Url a appelé pour accéder à la base de donnée*/
  URL: string = 'http://127.0.0.1:5000/';
  URLVALIDATE : string = this.URL+"validateuser";
  URLFILLUSERSDATABASE : string = this.URL+"fillusersdatabase"

  // Options nécessaires pour certains appels http
  private httpOptions = {
    headers : new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  }

  /*Le constructeur*/
  constructor(private http: HttpClient) {}

  /*Vérifie l'email et le mot de passe dans la BDD MySQL*/
  validate(user:User) : Observable<Validate> {  
    return this.http.post<Validate>(this.URLVALIDATE, user, this.httpOptions);
  }

  /*Actualise la liste des issues dans la BDD MySQL*/
  refreshAllUsers() : Observable<Validate> {
    return this.http.get<Validate>(this.URLFILLUSERSDATABASE, this.httpOptions);
  }
  
}