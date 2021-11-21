import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input('isAuthenticated') isAuthenticated: boolean = false;
  @Input('username') username: string = 'user';
  @Input('logout') logout = () => {};
  @Input('userPhoto') userPhoto: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
