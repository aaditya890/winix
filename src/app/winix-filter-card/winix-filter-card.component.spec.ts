import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinixFilterCardComponent } from './winix-filter-card.component';

describe('WinixFilterCardComponent', () => {
  let component: WinixFilterCardComponent;
  let fixture: ComponentFixture<WinixFilterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinixFilterCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinixFilterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
