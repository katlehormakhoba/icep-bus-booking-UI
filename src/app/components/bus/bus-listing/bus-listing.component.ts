import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../authorization/shared/service/auth.service';
import { BookingService } from '../../booking/shared/service/booking.service';

import { Bus } from '../shared/model/bus.model';
import { BusService } from '../shared/service/bus.service';

@Component({
  selector: 'app-bus-listing',
  templateUrl: './bus-listing.component.html',
  styleUrls: ['./bus-listing.component.scss']
})
export class BusListingComponent implements OnInit {

  
  buses: Bus[] = [];
  availableSeats: number;
  message: string = '';
  errors = [];
  period = '12:00 PM';
  @ViewChild('closebutton') closebutton;

  constructor(
    private busService: BusService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,

    private auth: AuthService) { }

    ngOnInit(): void {

      this.getActiveBus()
    }

    getActiveBus(){
      this.checkMessage();
      this.spinner.show();
      this.busService.getActiveBus().subscribe((bus: Bus[]) => {
        this.buses = bus['data'];
        this.availableSeats = bus['availableSeats'];
        console.log(bus['availableSeats'])
        this.spinner.hide();
      
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
  
    busTimeSlots(){
      if(new Date(Date()).getHours() <13) return true;
      else {
        this.period ='06:00 AM';
        return false
      };
    }
  
    createBooking(id){
      this.errors = [];
      this.message = '';
  
      return this.bookingService.createBooking(id, {}).subscribe(data => {
        // console.log("order",data);
        this.closebutton.nativeElement.click();
      
        this.router.navigate(['/booking'], {
          queryParams: { message: 'You have booked bus successfully' }
        });
       
        
  
      }, errors => {
  
        this.errors[0] = errors;
        this.closebutton.nativeElement.click();
      });
  
    }
  
    busDeparture(createdAt){
      createdAt = new Date(createdAt);
      createdAt.setMinutes(createdAt.getMinutes() + 10);
      return new Date(createdAt).toLocaleString();
    
    }

}
