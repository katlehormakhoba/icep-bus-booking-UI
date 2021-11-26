import { AccountComponent } from './components/user/account/account.component';
import { SignupComponent } from './components/authorization/signup/signup.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './components/authorization/shared/service/auth-guard.service';
import { BusListingComponent } from './components/bus/bus-listing/bus-listing.component';
import { BusDetailsComponent } from './components/bus/bus-details/bus-details.component';
import { BookingListingComponent } from './components/booking/booking-listing/booking-listing.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'bus', pathMatch: 'full'
  },
  {
    path: 'bus', component: BusListingComponent
  },
  {
    path: 'booking', component: BookingListingComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'me', component: AccountComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'history', component: BusDetailsComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
