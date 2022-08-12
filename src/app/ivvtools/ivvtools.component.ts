import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Issue, issuesfunction } from '../models/Issue';
import { Router } from '@angular/router';
import { Validate } from '../models/Validate';
import { IssuesService } from '../services/issues.service';
import { LoadingService } from '../services/loading.service';
import { UserService } from '../services/user.service';
import { TagsService } from '../services/tags.service';
import { Tag } from '../models/tag';
import { CsvService } from '../services/csv.service';
@Component({
  selector: 'app-ivvtools',
  templateUrl: './ivvtools.component.html',
  styleUrls: ['./ivvtools.component.css']
})
export class IvvtoolsComponent implements OnInit {

  /*The variables*/
  /*Import composants*/
  issuesService: IssuesService;
  userService: UserService;
  tagService: TagsService;
  loading$ = this.loader.loading$;
  //Store the list of displayed issues
  issues: Issue[] = []
  //Store the list of all issues : not displayed
  allIssues: Issue[] = []
  //Store the list of all tags displayed under the "show more options"
  allTags: Tag[] = []
  // Store the string that show the number of bugs
  displayText: String = "in total"
  /** This variables bellow store the state of filter button in the header
   * It is useful for the function displayList. 
   * It allow this function to know what list she suppose to generate
   * It is used to by the html page for knowing the state of button
   * and change the color in purple if selected
  */
  // Store the state of the 'all' button 
  allTagButton = true;
  // Store the state of the 'workaround' and 'no workaround' button 
  workaroundTagButton = "";
  // Store the state of the 'close' and 'not close' button 
  closeTagButton = "";
  // Store the state of the auto generate button under the 'Show more options'
  otherTagButton = ""
  // Show or hide more options in html page
  hiddentags = true;
  // The email of the admin
  admin = "alice.durand@csgroup.eu"
  
  /*The constructor*/
  constructor(
    private u: UserService, 
    private i: IssuesService,
    private t: TagsService, 
    private _csvService: CsvService,
    private router: Router, 
    public loader: LoadingService) 
    {
    this.issuesService = i;
    this.userService = u;
    this.tagService = t;
   }

  /*Le constructeur de la page web*/
  ngOnInit(): void {
    this.getAllTags();
    this.getAllIssues();
  }

/****************************************************************
 *****************Call to MySQL Database*************************
 ***************************************************************/

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

/****************************************************************
 ************Filters Buttons in the header***********************
 ***************************************************************/

 /**
  * This two functions allow to show or hide additionnals 
  * tags in the html page
  */
 showHiddenTags() {
    this.hiddentags = false;
  }

  hideHiddenTags() {
    this.hiddentags = true;
  }

  /**
  * This function show all issues
  * It is called when "all" filter option is clicked
  */
  listAllIssues() {
    /**Issues is the show list
     * allIssues contains all Issues that have been stored in database
     * this.issues = this.allIssues copy the reference and not the data
     * In mean that if the datas are modified in issues, it modify the datas in allIssues
     * We don't want this
     * In writing like this, we copy the data inside the variable, and not the reference
     */
    this.issues = JSON.parse(JSON.stringify(this.allIssues));
    // Mofidy the text before the table that show the number of bug in the list
    this.displayText = "in total";
    // Show the all filter in purple
    this.allTagButton = true;
    // Reset all others filter value
    this.workaroundTagButton = "";
    this.closeTagButton = "";
    this.otherTagButton = "";
  }

  /**
  * This function hide the bug without workaround
  * It is called when the "workaround" button is clicked
  * It change the value of the required variable before calling the displayList function
  */
  listWorkaroundIssues() {
    if(this.workaroundTagButton != "workaround") {
      this.workaroundTagButton= "workaround";
    } else {
      this.workaroundTagButton= "";
    }
    this.displayList();
  }

  /**
  * This function hide the bug with workaround
  * It is called when the "no workaround" button is clicked
  * It change the value of the required variable before calling the displayList function
  */
  listNoWorkaroundIssues() {
    if(this.workaroundTagButton != "noworkaround") {
      this.workaroundTagButton= "noworkaround";
    } else {
      this.workaroundTagButton= "";
    }
    this.displayList();
  }

  /**
  * This function hide the bug that are not closed
  * It is called when the "close" button is clicked
  * It change the value of the required variable before calling the displayList function
  */
  listClosedIssues() {
    if(this.closeTagButton != "closed") {
      this.closeTagButton = "closed";
    } else {
      this.closeTagButton = "";
    }
    this.displayList();
  }

  /**
  * This function hide the bug that are closed
  * It is called when the "not close" button is clicked
  * It change the value of the required variable before calling the displayList function
  */
  listNotClosedIssues() {
    if(this.closeTagButton != "notclosed") {
      this.closeTagButton = "notclosed";
    } else {
      this.closeTagButton = "";
    }
    this.displayList();
  }

  /**
  * This function hide the bug that aren't the specified tag in the title
  * It is called when any tag button under the "more option" is clicked
  * It change the value of the required variable before calling the displayList function
  */
  listTagIssues(tag: string) {
    if(this.otherTagButton != tag) {
      this.otherTagButton = tag;
    } else {
      this.otherTagButton = "";
    }
    this.displayList()
  }

  /**
  * This function is call by all button function (except 'all' button)
  * It process all button value and show the correct list according to
  * It create to the appropriate string "displayText"
  */
  displayList() {
    /*Reset the list of tag for it contains all tags
    For more info about this ligne, go to listAllIssues function*/
    this.issues = JSON.parse(JSON.stringify(this.allIssues));
    // Reset the display text (text that show the number of bug in the list)
    this.displayText = "";
    // Test if one of the 3 kind of tag is selectionned
    if((this.workaroundTagButton == "") && (this.closeTagButton == "") && (this.otherTagButton == "")) {
      // If not any of the 3 kind of filter is selectionned, show the list of all bugs
      this.listAllIssues();
    } else {
      // Test if the workaround filter is selected
      if(this.workaroundTagButton == "workaround") {
        // Supress all bugs with no workaround
        this.listIssues((i: number) => !this.issues[i].workaround)
        // Actualize displayed text
        this.displayText = "with a workaround";
      } 
      // Test if the no workaround filter is selected
      if (this.workaroundTagButton == "noworkaround") {
        // Supress all bugs with a workaround
        this.listIssues((i: number) => this.issues[i].workaround)
        // Actualize displayed text
        this.displayText = "with no workaround";
      }
      // Test if the close filter is selected
      if(this.closeTagButton == "closed") {
        // Supress all bugs that are not closed
        this.listIssues((i: number) => !this.issues[i].closure)
        // Actualize displayed text
        if(this.displayText != "") {
          let temp = this.displayText + " and which are closed";
          this.displayText = temp;
        } else {
          this.displayText = "closed";
        }
      } 
      // Test if the not close filter is selected
      if(this.closeTagButton == "notclosed"){
        // Supress all bugs that are closed
        this.listIssues((i: number) => !!this.issues[i].closure);
        // Actualize displayed text
        if(this.displayText != "") {
          let temp = this.displayText + " and which are not closed";
          this.displayText = temp;
        } else {
          this.displayText = "not closed";
        }
      }
      // Test if one of the others filter is selected
      if(this.otherTagButton != ""){
        // Supress all bugs that are not the chosen tag
        const tag = "[" + this.otherTagButton + "]"
        this.listIssues((i:number) => !this.issues[i].title.toLowerCase().includes(tag))
        // Actualize displayed text
        if(this.displayText != "") {
          let temp = this.displayText + " and with " + tag + " label";
          this.displayText = temp;
        } else {
          this.displayText = "with " + tag + " label";
        }
      }
    }
  }

  /**
  * This function actualize the list of all issues 
  * in suppressing not required bugs
  * It's call by display list
  */
   listIssues(testIssues: issuesfunction) {
    /* Go through the list of all issues in opposite order 
    (opposite order is required for .splice() to work correctly)
    and suppress all issues asked by displayList() function
    */
    for (var i = this.issues.length - 1; i >= 0; i--) {
      if(testIssues(i)) {
        this.issues.splice(i, 1);
      }
    };
    // Make the 'all' filter to not be purple
    this.allTagButton = false;
  }

  /****************************************************************
 *************************Download csv*****************************
 *****************************************************************/

  /* Permer à l'utilisateur de télécharger la liste des issues couramment affiché 
  à l'écran au format .CSV*/
  public saveDataInCSV(): void {
    // Appel la fonction saveDateInCsv du service CsvService
    let csvContent = this._csvService.saveDataInCSV(this.issues);

    // Crée un document
    var hiddenElement = document.createElement('a');
    // Remplie le document avec les données
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    // Dit que le téléchargemnt doit se faire sur un autre onglet
    hiddenElement.target = '_blank';
    // Donne le nom du document
    hiddenElement.download = 'list_issues_github.csv';
    hiddenElement.click();
  }

/****************************************************************
 *************************Others functions*****************************
 *****************************************************************/

  /*Permet de récupérer l'email de l'utilisateur connecté*/
  getUser() {
    return sessionStorage.getItem('user');
  }

}
