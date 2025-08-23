import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinixProductCardComponent } from './winix-product-card.component';

describe('WinixProductCardComponent', () => {
  let component: WinixProductCardComponent;
  let fixture: ComponentFixture<WinixProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinixProductCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinixProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
