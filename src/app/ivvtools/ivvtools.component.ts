import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Issue } from '../models/Issue';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Validate } from '../models/Validate';

@Component({
  selector: 'app-ivvtools',
  templateUrl: './ivvtools.component.html',
  styleUrls: ['./ivvtools.component.css']
})
export class IvvtoolsComponent implements OnInit {

  userService: UserService;
  loginUser!: User;
  issues: Issue[] = []


  constructor(private user: UserService, private router: Router) {
    this.userService = user;
   }

  ngOnInit(): void {
    this.getAllIssues()
  }

  getAllIssues() {
    this.userService.getAllIssues().subscribe(
      (i : Issue[]) => {
        this.issues = i;
      }
    )
  }

  getUser() {
    return sessionStorage.getItem('user');
  }

  refreshIssues() {
    console.log("We are in the refrestIssues")
    this.userService.refreshAllIssues().subscribe(
      (v: Validate) => {
        if (v.valid == true) {
        } else {
        }
        window.location.reload();
      }
        
    )
  }
}
