import { UserService } from './../../authorization/shared/service/user.service';
import { User } from './../../authorization/shared/model/user.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountFormData: User;
  URL: string = `https://res.cloudinary.com/katleho/image/upload/v1606199140/`;
  warnings = [];
  errors = [];
  userName: string;
  userEmail: string;
  userPhoto: string;
  message: string = '';


  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.accountFormData = new User();
    this.getMe();

  }

  private getMe() {
    this.spinner.show();
    this.errors = [];
    return this.userService.getMe().subscribe(async data => {
      this.userName = data['data'].name;
      this.userEmail = data['data'].email;
      this.userPhoto = await this.URL + data['data'].photo;
      this.spinner.hide();
    }, errors => {
      this.errors[0] = errors;
      this.spinner.hide();
    });
  }

  public updatePhoto(files: FileList) {
    this.errors = [];
    this.userService.updatePhoto(files.item(0)).subscribe(data => {
      this.message = 'Successfully updated Photo';
      // console.log(data);
    }, errors => {
      this.errors[0] = errors;
    });
  }

  public updateMe() {
    this.errors = [];
    this.userService.updateMe(this.accountFormData).subscribe(data => {
      this.message = 'Successfully updated profile';
      // console.log(data);
    }, errors => {
      this.errors[0] = errors;
    });
  }
}
