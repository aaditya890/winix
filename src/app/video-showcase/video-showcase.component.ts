import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface VideoItem {
  src: string;
  poster?: string;
  title: string;
}

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-showcase.component.html',
  styleUrls: ['./video-showcase.component.scss'],
})
export class VideoShowcaseComponent {
  @ViewChild('trackRef', { static: true }) trackRef!: ElementRef<HTMLElement>;
  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  items: VideoItem[] = [
    {
      src: 'assets/reels/1.mp4',
      poster: 'assets/reels/poster1.webp',
      title: 'WINIX ZERO COMPACT',
    },
    {
      src: 'assets/reels/2.mp4',
      poster: 'assets/reels/poster2.webp',
      title: 'WINIX T810',
    },
    {
      src: 'assets/reels/3.mp4',
      poster: 'assets/reels/poster3.webp',
      title: 'WINIX 5500-2',
    },
    {
      src: 'assets/reels/4.mp4',
      poster: 'assets/reels/poster4.webp',
      title: 'WINIX A231',
    },
    {
      src: 'assets/reels/5.mp4',
      poster: 'assets/reels/poster5.webp',
      title: 'WINIX SMART SERIES',
    },
    {
      src: 'assets/reels/6.mp4',
      poster: 'assets/reels/poster6.webp',
      title: 'PLASMAWAVE TECHNOLOGY',
    },
  ];

  activeVideo: VideoItem | null = null;
  private isDown = false;
  private startX = 0;
  private startLeft = 0;

  openVideoModal(video: VideoItem) {
    this.activeVideo = video;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.activeVideo = null;
    document.body.style.overflow = '';
  }

  scroll(dir: 'right') {
    const el = this.trackRef.nativeElement;
    const by = Math.round(el.clientWidth * 0.65);
    el.scrollBy({ left: dir === 'right' ? by : -by, behavior: 'smooth' });
  }

  onWheel(e: WheelEvent) {
    const el = this.trackRef.nativeElement;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
  }

  onPointerDown(e: PointerEvent | TouchEvent) {
    const el = this.trackRef.nativeElement;
    this.isDown = true;
    this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    this.startLeft = el.scrollLeft;
    el.classList.add('grabbing');
  }

  onPointerMove(e: PointerEvent | TouchEvent) {
    if (!this.isDown) return;
    const el = this.trackRef.nativeElement;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    el.scrollLeft = this.startLeft - (clientX - this.startX);
  }

  onPointerUp() {
    this.isDown = false;
    this.trackRef.nativeElement.classList.remove('grabbing');
  }
}
