import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './components/authorization/shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

 // This page or component is always initiated
export class AppComponent implements OnInit {


  constructor(
    public auth: AuthService,
    private router: Router) { }


  ngOnInit(): void {

    this.auth.checkAuthentication(); // To  keep on checking if im logged in

  }

  logout = () => {
    this.auth.logout();
    this.router.navigate(['/']);

  }

}
