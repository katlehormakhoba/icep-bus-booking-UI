import { AuthService } from './components/authorization/shared/service/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ProductListingComponent } from './components/product/product-listing/product-listing.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { CartListingComponent } from './components/cart/cart-listing/cart-listing.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { SignupComponent } from './components/authorization/signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './components/user/account/account.component';
import { UserSupportComponent } from './components/user/user-support/user-support.component';
import { WishListComponent } from './components/cart/wish-list/wish-list.component';
import { TokenInterceptor } from './components/authorization/shared/service/token.interceptors';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmptyComponent } from './shared/empty/empty.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { OrderListingComponent } from './components/orders/order-listing/order-listing.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductListingComponent,
    ProductDetailsComponent,
    CartListingComponent,
    LoginComponent,
    SignupComponent,
    AccountComponent,
    UserSupportComponent,
    WishListComponent,
    EmptyComponent,
    CheckoutComponent,
    OrderListingComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
