import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User';
import { Validate } from './models/Validate';
import { Issue } from './models/Issue';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = 'http://127.0.0.1:5000/';
  URLVALIDATE : string = this.URL+"validateuser";
  URLGETALLISSUES: string = this.URL+"getallissues";
  URLFILLISSUESDATABASE: string = this.URL+"fillissuesdatabase";


  // Options nécessaires pour certains appels http
  private httpOptions = {
    headers : new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  }

  constructor(private http: HttpClient) { }

  /**
   * Retourne un observable capable de trouver
   * un object User à partir de la source
   * des données
   * @returns un observable qui produira le tableau
   */
  validate(user:User) : Observable<Validate> {
    
    return this.http.post<Validate>(this.URLVALIDATE, user, this.httpOptions);
  }

  getAllIssues() : Observable<Issue[]> {
    return this.http.get<Issue[]>(this.URLGETALLISSUES, this.httpOptions)
  }

  refreshAllIssues() : Observable<Validate> {
    return this.http.get<Validate>(this.URLFILLISSUESDATABASE, this.httpOptions);
  }
  
}