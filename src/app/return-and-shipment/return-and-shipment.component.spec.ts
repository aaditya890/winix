import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnAndShipmentComponent } from './return-and-shipment.component';

describe('ReturnAndShipmentComponent', () => {
  let component: ReturnAndShipmentComponent;
  let fixture: ComponentFixture<ReturnAndShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnAndShipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnAndShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
