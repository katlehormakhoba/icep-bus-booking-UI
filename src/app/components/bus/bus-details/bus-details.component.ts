import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../authorization/shared/service/auth.service';
import { CartService } from '../../cart/shared/service/cart.service';
import { WishService } from '../../cart/shared/service/wish.service';
import { ProductService } from '../../product/shared/service/product.service';
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
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private wishService: WishService,
    private auth: AuthService
  ) {}

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


