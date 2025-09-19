import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface VideoItem {
  src: string;
  poster?: string;
  title: string;
  icon?: string;
}

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-showcase.component.html',
  styleUrl: './video-showcase.component.scss',
})
export class VideoShowcaseComponent implements AfterViewInit, OnDestroy {
  @ViewChild('trackRef', { static: true }) trackRef!: ElementRef<HTMLElement>;
  @ViewChildren('videoEl') videos!: QueryList<ElementRef<HTMLVideoElement>>;

  items: VideoItem[] = [
    { src: 'assets/reels/1.mp4', poster: '', title: '' },
    { src: 'assets/reels/2.mp4', poster: '', title: '' },
    { src: 'assets/reels/3.mp4', poster: '', title: '' },
    { src: 'assets/reels/4.mp4', poster: '', title: '' },
    { src: 'assets/reels/5.mp4', poster: '', title: '' },
    { src: 'assets/reels/6.mp4', poster: '', title: '' },
  ];

  private io?: IntersectionObserver;

  // drag-to-scroll
  private isDown = false;
  private startX = 0;
  private startLeft = 0;

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }

  private setupObserver() {
    const root = this.trackRef.nativeElement;
    this.io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const v = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            v.muted = true;
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { root, threshold: [0, 0.6, 1] }
    );
    setTimeout(() => this.videos.forEach(ref => this.io!.observe(ref.nativeElement)));
  }

  // arrow nudge
  scroll(dir: 'left' | 'right') {
    const el = this.trackRef.nativeElement;
    const by = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir === 'left' ? -by : by, behavior: 'smooth' });
  }

  // translate vertical wheel to horizontal
  onWheel(e: WheelEvent) {
    const el = this.trackRef.nativeElement;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
  }

  onPointerDown(e: PointerEvent | TouchEvent) {
  const el = this.trackRef.nativeElement;
  this.isDown = true;

  // support both touch and mouse
  this.startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  this.startLeft = el.scrollLeft;

  if ('pointerId' in e) el.setPointerCapture(e.pointerId);
  el.classList.add('grabbing');
}

onPointerMove(e: PointerEvent | TouchEvent) {
  if (!this.isDown) return;
  const el = this.trackRef.nativeElement;
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  el.scrollLeft = this.startLeft - (clientX - this.startX);
}

onPointerUp(e?: any) {
  const el = this.trackRef.nativeElement;
  this.isDown = false;

  if (e && 'pointerId' in e) {
    try { el.releasePointerCapture(e.pointerId); } catch {}
  }
  el.classList.remove('grabbing');
}
}