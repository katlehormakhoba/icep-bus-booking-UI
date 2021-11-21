import { WishService } from './../../cart/shared/service/wish.service';
import { AuthService } from './../../authorization/shared/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../shared/service/product.service';
import { Product } from '../shared/model/product.model';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart/shared/service/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  products: Product[] = [];
  message: string = '';
  errors = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private wishService: WishService,
    private auth: AuthService) { }

  ngOnInit(): void {

    this.checkMessage();
    this.spinner.show();
    this.productService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products['data'];
      this.spinner.hide();
      // console.log(products);
    }, errors => {
      this.spinner.hide();
      this.errors[0] = errors;
    });
  }

  // User notification message
  checkMessage() {
    this.route.queryParams.subscribe(params => {
      params['message'] ? this.message = params['message'] : null;

      setTimeout(() => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { message: null },
          queryParamsHandling: 'merge'
        });

      }, 2000);
    });
  }


  createOrder(id) {

    this.errors = [];
    this.message = '';

    return this.cartService.createOrder(id, {}).subscribe(data => {
      // console.log("order",data);

      this.message = 'product successfully added to cart';

    }, errors => {

      this.errors[0] = errors;
    });
  }

  createWishlist(id) {

    return this.wishService.createWishlist(id, {}).subscribe(data => {
      // DOES NOTHING IF SUCCESSFULL
    }, errors => {
      this.errors[0] = errors;
    });
  }
}

