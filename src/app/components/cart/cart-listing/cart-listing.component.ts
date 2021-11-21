import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../shared/model/cart.model';
import { CartService } from '../shared/service/cart.service';

@Component({
  selector: 'app-cart-listing',
  templateUrl: './cart-listing.component.html',
  styleUrls: ['./cart-listing.component.scss']
})
export class CartListingComponent implements OnInit {

  orders: Cart[] = [];
  results: number = 0;
  errors = [];
  quantity: number = 1;
  amount: number = 0;
  totAmount: number = 0
  message: string = '';
  deliveryDate: string;

  constructor(
    private cartService: CartService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getMyOrders();
    this.getCartStats();
    this.checkMessage();
    this.setDeliveryDate();

  }

  setDeliveryDate() {

    const date = new Date(Date.now());

    new Date(date.setDate(date.getDate() + 4));

    if (date.getDay() === 6) { new Date(date.setDate(date.getDate() + 2)) };
    if (date.getDay() === 0) { new Date(date.setDate(date.getDate() + 1)) };

    this.deliveryDate = date.toDateString();

  }

  public getMyOrders() {

    this.spinner.show();
    this.cartService.getMyOrders().subscribe((orders: Cart[]) => {
      this.orders = orders['data'];
      // this.results = orders['results'];
      this.spinner.hide();
    }, errors => {
      this.spinner.hide();
      this.errors[0] = errors;
    });

  }
  moveToWishlist(id) {
    this.cartService.moveToWishlist(id, {}).subscribe(data => {
      this.message = 'product moved to wishlist';
      this.ngOnInit();
    }, errors => {
      this.errors[0] = errors;
    });
  }

  deleteOrder(id) {

    this.errors = [];
    this.message = '';

    this.cartService.deleteOrder(id).subscribe(data => {
      //do something if successfull
      this.message = 'order removed from cart';

      this.ngOnInit();

    }, errors => {

      // console.log('could not remove order', errors);

      this.errors[0] = errors;
    });
  }

  public getCartStats() {

    this.cartService.getCartStats().subscribe(data => {
      // console.log('these are my stats',data)
      this.amount = data['amount'];
      this.totAmount = this.amount + 150;
      if (this.amount < 1) {

        this.totAmount = 0;
      }
      this.results = data['results'];

    }, errors => {

      this.errors[0] = errors;
    }
    );
  }

  checkMessage() {
    this.route.queryParams.subscribe(params => {
      params['message'] ? this.errors[0] = { message: params['message'] } : null;

      setTimeout(() => {
        this.router.navigate([], {
          replaceUrl: true,
          queryParams: { message: null },
          queryParamsHandling: 'merge'
        });

      }, 2000);

    });
  }

}
