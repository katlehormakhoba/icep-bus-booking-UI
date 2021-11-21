import { PaymentService } from './../../authorization/shared/service/payment.service';
import { Router } from '@angular/router';
import { CartService } from './../shared/service/cart.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Address } from '../shared/model/address.model';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  addressFormData: Address;
  results: number = 0;
  warnings = [];
  errors = [];
  quantity: number = 1;
  amount: number = 0;
  totAmount: number = 0
  message: string = '';
  deliveryDate: string;

  constructor(
    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {

    this.addressFormData = new Address();
    this.getCartStats();
  }

  public getCartStats() {

    this.spinner.show();
    this.cartService.getCartStats().subscribe(data => {
      // console.log('these are my stats',data)
      this.amount = data['amount'];
      this.checkoutAuth();
      this.totAmount = this.amount + 150;
      if (this.amount < 1) { this.totAmount = 0; }
      this.results = data['results'];
      this.spinner.hide();

    }, errors => {
      this.errors[0] = errors;
    });

  }

  public getAllCheckoutSession() {

    this.errors = [];
    this.addressFormData.amount = this.totAmount;
    // console.log(this.addressFormData);
    this.paymentService.getAllCheckoutSession(this.addressFormData)
      .subscribe(async data => {
        const stripe = await loadStripe(`pk_test_51HOZR1BUM2e9J3qBTox7wFVmgFHvhb1lFtqOthxhpcKDrGCpVZf2pNUtuHI081RA2NJaasWNGmybIC9Z5dH225Pm00CQhcptCT`);
        await stripe.redirectToCheckout({
          sessionId: data['session'].id
        });
      }, errors => {
        this.errors[0] = errors;

      });
  }

  private checkoutAuth() {

    if (this.amount < 100) {
      this.router.navigate(['/cart'], {
        queryParams: { message: 'Cart is empty' }
      });
    }
    // Else do nothing
  }

}
