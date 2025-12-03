import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-slider-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-slider-section.component.html',
  styleUrl: './video-slider-section.component.scss'
})
export class VideoSliderSectionComponent {
  constructor(private sanitizer: DomSanitizer) {}
videos = [ 
  {
    id: "HSJj5dRGyZM",
    title: "True HEPA Filter",
    description: "Discover stunning outdoor transformations",
    tag: "Outdoor",
    thumbnail: "assets/youtube-video-slider-thumbnails/1.webp"
  },
  {
    id: "tb5ping2dcM",
    title: "WINIX T800",
    description: "Elegantly designed living spaces",
    tag: "Interior",
    thumbnail: "assets/youtube-video-slider-thumbnails/2.webp"
  },
   {
    id: "2crQKCTmrnc",
    title: "PlasmaWave Tech",
    description: "Modern exterior design",
    tag: "Exterior",
    thumbnail: "assets/youtube-video-slider-thumbnails/4.webp"
  },
  {
    id: "uBuJR6o27-o",
    title: "WINIX T500",
    description: "Premium door installations",
    tag: "Architecture",
    thumbnail: "assets/youtube-video-slider-thumbnails/3.webp"
  },
 
];



  current = 0
  activeUrl: SafeResourceUrl | null = null
  isDesktop = false

  ngOnInit() {
    this.checkScreenSize()
    window.addEventListener("resize", () => this.checkScreenSize())
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 1024
  }

  get visibleSlides() {
    const total = this.videos.length
    const prev = (this.current - 1 + total) % total
    const next = (this.current + 1) % total
    return [this.videos[prev], this.videos[this.current], this.videos[next]]
  }

  next() {
    this.current = (this.current + 1) % this.videos.length
  }

  prev() {
    this.current = (this.current - 1 + this.videos.length) % this.videos.length
  }


  openModal(id: string) {
    const url = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`
    this.activeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url)
    document.body.style.overflow = "hidden"
  }

  closeModal() {
    this.activeUrl = null
    document.body.style.overflow = ""
  }
}
