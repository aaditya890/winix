import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSliderSectionComponent } from './video-slider-section.component';

describe('VideoSliderSectionComponent', () => {
  let component: VideoSliderSectionComponent;
  let fixture: ComponentFixture<VideoSliderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSliderSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoSliderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
