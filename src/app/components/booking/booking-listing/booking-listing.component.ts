import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Booking } from '../shared/model/booking.model';
import { BookingService } from '../shared/service/booking.service';

@Component({
  selector: 'app-booking-listing',
  templateUrl: './booking-listing.component.html',
  styleUrls: ['./booking-listing.component.scss']
})
export class BookingListingComponent implements OnInit {

  errors = [];
  message: string = '';
  bookings: Booking[] = [];
  results: number = 0;
  empty: boolean = false;


  constructor(
    private bookingService: BookingService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.getMyBookings();

  }


  private getMyBookings() {

    this.spinner.show();
    this.bookingService.getMyBookings().subscribe(data => {
      this.bookings = data['data'];
      this.results = data['results'];
      this.setEmpty();
      this.spinner.hide();
    }, errors => {
      this.spinner.hide();
      this.errors[0] = errors;
    });
  }


  private setEmpty() {
    if (this.results < 1) {
      this.empty = true;
    }
  }

}
