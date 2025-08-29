import { CommonModule } from '@angular/common';
import { Component, HostListener, AfterViewInit, OnDestroy } from '@angular/core';

interface Review {
  name: string;
  role: string;
  avatar: string;
  content: string;
  device: string; // brand-level name only
  date: string;
  rating: number;
}

@Component({
  selector: 'app-review-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-cards.component.html',
  styleUrls: ['./review-cards.component.scss'], // <-- fixed key
})
export class ReviewCardsComponent implements AfterViewInit, OnDestroy {
  visibleMap: Record<string, boolean> = {};
  currentSlide = 0;
  autoSlideInterval: any;
  itemsPerSlide = 4;
  private io?: IntersectionObserver;
// -------- Brand-level WINIX reviews (no model numbers) --------
reviews: Review[] = [
  {
    name: 'Priya Sharma',
    role: 'Homeowner',
    avatar: 'assets/review-users/w-1.webp',
    content:
      'The WINIX air purifier noticeably reduces cooking smells and everyday dust. The filter indicator is helpful and upkeep is simple.',
    device: 'WINIX Air Purifier',
    date: '2 months ago',
    rating: 5,
  },
  {
    name: 'Rahul Gupta',
    role: 'Allergy Sufferer',
    avatar: 'assets/review-users/men-1.webp',
    content:
      'During pollen season the Auto mode reacts quickly. In Night mode it is whisper-quiet—sleep is never disturbed.',
    device: 'WINIX Purifier',
    date: '1 month ago',
    rating: 5,
  },
  {
    name: 'Anita Patel',
    role: 'Apartment Living',
    avatar: 'assets/review-users/w-2.webp',
    content:
      'Compact footprint with strong airflow. The room feels fresher in 15–20 minutes and the build quality is solid.',
    device: 'WINIX Air Purifier',
    date: '3 weeks ago',
    rating: 4,
  },
  {
    name: 'Vikram Singh',
    role: 'Pet Parent',
    avatar: 'assets/review-users/men-2.webp',
    content:
      'Helps with pet dander and odour. The washable pre-filter is easy to clean, so the running cost stays low.',
    device: 'WINIX Purifier',
    date: '6 weeks ago',
    rating: 5,
  },
  {
    name: 'Meera Joshi',
    role: 'Working Professional',
    avatar: 'assets/review-users/w-3.webp',
    content:
      'Perfect for my study/office space. With the light sensor the display dims at night—nice attention to detail.',
    device: 'WINIX Air Purifier',
    date: '4 months ago',
    rating: 4,
  },
  {
    name: 'Arjun Reddy',
    role: 'Student',
    avatar: 'assets/review-users/men-3.webp',
    content:
      'Paint/VOC smells cleared up quickly. Controls are straightforward and the timers/modes are clearly labeled.',
    device: 'WINIX Purifier',
    date: '2 months ago',
    rating: 5,
  },
  {
    name: 'Kavya Nair',
    role: 'Fitness Trainer',
    avatar: 'assets/review-users/w-4.webp',
    content:
      'The gym corner no longer feels stuffy. The carry handle and filter access are very convenient.',
    device: 'WINIX Air Purifier',
    date: '5 weeks ago',
    rating: 4,
  },
  {
    name: 'Rohit Kumar',
    role: 'Entrepreneur',
    avatar: 'assets/review-users/men-4.webp',
    content:
      'Great value. The air-quality indicator shows real-time changes and the fan ramps up quickly on Auto.',
    device: 'WINIX Purifier',
    date: '7 weeks ago',
    rating: 5,
  },
  {
    name: 'Neha Rawat',
    role: 'Doctor',
    avatar: 'assets/review-users/w-5.webp',
    content:
      'Low noise with a consistently fresh feel in the clinic waiting area. Easy installation and filters are easy to find.',
    device: 'WINIX Air Purifier',
    date: '3 weeks ago',
    rating: 4,
  },
  {
    name: 'Ramesh Iyer',
    role: 'Retired Officer',
    avatar: 'assets/review-users/men-8.webp',
    content:
      'Seasonal sneezing is clearly less frequent now. Even with continuous use, the power consumption feels reasonable.',
    device: 'WINIX Purifier',
    date: '4 weeks ago',
    rating: 5,
  },
];

  // ---- computed ----
  get totalSlideGroups(): number { return Math.ceil(this.reviews.length / this.itemsPerSlide); }
  get dots(): number[] { return Array(this.totalSlideGroups).fill(0).map((_, i) => i); }
  get currentDotIndex(): number { return Math.floor(this.currentSlide / this.itemsPerSlide); }
  get transformPercentage(): number { return this.currentSlide * (100 / this.itemsPerSlide); }
  get maxSlideIndex(): number { return Math.max(0, this.reviews.length - this.itemsPerSlide); }

  // ---- responsive ----
  @HostListener('window:resize')
  onResize(): void {
    const old = this.itemsPerSlide;
    this.updateItemsPerSlide();
    if (old !== this.itemsPerSlide) {
      const currentDot = Math.floor(this.currentSlide / old);
      this.currentSlide = Math.min(currentDot * this.itemsPerSlide, this.maxSlideIndex);
    }
  }

  ngAfterViewInit(): void {
    this.updateItemsPerSlide();
    this.startAutoSlide();

    // Lazy avatars via IO
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          const id = el.dataset['lazyId'];
          if (e.isIntersecting && id) {
            this.visibleMap[id] = true;
            this.io?.unobserve(el);
          }
        }
      },
      { rootMargin: '200px 0px' }
    );

    document
      .querySelectorAll<HTMLElement>('[data-lazy-id]')
      .forEach((el) => this.io!.observe(el));
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.io?.disconnect();
  }

  updateItemsPerSlide(): void {
    const w = window.innerWidth;
    if (w < 640) this.itemsPerSlide = 1;
    else if (w < 768) this.itemsPerSlide = 2;
    else if (w < 1024) this.itemsPerSlide = 3;
    else if (w < 1280) this.itemsPerSlide = 4;
    else this.itemsPerSlide = 5;
  }

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 3000);
  }
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  nextSlide(): void {
    const next = this.currentSlide + this.itemsPerSlide;
    this.currentSlide = next > this.maxSlideIndex ? 0 : next;
  }
  goToSlide(dotIndex: number): void {
    this.currentSlide = Math.min(dotIndex * this.itemsPerSlide, this.maxSlideIndex);
    this.startAutoSlide();
  }

  onMouseEnter(): void { 
    this.stopAutoSlide();
  }
  onMouseLeave(): void { 
    this.startAutoSlide();
  }
}
