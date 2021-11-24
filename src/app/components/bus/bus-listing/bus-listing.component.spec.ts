import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusListingComponent } from './bus-listing.component';

describe('BusListingComponent', () => {
  let component: BusListingComponent;
  let fixture: ComponentFixture<BusListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
