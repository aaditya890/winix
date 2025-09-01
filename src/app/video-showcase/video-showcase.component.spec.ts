import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoShowcaseComponent } from './video-showcase.component';

describe('VideoShowcaseComponent', () => {
  let component: VideoShowcaseComponent;
  let fixture: ComponentFixture<VideoShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoShowcaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
