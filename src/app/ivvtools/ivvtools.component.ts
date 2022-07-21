import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Issue, issuesfunction } from '../models/Issue';
import { Router } from '@angular/router';
import { Validate } from '../models/Validate';
import { IssuesService } from '../services/issues.service';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';
import { TagsService } from '../services/tags.service';
import { Tag } from '../models/tag';
@Component({
  selector: 'app-ivvtools',
  templateUrl: './ivvtools.component.html',
  styleUrls: ['./ivvtools.component.css']
})
export class IvvtoolsComponent implements OnInit {

  /*Les variables*/
  /*Import du composant*/
  issuesService: IssuesService;
  userService: UserService;
  tagService: TagsService;
  /*Pour utilise le loader*/
  loading$ = this.loader.loading$;
  /*Pour stocker la liste des issues*/
  issues: Issue[] = []
  allIssues: Issue[] = []
  allTags: Tag[] = []
  tags: String[] = []
  count: number = 0;
  countHidden: number = 0;
  displayText: String = "in total"
  allTagButton = true;
  workaroundTagButton = "";
  closeTagButton = "";
  otherTagButton = ""
  hiddentags = true;
  
  /*Le constructeur*/
  constructor(
    private u: UserService, 
    private i: IssuesService,
    private t: TagsService, 
    private router: Router, 
    public loader: LoadingService) 
    {
    this.issuesService = i;
    this.userService = u;
    this.tagService = t;
   }

  /*Le constructeur de la page web*/
  ngOnInit(): void {
    this.getAllIssues()
    this.getAllTags()
  }

  /*S'inscrit à un observable qui attend la liste des issues*/
  getAllIssues() {
    this.issuesService.getAllIssues().subscribe(
      (i : Issue[]) => {
        this.allIssues = i;
        this.listAllIssues();
      }
    )
  }

  /*S'inscrit à un observable qui attend la liste des tags*/
  getAllTags() {
    this.tagService.getAllIssues().subscribe(
      (t : Tag[]) => {
        this.allTags = t;
        console.log(this.allTags)
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

  /*Actualise la base de donnée mySQL en récupérant les dernières informations sur squash*/
  refreshUsers() {
    this.userService.refreshAllUsers().subscribe(
      (v: Validate) => {
        /*Relance le chargement de la table quand le chargement est terminé 
        (cela permet d'actualiser le tableau)*/
        window.location.reload();
      }
    )
  }

  listAllIssues() {
    this.issues = JSON.parse(JSON.stringify(this.allIssues));;
    this.count = 0;
    this.allIssues.forEach(issue => {
        this.count = this.count + 1;
      });
    this.countHidden = this.count;
    this.displayText = "in total";
    this.allTagButton = true;
    this.workaroundTagButton = "";
    this.closeTagButton = "";
  }

  listWorkaroundIssues() {
    if(this.workaroundTagButton != "workaround") {
      this.workaroundTagButton= "workaround";
    } else {
      this.workaroundTagButton= "";
    }
    this.displayList();
  }

  listNoWorkaroundIssues() {
    if(this.workaroundTagButton != "noworkaround") {
      this.workaroundTagButton= "noworkaround";
    } else {
      this.workaroundTagButton= "";
    }
    this.displayList();
  }

  listClosedIssues() {
    if(this.closeTagButton != "closed") {
      this.closeTagButton = "closed";
    } else {
      this.closeTagButton = "";
    }
    this.displayList();
  }

  listNotClosedIssues() {
    if(this.closeTagButton != "notclosed") {
      this.closeTagButton = "notclosed";
    } else {
      this.closeTagButton = "";
    }
    this.displayList();
  }

  listTagIssues(tag: string) {
    if(this.otherTagButton != tag) {
      this.otherTagButton = tag;
    } else {
      this.otherTagButton = "";
    }
    this.displayList()
  }
  
  listIssues(testIssues: issuesfunction) {
    console.log(this.allIssues)
    for (var i = this.issues.length - 1; i >= 0; i--) {
      if(testIssues(i)) {
        this.issues.splice(i, 1);
        this.count = this.count - 1;
      }
    };
    this.allTagButton = false;
    console.log(this.allIssues)
  }

  displayList() {
    this.issues = JSON.parse(JSON.stringify(this.allIssues));
    console.log(this.allIssues)
    this.count = this.countHidden;
    this.displayText = "";
    if((this.workaroundTagButton == "") && (this.closeTagButton == "") && (this.otherTagButton == "")) {
      this.listAllIssues();
    } else {
      if(this.workaroundTagButton == "workaround") {
        this.listIssues((i: number) => !this.issues[i].workaround)
        this.displayText = "with a workaround";
      } 
      if (this.workaroundTagButton == "noworkaround") {
        this.listIssues((i: number) => this.issues[i].workaround)
        this.displayText = "with no workaround";
      }
      if(this.closeTagButton == "closed") {
        this.listIssues((i: number) => !this.issues[i].closure)
        if(this.displayText != "") {
          let temp = this.displayText + " and which are closed";
          this.displayText = temp;
        } else {
          this.displayText = "closed";
        }
      } 
      if(this.closeTagButton == "notclosed"){
        this.listIssues((i: number) => !!this.issues[i].closure)
        if(this.displayText != "") {
          let temp = this.displayText + " and which are not closed";
          this.displayText = temp;
        } else {
          this.displayText = "not closed";
        }
      }
      if(this.otherTagButton != ""){
        const tag = "[" + this.otherTagButton + "]"
        this.listIssues((i:number) => !this.issues[i].title.toLowerCase().includes(tag))
        if(this.displayText != "") {
          let temp = this.displayText + " and with " + tag + " label";
          this.displayText = temp;
        } else {
          this.displayText = "with " + tag + " label";
        }
      }
    }
  }



  showHiddenTags() {
    this.hiddentags = false;
  }

  hideHiddenTags() {
    this.hiddentags = true;
  }

  /*Permet de récupérer l'email de l'utilisateur connecté*/
  getUser() {
    return sessionStorage.getItem('user');
  }

}
