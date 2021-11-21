import { ProductService } from './../../product/shared/service/product.service';
import { WishService } from './../shared/service/wish.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cart } from '../shared/model/cart.model';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  errors = [];
  message: string = '';
  wishlist: Cart[] = [];
  results: number = 0;
  empty: boolean = false;


  constructor(
    private wishService: WishService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit(): void {

    this.getMyWishlist();

  }


  private getMyWishlist() {

    this.spinner.show();
    this.wishService.getMyWishlist().subscribe(data => {
      this.wishlist = data['data'];
      this.results = data['results'];
      this.setEmpty();
      this.spinner.hide();
    }, errors => {
      this.spinner.hide();
      this.errors[0] = errors;
    });
  }

  public moveToCart(id) {

    return this.wishService.moveToCart(id, {}).subscribe(data => {
      this.message = 'Product added to cart';
      this.ngOnInit();
    }, errors => {
      this.ngOnInit();
      this.errors[0] = errors;
    });
  }

  public deleteWishlist(id) {
    this.wishService.deleteWishlist(id).subscribe(data => {
      this.message = 'Product removed from wishlist';
      this.ngOnInit();
    }, errors => {
      this.errors[0] = errors;
    });
  }

  private setEmpty() {
    if (this.results < 1) {
      this.empty = true;
    }
  }
}
