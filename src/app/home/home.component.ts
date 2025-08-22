import { Component, OnInit, OnDestroy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterLink } from "@angular/router"

interface Product {
  id: number
  name: string
  shortName: string
  slug: string
  description: string
  images: string[]
  currentImage: string
  rating: number
  category: string
  technology: string
  keyFeatures: string[]
  coverage: string
  filterType: string
  noiseLevel: string
  isHovered: boolean
  imageInterval?: any
  price: string
  originalPrice?: string
  badge?: string
  isAward?: boolean
  awardType?: string
  isNew?: boolean
}

interface SocialPost {
  id: number
  type: "video" | "image"
  thumbnail: string
  title: string
  description: string
  author: string
  likes: number
  isNew?: boolean
}

interface Category {
  id: number
  name: string
  icon: string
  productCount: number
  color: string
}

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  // component.ts
features = [
  {
    img: 'assets/features/1.png',
    title: 'warranty',
    desc:
      'Comprehensive 2 year warranty covers repairs, replacements, and reliable product protection.',
  },
  {
    img: 'assets/features/2.png',
    title: 'Carbon Filter',
    desc:
      'An activated carbon filter effectively removes impurities, and contaminants from water.',
  },
  {
    img: 'assets/features/3.png',
    title: 'True HEPA',
    desc:
      'The True HEPA filter captures 99.97% of airborne particles, ensuring cleaner air.',
  },
  {
    img: 'assets/features/4.png',
    title: 'PlasmaWave',
    desc:
      'PlasmaWave Technology purifies air by neutralizing pollutants, bacteria, and viruses.',
  },
];
// component.ts
featuresVideo = [
  { icon: 'plug',    title: 'Power Source', value: 'Corded Electric' },
  { icon: 'control', title: 'Control',      value: 'Touch' },
  { icon: 'filter',  title: 'Filter Type',  value: 'Activated Carbon' },
];

// put your actual paths here
brandVideo  = 'assets/video/brand.mp4';
videoPoster = 'assets/video/brand-poster.jpg';

// Announce bar config
barTitle = 'Updates';
messages = [
  'No.1 Air Purifier Brand',
  'Free shipping on orders over ₹999',
  'True HEPA filters back in stock',
];
speed = 18; // seconds per full loop

showBar = true;

ngOnInit() {
  this.showBar = localStorage.getItem('announce_dismissed') !== '1';
}

dismissBar() {
  this.showBar = false;
  localStorage.setItem('announce_dismissed', '1');
}


}
