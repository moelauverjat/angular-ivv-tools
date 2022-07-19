import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../models/Issue';
import { Validate } from '../models/Validate';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  /*Les strings contenant les Url a appelé pour accéder à la base de donnée*/
  URL: string = 'http://127.0.0.1:5000/';
  URLGETALLISSUES: string = this.URL+"getallissues";
  URLFILLISSUESDATABASE: string = this.URL+"fillissuesdatabase";

  // Options nécessaires pour certains appels http
  private httpOptions = {
    headers : new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  }

  /*Le constructeur*/
  constructor( private http: HttpClient) { }

  /*Obtient la liste de tous les issues stockées dans la BDD MySQL*/
  getAllIssues() : Observable<Issue[]> {
    return this.http.get<Issue[]>(this.URLGETALLISSUES, this.httpOptions)
  }

  /*Actualise la liste des issues dans la BDD MySQL*/
  refreshAllIssues() : Observable<Validate> {
    return this.http.get<Validate>(this.URLFILLISSUESDATABASE, this.httpOptions);
  }
}
