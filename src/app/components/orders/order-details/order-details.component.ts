import { ActivatedRoute } from '@angular/router';
import { OrderService } from './../shared/service/order.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../product/shared/model/product.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  products: Product[];
  errors = [];
  message: string = '';

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  private getOrderDetails() {

    this.spinner.show();
    this.route.params.subscribe(params => {
      this.orderService.getOrderDetails(params['id']).subscribe(data => {
        this.products = data['data'][0].product;
        this.spinner.hide();
      }, errors => {
        this.spinner.hide();
        this.errors[0] = errors;
      });
    });
  }

}
