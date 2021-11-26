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

    this.checkMessage();
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

  busExpD(expD){
    return new Date(expD).toLocaleString();
  
  }
  prerequisite(createdAt){

    let res = (new Date(createdAt).getHours() <= 9) ? 'Student card & Time table' : 'Student card';
     res = (new Date(createdAt).getHours() >= 12 && new Date().getHours() <= 14) ? 'Student card & Time table' : 'Student card';

     return res;
  }

}
