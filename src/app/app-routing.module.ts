import { OrderListingComponent } from './components/orders/order-listing/order-listing.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { WishListComponent } from './components/cart/wish-list/wish-list.component';
import { UserSupportComponent } from './components/user/user-support/user-support.component';
import { AccountComponent } from './components/user/account/account.component';
import { SignupComponent } from './components/authorization/signup/signup.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { CartListingComponent } from './components/cart/cart-listing/cart-listing.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductListingComponent } from './components/product/product-listing/product-listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './components/authorization/shared/service/auth-guard.service';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
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
    path: 'wish', component: WishListComponent, canActivate: [AuthGuardService]
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
