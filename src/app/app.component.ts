import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IVV TOOLS';

  constructor(private router: Router) {

  }

  getUser() {
    return sessionStorage.getItem('user');
  }

  disconnect() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/connect'])
    }
}
