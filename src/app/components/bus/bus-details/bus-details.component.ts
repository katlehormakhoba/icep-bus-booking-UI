import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Bus } from '../shared/model/bus.model';
import { BusService } from '../shared/service/bus.service';

@Component({
  selector: 'app-bus-details',
  templateUrl: './bus-details.component.html',
  styleUrls: ['./bus-details.component.scss'],
})
export class BusDetailsComponent implements OnInit {
  buses: Bus[] = [];
  availableSeats: number;
  message: string = '';
  errors = [];
  period = '12:00 PM';
  @ViewChild('closebutton') closebutton;

  constructor(
    private busService: BusService,
    private spinner: NgxSpinnerService  ) {}

  ngOnInit(): void {

    this.spinner.show();
    this.busService.getInactiveBusses().subscribe(
      (bus: Bus[]) => {
        this.buses = bus['data'];

        this.spinner.hide();
      },
      (errors) => {
        this.spinner.hide();
        this.errors[0] = errors;
      }
    );

  }

  busStatus(expD){


    let result = 'Arrived';
    let t = new Date();
    
    t.setHours(t.getHours() - 2)
    console.log(new Date(expD) , t);
    if(new Date(expD) > t){
      result='Bus on-route';

    } 
    


   return result;
  
  }

  busExpD(expD){
    return new Date(expD).toLocaleString();
  
  }
}


