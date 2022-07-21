import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  /*Les strings contenant les Url a appelé pour accéder à la base de donnée*/
  URL: string = 'http://127.0.0.1:5000/';
  URLGETALLTAGS: string = this.URL+"getalltags";

  // Options nécessaires pour certains appels http
  private httpOptions = {
    headers : new HttpHeaders(
      {'Content-Type': 'application/json'}
    )
  }

  /*Le constructeur*/
  constructor( private http: HttpClient) { }

  /*Obtient la liste de tous les tags stockées dans la BDD MySQL*/
  getAllIssues() : Observable<Tag[]> {
    return this.http.get<Tag[]>(this.URLGETALLTAGS, this.httpOptions)
  }

}
