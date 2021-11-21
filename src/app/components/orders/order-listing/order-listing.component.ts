import { AddressService } from './../shared/service/address.service';
import { Address } from './../../cart/shared/model/address.model';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-listing',
  templateUrl: './order-listing.component.html',
  styleUrls: ['./order-listing.component.scss']
})
export class OrderListingComponent implements OnInit {

  addresses: Address[] = [];
  errors: [] = [];
  results: number = 0;

  constructor(
    private addressService: AddressService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getMyAddress();
  }


  private getMyAddress() {
    this.spinner.show();
    this.errors = [];
    return this.addressService.getMyAddress().subscribe(data => {
      this.addresses = data['data'];
      this.results = data['results'];
      // console.log(data);
      this.spinner.hide();
    }, errors => {
      this.errors = errors;
    });
  }

}
