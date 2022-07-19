import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { Router } from '@angular/router';
import { Validate } from '../models/Validate';
import { LoadingService } from '../loading.service';
import { IssuesService } from '../issues.service';

@Component({
  selector: 'app-ivvtools',
  templateUrl: './ivvtools.component.html',
  styleUrls: ['./ivvtools.component.css']
})
export class IvvtoolsComponent implements OnInit {

  /*Les variables*/
  /*Import du composant*/
  issuesService: IssuesService;
  /*Pour utilise le loader*/
  loading$ = this.loader.loading$;
  /*Pour stocker la liste des issues*/
  issues: Issue[] = []
  
  /*Le constructeur*/
  constructor(private user: IssuesService, private router: Router, public loader: LoadingService) {
    this.issuesService = user;
   }

  /*Le constructeur de la page web*/
  ngOnInit(): void {
    this.getAllIssues()
  }

  /*S'inscrit à un observable qui attend la liste des issues*/
  getAllIssues() {
    this.issuesService.getAllIssues().subscribe(
      (i : Issue[]) => {
        this.issues = i;
      }
    )
  }

  /*Actualise la base de donnée mySQL en récupérant les dernières informations sur github*/
  refreshIssues() {
    this.issuesService.refreshAllIssues().subscribe(
      (v: Validate) => {
        /*Relance le chargement de la table quand le chargement est terminé 
        (cela permet d'actualiser le tableau)*/
        window.location.reload();
      }
        
    )
  }

  /*Permet de récupérer l'email de l'utilisateur connecté*/
  getUser() {
    return sessionStorage.getItem('user');
  }

}
