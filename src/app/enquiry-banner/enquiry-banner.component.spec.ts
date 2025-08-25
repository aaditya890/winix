import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquiryBannerComponent } from './enquiry-banner.component';

describe('EnquiryBannerComponent', () => {
  let component: EnquiryBannerComponent;
  let fixture: ComponentFixture<EnquiryBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnquiryBannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnquiryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
