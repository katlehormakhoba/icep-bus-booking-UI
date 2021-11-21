import { PaymentService } from './../../authorization/shared/service/payment.service';
import { ProductService } from './../shared/service/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/model/product.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from '../../cart/shared/service/cart.service';
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  errors = [];
  message: string = '';
  mainImage: string;



  constructor(
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private route: ActivatedRoute) {
    this.product = new Product();
  }

  ngOnInit(): void {

    this.errors = [];
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.productService.getProduct(params['id']).subscribe(data => {
        this.product = data['data'];
        this.mainImage = data['data'].coverImage;
        // console.log(data)
        this.spinner.hide();
      }, errors => {
        this.spinner.hide();
        this.errors[0] = errors;
      });
    });

  }

  changeImage(image) {
    this.mainImage = image;
  }

  createOrder(id) {
    this.errors = [];
    this.message = '';

    this.cartService.createOrder(id, {}).subscribe(data => {
      this.message = 'product successfully added to cart';

    }, errors => {

      this.errors[0] = errors;
    });
  }


  checkOut(id) {
    this.errors = [];
    this.message = '';

    this.paymentService.makePayment(id).subscribe(async data => {
      const stripe = await loadStripe(`pk_test_51HOZR1BUM2e9J3qBTox7wFVmgFHvhb1lFtqOthxhpcKDrGCpVZf2pNUtuHI081RA2NJaasWNGmybIC9Z5dH225Pm00CQhcptCT`);
      await stripe.redirectToCheckout({
        sessionId: data.session.id
      });

    }, errors => {
      this.errors[0] = errors;
    });
  }

}
