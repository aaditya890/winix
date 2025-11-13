import { Component, OnInit, OnDestroy, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from "@angular/router"
import { filter, first } from "rxjs"

interface Product {
  id: number
  productUrl: string
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
  badge?: string
  isAward?: boolean
  awardType?: string
  price?: string
  mrp?: string
  topReview: string
  detailedSpecs?: {
    dimensions: string
    weight: string
    powerConsumption: string
    filterLife: string
    warranty: string
    certifications: string[]
  }
  detailedFeatures?: string[]
  technicalDetails?: {
    cadr: string
    airChangesPerHour: string
    roomSizeRecommended: string
    fanSpeeds: number | string
    controlType: string
    indicators: string[]
  }
  productReviews: Review[],
  highlightImages: string[],
  faqs: FAQ[]
}

type SectionKey = "details" | "techSpecs" | "care" | "inBox" | "tests" | "additional"

type Review = {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  helpful: number
  images?: string[]
}

type FAQ = {
  q: string
  a: string
  open?: boolean
}

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product | null = null
  currentImageIndex = 0
  zoomed = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  // Zoom + Dialog
  zoomStyle: Record<string, string> = {};
  dialogZoomStyle: Record<string, string> = {};
  dialogOpen = false;
  zoomActive = false;
  // Misc.
  imageInterval?: any;
  isLoading = true;
  bottomBannerSrc: string | null = null;
  hideButton = false;


  // Listen for scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.hideButton = scrollY > 10; // hide after scrolling 50px (adjust as needed)
  }

  sectionsOpen: Record<SectionKey, boolean> = {
    details: false,
    techSpecs: false,
    care: false,
    inBox: false,
    tests: false,
    additional: false,
  }

  // Toggle logic: ek time pe sirf ek hi open ho
  toggleFaq(index: number) {
    if (!this.product) return;
    this.product.faqs = this.product.faqs.map((faq, i) => ({
      ...faq,
      open: i === index ? !faq.open : false
    }));
  }



  products: Product[] = [
    {
      id: 1,
      productUrl: "https://www.amazon.in/Winix-Small-Tower-A231-Purifier/dp/B08HW5SBQ6/ref=sr_1_1_sspa?crid=3E4UW6KQS1IHL&dib=eyJ2IjoiMSJ9.nyrDct4QLbf6J4nB4JwHKdswXh_KKQKMAuEv-AlXIBI.39zb7Frm_88rf20XFP4m78D_BdJfBpTFCAvaG-7-It4&dib_tag=se&keywords=winix%2Ba231&qid=1758281141&sprefix=winix%2Ba231%2Caps%2C246&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1 ",
      slug: "winix-a231-air-purifier",
      name: "WINIX A231 Premium 4-Stage Air Purifier",
      shortName: "A231 Compact",
      description:
        "Compact HEPA purifier for small-to-medium rooms with washable pre-filter, activated carbon, True HEPA, and PlasmaWave. AHAM-verified 230 sq ft coverage; ultra-quiet 20 dB.",
      images: [
        "assets/products/A231/product-1.jpg",
        "assets/products/A231/product-2.jpg",
        "assets/products/A231/product-3.jpg",
        "assets/products/A231/product-4.jpg",
        "assets/products/A231/product-5.jpg",
        "assets/products/28.webp"
      ],
      currentImage: "assets/products/A231/product-1.jpg",
      rating: 4.6,
      category: "Compact",
      technology: "4-Stage Filtration • True HEPA 99.97% • PlasmaWave",
      keyFeatures: [
        "Room size 230 sq ft (AHAM)",
        "Washable fine-mesh pre-filter",
        "Activated carbon reduces VOCs & odours",
        "True HEPA captures 99.97% @ 0.3µm",
        "PlasmaWave technology",
        "Ultra-quiet 20 dB",
      ],
      coverage: "230 sq ft",
      filterType: "Washable Pre-filter + Activated Carbon + True HEPA",
      noiseLevel: "20 dB",
      isHovered: false,
      badge: "Compact Favorite",
      isAward: true,
      awardType: "UK Allergy • ECARF • AHAM",
      price: "₹8,699",
      mrp: "₹18,990",
      topReview: '36K',
      detailedSpecs: {
        dimensions: "24D x 24W x 37H cm",
        weight: "3.22 kg",
        powerConsumption: "40.6 Watts",
        filterLife: "HEPA ~12 months; Carbon 3–6 months; Pre-filter washable",
        warranty: "2 + 1 On Registration",
        certifications: ["AHAM Certified", "UK Allergy Certified", "ECARF"],
      },
      detailedFeatures: [
        "AHAM-verified coverage 230 sq ft",
        "Pre-filter traps large particles; extends HEPA life",
        "Carbon filter reduces VOCs, smoke, pet & cooking odours",
        "True HEPA captures pollen, dust, microbes, and smoke down to 0.3µm",
        "PlasmaWave safely breaks down odours and vapours",
        "Quiet operation ideal for bedrooms/offices",
      ],
      technicalDetails: {
        cadr: "250 m³/h (≈147 CFM)",
        airChangesPerHour: "≈4.8x per hour",
        roomSizeRecommended: "230 sq ft",
        fanSpeeds: "3 + Auto + Sleep",
        controlType: "Touch Panel + Remote",
        indicators: ["Air Quality LED", "Filter Replacement"],
      },
      productReviews: [
        {
          id: "a231-r1",
          author: "Sofia",
          rating: 5,
          title: "Tiny size, big performance",
          body: "Desk pe rakho aur bhool jao—low pe bilkul quiet. Dust aur mild odors jaldi clear karta hai. Perfect for WFH.",
          date: "2025-07-15",
          verified: true,
          helpful: 11,
          images: ["/review-desk.png"],
        },
        {
          id: "a231-r2",
          author: "Arun",
          rating: 4,
          title: "Great for bedside",
          body: "Bedside table pe fit ho jata hai. Filter chhota hai to jaldi fill hota—pre-filter clean karke life badh jaati hai.",
          date: "2025-08-03",
          verified: true,
          helpful: 6,
          images: [],
        },
        {
          id: "a231-r3",
          author: "Linda",
          rating: 5,
          title: "Kitchen corner hero",
          body: "Oil smell 15 minute me normal. Lightweight, easily portable. Filters affordable aur change karna 2-minute job.",
          date: "2025-06-28",
          verified: true,
          helpful: 13,
          images: ["/review-kitchen.png"],
        },
        {
          id: "a231-r4",
          author: "Nikhil",
          rating: 5,
          title: "Allergy control in study",
          body: "Spring me sneezing thamma. Compact aur distraction-free. Chhote rooms ke liye ideal.",
          date: "2025-04-19",
          verified: true,
          helpful: 15,
          images: [],
        },
        {
          id: "a231-r5",
          author: "Hannah",
          rating: 3,
          title: "Not for big rooms",
          body: "Small bedrooms/office me great. Large living room me effect kam dikhta. Manage expectations and you’ll like it.",
          date: "2025-05-22",
          verified: true,
          helpful: 5,
          images: [],
        },
        {
          id: "a231-r6",
          author: "Dev",
          rating: 5,
          title: "Looks good, works better",
          body: "Modern design blend ho jata hai. 4-stage filtration noticeable difference deti hai; workspace me dust low.",
          date: "2025-03-11",
          verified: true,
          helpful: 12,
          images: ["/review-style.png"],
        },
        {
          id: "a231-r7",
          author: "Grace",
          rating: 4,
          title: "Quiet nursery companion",
          body: "Noise almost nil. Filter light thoda early aata—pre-filter clean karo to extend ho jata. Fresh air for the baby!",
          date: "2025-02-14",
          verified: true,
          helpful: 9,
          images: [],
        },
        {
          id: "a231-r8",
          author: "Ravi",
          rating: 5,
          title: "Value pick for small spaces",
          body: "Smoke, pet odors, fine dust sab handle karta hai. Light, simple controls, aur filter prices reasonable. Solid buy.",
          date: "2025-08-09",
          verified: true,
          helpful: 19,
          images: ["/review-pets.png"],
        },
      ],
      highlightImages: [
        "assets/winix-product-images/a231/a231-1.webp",
        "assets/winix-product-images/a231/a231-2.webp",
        "assets/winix-product-images/a231/a231-3.webp",
        "assets/winix-product-images/a231/a231-4.webp",
        "assets/winix-product-images/a231/a231-5.webp",
      ],
      faqs: [
        {
          q: "Is the A231 suitable for large rooms?",
          a: "No. It is designed for small spaces up to around 200 sq. ft., like bedrooms or offices.",
          open: false,
        },
        {
          q: "Does it run quietly?",
          a: "Yes. The A231 is very quiet on low and Sleep mode, making it ideal for night use.",
          open: false,
        },
        {
          q: "What filters are included?",
          a: "It comes with a 4-stage filtration system including a true HEPA filter, carbon filter, and pre-filter.",
          open: false,
        },
        {
          q: "How often should the filter be changed?",
          a: "About every 12 months depending on usage. The pre-filter can be cleaned to extend life.",
          open: false,
        },
        {
          q: "Does it have auto mode?",
          a: "No. The A231 is simple with manual fan speed controls but provides strong performance for its size.",
          open: false,
        },
        {
          q: "Is it easy to carry?",
          a: "Yes. The compact and lightweight design makes it easy to move between rooms.",
          open: false,
        },
      ]
    },
    {
      id: 2,
      productUrl: "https://www.amazon.in/Winix-5300-2-Purifier-PlasmaWave-Reducing/dp/B01D8DAYBA/ref=sr_1_1_sspa?crid=13CBVJUQ98R7R&dib=eyJ2IjoiMSJ9.Kp26yzZ_O7yzCqZVio4eM8X0lDXtjI4IfNuutcBiDJOGikTLEumjQeBFs12phlwA1fPcueTVaqVD8kvlO0LzVS3kqv8EVjfipAZbFaTS5M-faaYKj7ZDocTv-YUva276h32vcS85_jaCvZc6TWJgbzlg8wqQrXuCTGNgpPEjCj3-OCVrHK5852_MkjQt8IMCLWO3KgPNN05ZgwuShB8-ppE3Za8j8rnNwQMBmf6tkX0.FtKqwonycx94L0Lbr2GqcBMCiLTMC1vheZeg9izAgPM&dib_tag=se&keywords=winix%2B5500-2%2Bair%2Bpurifier&nsdOptOutParam=true&qid=1758281186&sprefix=winix%2B5500-2%2B%2Caps%2C317&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1 ",
      slug: "winix-5300-2-air-purifier",
      name: "WINIX 5300-2 Premium 4-Stage Air Purifier",
      shortName: "5300-2 Premium",
      description:
        "Premium 4-stage purifier with True HEPA, PlasmaWave, and activated carbon. AHAM-verified coverage up to 1065 sq ft, CADR 390 m³/h, with ultra-quiet 27.8 dB operation.",
      images: [
        "assets/products/5300-2/1.webp",
        "assets/products/5300-2/2.webp",
        "assets/products/5300-2/3.webp",
        "assets/products/5300-2/4.webp",
        "assets/products/5300-2/5.webp",
        "assets/products/5300-2/6.webp",
        "assets/products/5300-2/7.webp",
        "assets/products/5300-2/8.webp",
        "assets/products/5300-2/5300-2.webp",
        "assets/products/28.webp"
      ],
      currentImage: "assets/products/5300-2/product-1.jpg",
      rating: 4.6,
      category: "Premium Series",
      technology: "True HEPA + PlasmaWave + Activated Carbon",
      keyFeatures: [
        "True HEPA 99.97% @ 0.3µm",
        "4-Stage cleaning system",
        "PlasmaWave technology",
        "CADR 390 m³/h",
        "Coverage up to 1065 sq ft",
        "Low noise 27.8 dB",
      ],
      coverage: "360–1065 sq ft",
      filterType: "True HEPA + Activated Carbon",
      noiseLevel: "27.8 dB",
      isHovered: false,
      badge: "Premium Choice",
      isAward: true,
      awardType: "Triple Certified (UK Allergy, ECARF, AHAM)",
      price: "₹13,899",
      mrp: "₹23,990",
      topReview: '39K',
      detailedSpecs: {
        dimensions: "5D x 37W x 49H cm",
        weight: "6.71 kg",
        powerConsumption: "70W",
        filterLife: "HEPA ~12 months; Carbon 3–6 months",
        warranty: "2 + 1 On Registration",
        certifications: ["Certified HEPA", "UK Allergy Certified", "ECARF", "AHAM Verified"],
      },
      detailedFeatures: [
        "True HEPA filter captures 99.97% of airborne pollutants as small as 0.3µm",
        "3-Stage cleaning removes dust, smoke, pollen, odors, pet dander, mold spores",
        "PlasmaWave acts as a permanent filter to break down odors and vapors",
        "Smart Sensor + Auto Mode adjusts fan speed automatically",
        "Sleep mode for ultra-quiet night operation",
        "AHAM-verified coverage up to 1065 sq ft",
      ],
      technicalDetails: {
        cadr: "236 CFM (≈390 m³/h)",
        airChangesPerHour: "≈4.7x per hour",
        roomSizeRecommended: "Up to 1065 sq ft",
        fanSpeeds: 5, // Sleep / Low / Med / High / Turbo
        controlType: "Touch + Button Control",
        indicators: ["Air Quality LED", "Filter Replacement", "Mode Status"],
      },
      productReviews: [
        {
          id: "r1",
          author: "Inez",
          rating: 5,
          title: "Fresh home in days",
          body: "Two dogs, lots of cooking. Odors used to linger; now they don’t. True HEPA catches fur and fine dust. Quiet on sleep mode. Money well spent.",
          date: "2024-11-08",
          verified: true,
          helpful: 8,
          images: ["/review-dogs.png"],
        },
        {
          id: "r2",
          author: "Simon",
          rating: 5,
          title: "Dust catcher extraordinaire",
          body: "The pre-filter turns gray fast—gross but satisfying. Night breathing feels easier. I run it 24/7 on low and use turbo for quick cleanups. Solid machine.",
          date: "2020-05-18",
          verified: true,
          helpful: 15,
          images: ["/review-filterdust.png"],
        },
        {
          id: "r3",
          author: "Malibu",
          rating: 4,
          title: "Wildfire helper",
          body: "During smoke alerts, this beat fans by a mile. Air smelled normal by morning. High is loud, low is gentle. Filters every ~3 months worked for me.",
          date: "2025-03-17",
          verified: true,
          helpful: 10,
          images: ["/review-wildfire.png"],
        },
        {
          id: "r4",
          author: "JD",
          rating: 4,
          title: "Great unit—buy new if you can",
          body: "Secondhand one arrived with funky filter odors. New filters fixed it and performance is excellent. Lesson learned: the purifier rocks, but don’t cheap out on used filters.",
          date: "2023-08-30",
          verified: true,
          helpful: 7,
          images: [],
        },
        {
          id: "r5",
          author: "Carol",
          rating: 5,
          title: "Perfect for a 300 sq ft office",
          body: "Real-time bumps when someone heats lunch, then settles within minutes. Sleep mode is library-quiet. Simple controls. Great balance of price and performance.",
          date: "2025-02-15",
          verified: true,
          helpful: 13,
          images: ["/review-office.png"],
        },
        {
          id: "r6",
          author: "George L",
          rating: 4,
          title: "Effective, filters add to cost",
          body: "Allergies improved. Replacements aren’t the cheapest if your air is dirty and you swap often. Still beats pricier brands for raw cleaning power.",
          date: "2025-05-01",
          verified: true,
          helpful: 8,
          images: [],
        },
        {
          id: "r7",
          author: "Rachel",
          rating: 5,
          title: "Pet odors gone",
          body: "Small apartment + three cats = constant smell—until this. Friends notice the difference. Easy filter changes and a not-too-big footprint.",
          date: "2025-06-20",
          verified: true,
          helpful: 19,
          images: ["/review-cats.png"],
        },
        {
          id: "r8",
          author: "David",
          rating: 5,
          title: "Reliable long-term",
          body: "Running daily over a year. Dust and pollen control are excellent. Medium speed is my sweet spot: quiet but effective. Hard to beat at this price.",
          date: "2025-04-11",
          verified: true,
          helpful: 11,
          images: [],
        },
      ],
      highlightImages: [
        "assets/winix-product-images/t5300-2/t5300-1.webp",
        "assets/winix-product-images/t5300-2/t5300-2.webp",
        "assets/winix-product-images/t5300-2/t5300-3.webp",
        "assets/winix-product-images/t5300-2/t5300-4.webp",
        "assets/winix-product-images/t5300-2/t5300-5.webp",
      ],
      faqs: [
        {
          q: "Is it quiet enough for night use?",
          a: "Yes. On low or sleep mode the fan noise is minimal, making it fine for bedrooms.",
          open: false,
        },
        {
          q: "Does it come with a remote control?",
          a: "No. The 5300-2 does not include a remote, but controls on the panel are simple to use.",
          open: false,
        },
        {
          q: "What type of filters does it use?",
          a: "It uses a true HEPA filter, a carbon filter, and a washable pre-filter for capturing dust and odors.",
          open: false,
        },
        {
          q: "How large of a room can it handle?",
          a: "It is recommended for rooms up to 360 sq. ft., similar to a bedroom or medium living room.",
          open: false,
        },
        {
          q: "Is the filter replacement costly?",
          a: "Filter packs are moderately priced and usually last 12 months under normal conditions.",
          open: false,
        },
        {
          q: "Does it automatically adjust speed?",
          a: "Yes. The Auto mode changes fan speed based on the air quality sensor readings.",
          open: false,
        },
      ]
    },
    {
      id: 3,
      productUrl: "https://www.amazon.in/Winix-5500-2-Purifier-PlasmaWave-Reducing/dp/B01D8DAYII/ref=sr_1_3?crid=13CBVJUQ98R7R&dib=eyJ2IjoiMSJ9.Kp26yzZ_O7yzCqZVio4eM8X0lDXtjI4IfNuutcBiDJOGikTLEumjQeBFs12phlwA1fPcueTVaqVD8kvlO0LzVS3kqv8EVjfipAZbFaTS5M-faaYKj7ZDocTv-YUva276h32vcS85_jaCvZc6TWJgbzlg8wqQrXuCTGNgpPEjCj3-OCVrHK5852_MkjQt8IMCLWO3KgPNN05ZgwuShB8-ppE3Za8j8rnNwQMBmf6tkX0.FtKqwonycx94L0Lbr2GqcBMCiLTMC1vheZeg9izAgPM&dib_tag=se&keywords=winix%2B5500-2%2Bair%2Bpurifier&nsdOptOutParam=true&qid=1758281186&sprefix=winix%2B5500-2%2B%2Caps%2C317&sr=8-3&th=1 ",
      slug: "winix-5500-2-air-purifier",
      name: "WINIX 5500-2 Air Purifier • True HEPA, PlasmaWave & Washable AOC Carbon",
      shortName: "5500-2 Elite",
      description:
        "True HEPA purifier with PlasmaWave and washable AOC carbon filter. 360 sq ft coverage, 27.8 dB operation, 70W power.",
      images: [
        "assets/products/5500-2/product-1.jpg",
        "assets/products/5500-2/product-2.jpg",
        "assets/products/5500-2/product-3.jpg",
        "assets/products/5500-2/product-4.jpg",
        "assets/products/5500-2/5500-2.webp",
        "assets/products/28.webp"
      ],
      currentImage: "assets/products/5500-2/product-1.jpg",
      rating: 4.6,
      category: "Elite Series",
      technology: "True HEPA + PlasmaWave + Washable AOC Carbon",
      keyFeatures: [
        "True HEPA 99.97% @ 0.3µm",
        "PlasmaWave technology",
        "Washable AOC carbon filter",
        "Touch controls",
        "Low noise 27.8 dB",
        "Coverage up to 360 sq ft",
      ],
      coverage: "360 sq ft",
      filterType: "True HEPA + Activated (AOC) Carbon",
      noiseLevel: "27.8 dB",
      isHovered: false,
      badge: "Best Seller",
      isAward: true,
      awardType: "Editor's Choice 2024",
      price: "₹14,999",
      mrp: "₹24,990",
      topReview: '39k',
      detailedSpecs: {
        dimensions: "19.8D x 37.8W x 59.9H cm",
        weight: "6.7 kg",
        powerConsumption: "70W",
        filterLife: "12 months (HEPA), 3 months (Carbon)",
        warranty: "2 + 1 On Registration",
        certifications: ["Certified HEPA"],
      },
      detailedFeatures: [
        "3-stage filtration: pre-filter, AOC carbon, True HEPA",
        "PlasmaWave helps break down odors and VOCs",
        "Auto/Sleep modes with air quality sensing",
        "Filter replacement indicator",
        "LED air quality indicator",
        "Timer function",
      ],
      technicalDetails: {
        cadr: "243 CFM (Smoke), 246 CFM (Dust), 232 CFM (Pollen)",
        airChangesPerHour: "≈4.8x per hour",
        roomSizeRecommended: "360 sq ft",
        fanSpeeds: 4,
        controlType: "Touch Panel",
        indicators: ["Air Quality LED", "Filter Replacement", "PlasmaWave Status"],
      },
      productReviews: [
        {
          id: "r1",
          author: "Richard G.",
          rating: 5,
          title: "Meter says it works",
          body: "PM2.5 dropped from 58 to under 8 in about 20 minutes on high. Turbo is loud but effective. For smoke and pollen, this is the real deal.",
          date: "2023-10-22",
          verified: true,
          helpful: 24,
          images: ["/review-meter-drop.png"],
        },
        {
          id: "r2",
          author: "E L",
          rating: 4,
          title: "Great purifier, a few quirks",
          body: "Cleans air fast and the filter gets dirty quickly—good sign. Occasionally jumps to high for no obvious reason and the LED bar is a bit bright at night. Still a win.",
          date: "2025-03-27",
          verified: true,
          helpful: 8,
          images: ["/review-tvremote.png"],
        },
        {
          id: "r3",
          author: "Michel F",
          rating: 5,
          title: "Solid for medium rooms",
          body: "Owned for a year. Dust on furniture is way down, kitchen smells clear in 30–40 minutes, and sleep mode is practically silent. Filter swaps are simple. Not flashy, just dependable performance.",
          date: "2024-10-20",
          verified: true,
          helpful: 12,
          images: ["/review-bedroom.png"],
        },
        {
          id: "r4",
          author: "Nick S",
          rating: 5,
          title: "Better sleep, easier breathing",
          body: "Allergy season used to wreck me. With the 5500-2 in the bedroom, morning congestion is rare. Auto reacts quickly to cooking or candles. Build feels sturdy and the washable pre-filter saves money.",
          date: "2025-07-12",
          verified: true,
          helpful: 17,
          images: ["/review-sleepmode.png"],
        },
        {
          id: "r5",
          author: "Malibu",
          rating: 4,
          title: "Handles smoke like a champ",
          body: "Wildfire week test: smell gone by the evening. Turbo is noisy—expected—but low and medium are fine. It’s a little bulky for a small studio, yet performance justifies the footprint.",
          date: "2025-03-17",
          verified: true,
          helpful: 11,
          images: ["/review-smoketest.png"],
        },
        {
          id: "r6",
          author: "Anna P",
          rating: 5,
          title: "Pets? No problem",
          body: "Two cats + one large dog. Dander and lingering litter box odors are noticeably reduced. I vacuum less and guests comment that the house smells neutral. Filters aren’t cheap, but worth it.",
          date: "2025-01-29",
          verified: true,
          helpful: 14,
          images: ["/review-pets.png"],
        },
        {
          id: "r7",
          author: "Carlos",
          rating: 5,
          title: "Top value at this price",
          body: "True HEPA + real carbon = results. Auto kick-in during frying is instant. If you want performance over fancy looks, get this. Easy recommendation.",
          date: "2025-02-10",
          verified: true,
          helpful: 16,
          images: ["/review-cooking.png"],
        },
        {
          id: "r8",
          author: "Sophie",
          rating: 4,
          title: "Clean air, minor noise",
          body: "House smells fresher within hours. Color indicator helps. Turbo can drown the TV, so I use medium most of the time. Overall very satisfied.",
          date: "2025-06-08",
          verified: true,
          helpful: 9,
          images: ["/review-livingroom.png"],
        },
      ],
      highlightImages: [
        "assets/winix-product-images/t5500-2/t5500-1.webp",
        "assets/winix-product-images/t5500-2/t5500-2.webp",
        "assets/winix-product-images/t5500-2/t5500-3.webp",
        "assets/winix-product-images/t5500-2/t5500-4.webp",
        "assets/winix-product-images/t5500-2/t5500-5.webp",
      ],
      faqs: [
        {
          q: "Is it quiet enough for bedrooms?",
          a: "Yes. On Sleep mode it operates at a very low noise level suitable for undisturbed sleep.",
          open: false,
        },
        {
          q: "Does it remove cooking odors and smoke?",
          a: "The 5500-2 includes a true HEPA filter and an activated carbon filter that capture smoke, VOCs, and common cooking odors effectively.",
          open: false,
        },
        {
          q: "How often do I need to replace the filters?",
          a: "On average every 12 months, but it may vary depending on usage and air quality. The pre-filter is washable for extended life.",
          open: false,
        },
        {
          q: "What room size is it rated for?",
          a: "It is suitable for medium to large rooms up to around 360 sq. ft. in size.",
          open: false,
        },
        {
          q: "Does it have an auto mode?",
          a: "Yes. The built-in sensor detects air quality and adjusts the fan speed automatically.",
          open: false,
        },
        {
          q: "Can PlasmaWave be turned off?",
          a: "Yes. PlasmaWave technology can be enabled or disabled with a button on the unit.",
          open: false,
        },
      ]
    },
    {
      id: 4,
      productUrl: "#",
      slug: "winix-t810-air-purifier",
      name: "WINIX T810 Air Purifier for Home Extra Large Room",
      shortName: "T810",
      description:
        "Smart Wi-Fi enabled air purifier with True HEPA, carbon filter, auto mode, and air quality monitor. Covers up to 1968 sq ft in 1 hour with AHAM-verified 410 sq ft rating.",
      images: [
        "assets/products/T810/product-1.jpg",
        "assets/products/T810/product-2.jpg",
        "assets/products/T810/product-3.jpg",
        "assets/products/T810/product-4.jpg",
        "assets/products/T810/T810.webp",
        "assets/products/28.webp"
      ],
      currentImage: "assets/products/T810/product-1.jpg",
      rating: 4.4,
      category: "Smart Series",
      technology: "True HEPA + Carbon Filter + PlasmaWave + Smart Wi-Fi",
      keyFeatures: [
        "AHAM Verified at 410 sq ft (cleans up to 1968 sq ft in 1 hour)",
        "Smart Wi-Fi with Winix App control",
        "True HEPA 99.99% captures allergens as small as 0.01µm",
        "Washable fine mesh pre-filter",
        "Carbon filter reduces VOCs and odors",
        "PlasmaWave air cleaning technology",
        "Air Quality Indicator with LED lights",
        "Smart Sensors + Auto Mode",
        "Ultra-quiet operation",
        "Filter replacement indicator",
      ],
      coverage: "410 sq ft (AHAM) • Up to 1968 sq ft (1 hour)",
      filterType: "Washable Pre-filter + Carbon + True HEPA",
      noiseLevel: "—",
      isHovered: false,
      badge: "Smart Choice",
      isAward: true,
      awardType: "AHAM • CARB • Energy Star • FCC • UL Certified",
      price: "₹18,999",
      mrp: "₹29,990",
      topReview: '165',
      detailedSpecs: {
        dimensions: "28.7D x 28.7W x 51.8H cm (11.3\"D x 11.3\"W x 20.4\"H)",
        weight: "4.7 kg (10.4 lbs)",
        powerConsumption: "45 Watt",
        filterLife: "HEPA ~12 months; Carbon 3–6 months; Pre-filter washable",
        warranty: "2 + 1 On Registration",
        certifications: [
          "AHAM Certified",
          "CARB Certified",
          "Energy Star Certified",
          "FCC Certified",
          "UL Certified",
        ],
      },
      detailedFeatures: [
        "AHAM Verified at 410 sq ft coverage",
        "Cleans up to 1968 sq ft in 1 hour",
        "Winix Smart App with Wi-Fi control",
        "True HEPA captures 99.99% of allergens down to 0.01µm",
        "Washable pre-filter extends HEPA life",
        "Carbon filter reduces odors and VOCs",
        "PlasmaWave technology for safe air cleaning",
        "Air quality LED indicator with real-time monitoring",
        "Smart sensor auto mode adjusts fan speed",
        "Ultra-quiet on lowest setting",
        "Filter replacement indicator LED",
      ],
      technicalDetails: {
        cadr: "(AHAM Verified at 410 sq ft)",
        airChangesPerHour: "(varies by room size)",
        roomSizeRecommended: "410 sq ft (AHAM) / up to 1968 sq ft",
        fanSpeeds: "3",
        controlType: "Touch + Wi-Fi App Control",
        indicators: ["Air Quality LED", "Filter Replacement"],
      },
      productReviews: [
        {
          id: "t810-r1",
          author: "Ananya",
          rating: 5,
          title: "Air feels fresh fast",
          body: "Cooking ke baad 10–15 min me hi smell gayab. Auto mode smartly speed badha deta hai. Night me bilkul shaant.",
          date: "2025-08-01",
          verified: true,
          helpful: 18,
          images: ["/review-kitchen.png", "/review-airquality.png"],
        },
        {
          id: "t810-r2",
          author: "Nick",
          rating: 5,
          title: "Quiet power for big rooms",
          body: "Large living room me bhi hawa noticeably light lagti hai. High pe thoda sunai deta hai, par need bhi tabhi hoti hai. App control convenient.",
          date: "2025-08-08",
          verified: true,
          helpful: 6,
          images: ["/review-livingroom.png"],
        },
        {
          id: "t810-r3",
          author: "Cody",
          rating: 4,
          title: "Buttons need backlight",
          body: "Performance excellent, par buttons dark me dikhte nahi. Sleep mode super quiet. Overall fresh air ka effect clear hai.",
          date: "2024-02-01",
          verified: true,
          helpful: 5,
          images: [],
        },
        {
          id: "t810-r4",
          author: "Lina",
          rating: 5,
          title: "Allergy relief within days",
          body: "Seasonal sneezing me clear drop. Dust kam settle hota hai. Filters replace karna easy, indicator time pe remind karta hai.",
          date: "2025-03-22",
          verified: true,
          helpful: 14,
          images: ["/review-bedroom.png"],
        },
        {
          id: "t810-r5",
          author: "Samir",
          rating: 4,
          title: "Great filtration, basic app",
          body: "T810 ki cleaning power bohot strong hai—pollen aur cooking VOCs handle ho jaate hain. App ka UI thoda basic hai par kaam kar deta hai.",
          date: "2025-05-10",
          verified: true,
          helpful: 7,
          images: [],
        },
        {
          id: "t810-r6",
          author: "Olivia",
          rating: 5,
          title: "Smart adjustments that you notice",
          body: "Frying start hotey hi fan ramp up; 20 minutes me room neutral smell. Long filters life, UI straightforward. Set-and-forget product.",
          date: "2025-04-30",
          verified: true,
          helpful: 11,
          images: ["/review-appcontrol.png"],
        },
        {
          id: "t810-r7",
          author: "Rahul",
          rating: 4,
          title: "Bulky but worth it",
          body: "Size thoda bada hai to rooms switch karna mushkil. Par jab chalta hai to large space me bhi noticeable difference aata hai.",
          date: "2025-07-18",
          verified: true,
          helpful: 6,
          images: [],
        },
        {
          id: "t810-r8",
          author: "Meera",
          rating: 5,
          title: "Night mode FTW",
          body: "Light sleeper hoon; night mode me koi noise nahi. Morning congestion almost gone. Best upgrade for our home.",
          date: "2025-08-09",
          verified: true,
          helpful: 13,
          images: [],
        },
      ],
      highlightImages: [
        "assets/winix-product-images/t810/t810-1.webp",
        "assets/winix-product-images/t810/t810-2.webp",
        "assets/winix-product-images/t810/t810-3.webp",
        "assets/winix-product-images/t810/t810-4.webp",
        "assets/winix-product-images/t810/t810-5.webp",
      ],
      faqs: [
        {
          q: "Does it support Wi-Fi or app control?",
          a: "Yes. The T810 can connect to Wi-Fi and be controlled through the Winix Smart app.",
          open: false,
        },
        {
          q: "How noisy is it on high speed?",
          a: "On turbo it is audible but not disruptive. Lower modes are very quiet, including Sleep mode.",
          open: false,
        },
        {
          q: "What room size is this model for?",
          a: "It is designed for larger rooms, up to 800 sq. ft., making it suitable for living rooms and open spaces.",
          open: false,
        },
        {
          q: "Are the filters easy to change?",
          a: "Yes. The unit has a front-loading panel and filter replacement is straightforward.",
          open: false,
        },
        {
          q: "Does the display show real-time air quality?",
          a: "Yes. The LED indicator and digital display show current air quality and fan adjustments.",
          open: false,
        },
        {
          q: "Is PlasmaWave included?",
          a: "Yes. PlasmaWave technology is included and can be turned on or off as preferred.",
          open: false,
        },
      ]
    },
    {
      id: 5,
      productUrl: "https://www.amazon.in/dp/B0FQBSFWRJ",
      slug: "winix-t500-air-purifier",
      name: "WINIX T500 360° 4-Stage True HEPA WiFi Air Purifier with PlasmaWave®",
      shortName: "T500",
      description:
        "360° all-in-one air purifier with WiFi Smart App control, PlasmaWave technology, and 4-stage filtration including fine mesh pre-filter, True HEPA, and activated carbon. AHAM verified for 251 sq ft, capable of cleaning up to 1204 sq ft in 1 hour.",
      images: [
        "assets/products/T500/product-1.webp",
        "assets/products/T500/product-2.webp",
        "assets/products/T500/product-3.webp",
        "assets/products/T500/product-4.webp",
        "assets/products/T500/T500.webp",
        "assets/products/28.webp"
      ],
      currentImage: "assets/products/T500/product-1.jpg",
      rating: 0, // no Amazon reviews yet
      category: "Smart Series",
      technology: "4-Stage Filtration • True HEPA 99.99% • PlasmaWave • WiFi",
      keyFeatures: [
        "AHAM Verified at 251 sq ft (up to 1204 sq ft in 1 hour)",
        "4-Stage filtration system",
        "Winix Smart App with WiFi control",
        "True HEPA 99.99% efficiency (0.01µm particles)",
        "Washable fine mesh pre-filter",
        "Activated carbon filter reduces VOCs and odors",
        "PlasmaWave advanced technology",
        "Dual smart sensors with Auto Mode",
        "LED 4-color air quality indicator",
        "Child Lock + Smart Features (WiFi, Alexa, Google Home)",
      ],
      coverage: "251 sq ft (AHAM) • Up to 1204 sq ft (1 hour)",
      filterType: "Pre-filter + Carbon + True HEPA (99.99%)",
      noiseLevel: "25.4 dB (minimum)",
      isHovered: false,
      badge: "New Launch",
      isAward: true,
      awardType: "AHAM Certified",
      price: "10,499", // price not shown in screenshots
      mrp: "19,990",
      topReview: '249',
      detailedSpecs: {
        dimensions: "24.1W x 24.1D x 37.1H cm (9.5\" x 9.5\" x 14.6\")",
        weight: "3.0 kg (6.7 lbs)",
        powerConsumption: "49 Watt",
        filterLife: "HEPA ~12 months; Carbon ~12 months; Pre-filter washable",
        warranty: "2 + 1 On Registration",
        certifications: ["AHAM Certified"],
      },
      detailedFeatures: [
        "AHAM Verified 251 sq ft coverage",
        "Cleans up to 1204 sq ft in 1 hour",
        "True HEPA captures 99.99% allergens down to 0.01µm",
        "Washable pre-filter traps larger particles",
        "Activated carbon reduces VOCs and odors",
        "PlasmaWave safely breaks down odors and chemical vapors",
        "Winix Smart App + WiFi, Alexa, Google Home support",
        "Dual smart sensors + Auto Mode",
        "LED 4-color air quality indicator",
        "Child Lock + Timer control",
      ],
      technicalDetails: {
        cadr: "172 (Dust) / 174 (Pollen) / 162 (Smoke)",
        airChangesPerHour: "4.8x per hour (AHAM verified)",
        roomSizeRecommended: "251 sq ft (AHAM) / up to 1204 sq ft",
        fanSpeeds: 5,
        controlType: "Touch + WiFi App Control",
        indicators: ["Air Quality LED (4-color)", "Filter Replacement"],
      },
      productReviews: [
        {
          id: "t500-r1",
          author: "Emily",
          rating: 5,
          title: "Small size, big impact",
          body: "200 sq ft office me perfect. 360° intake useful lagta hai aur sleep mode me literally whisper. Easy to move.",
          date: "2025-08-12",
          verified: true,
          helpful: 10,
          images: ["/review-office.png"],
        },
        {
          id: "t500-r2",
          author: "Marcus",
          rating: 4,
          title: "Great for bedrooms",
          body: "Dust/pollen clearly kam. High pe hum sunai deta hai—medium pe raho to balance accha milta hai. Worth it.",
          date: "2025-07-05",
          verified: true,
          helpful: 6,
          images: [],
        },
        {
          id: "t500-r3",
          author: "Sana",
          rating: 5,
          title: "Whisper-quiet nights",
          body: "Sleep mode me almost inaudible. Filter change straightforward, design clean. Light sleepers ke liye badiya.",
          date: "2025-06-20",
          verified: true,
          helpful: 12,
          images: ["/review-bedroom.png"],
        },
        {
          id: "t500-r4",
          author: "David",
          rating: 4,
          title: "Compact, limited coverage",
          body: "Chhote rooms me champion; large living room me struggle karta hai. Expectation sahi set karo to disappoint nahi karega.",
          date: "2025-05-08",
          verified: true,
          helpful: 7,
          images: [],
        },
        {
          id: "t500-r5",
          author: "Priya",
          rating: 5,
          title: "Odors vanish quickly",
          body: "Cooking smell 10 minute me neutral. Light, portable, aur controls simple. Day-to-day use me hassle-free.",
          date: "2025-04-14",
          verified: true,
          helpful: 15,
          images: ["/review-kitchen.png"],
        },
        {
          id: "t500-r6",
          author: "Daniel",
          rating: 3,
          title: "Works, filters cost more",
          body: "Performance theek-thaak; replacement filters thode mehange lagte hain. Agar budget allow karta hai to good pick.",
          date: "2025-03-02",
          verified: true,
          helpful: 5,
          images: [],
        },
        {
          id: "t500-r7",
          author: "Meera",
          rating: 5,
          title: "Allergy season savior",
          body: "Sneezing notably kam. Room me dust settle slow ho gaya. Size chhota, maintenance easy—no complaints.",
          date: "2025-08-01",
          verified: true,
          helpful: 16,
          images: ["/review-allergy.png"],
        },
        {
          id: "t500-r8",
          author: "John",
          rating: 4,
          title: "Ideal for studios",
          body: "Pet hair aur dust handle karta hai. Open-plan bade area ke liye nahi bana, par studio me kaafi effective.",
          date: "2025-02-18",
          verified: true,
          helpful: 8,
          images: [],
        },
      ],
      highlightImages: [
        "assets/winix-product-images/t500/t500-1.webp",
        "assets/winix-product-images/t500/t500-2.webp",
        "assets/winix-product-images/t500/t500-3.webp",
        "assets/winix-product-images/t500/t500-4.webp",
        "assets/winix-product-images/t500/t500-5.webp",
      ],
      faqs: [
        {
          q: "What is the recommended room size?",
          a: "The T500 is best for smaller spaces such as bedrooms, nurseries, and offices up to 200 sq. ft.",
          open: false,
        },
        {
          q: "Is it portable?",
          a: "Yes. Its lightweight, slim design makes it easy to move from one room to another.",
          open: false,
        },
        {
          q: "Does it use a true HEPA filter?",
          a: "Yes. It uses a true HEPA filter along with carbon filtration for odors.",
          open: false,
        },
        {
          q: "How quiet is it at night?",
          a: "In Sleep mode it runs very quietly and is suitable for bedside use.",
          open: false,
        },
        {
          q: "Are replacement filters expensive?",
          a: "Filters are moderately priced, but because of the smaller size, they may need more frequent replacement.",
          open: false,
        },
        {
          q: "Does it have auto or smart sensors?",
          a: "No. The T500 is more of a manual model with adjustable fan speeds but no auto-sensing mode.",
          open: false,
        },
      ]
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params["slug"]
      this.loadProduct(slug)
    })
  }

  // ✅ Visible Thumbnails & "+N"
  get visibleThumbnails() {
    return this.product?.images?.slice(0, 4) ?? [];
  }

  get remainingCount() {
    return (this.product?.images?.length ?? 0) - 4;
  }


  onTapToZoom() {
    this.zoomed = !this.zoomed;

    if (!this.zoomed) {
      this.currentX = 0;
      this.currentY = 0;
      this.dialogZoomStyle = { transform: "scale(1)" };
    } else {
      this.dialogZoomStyle = { transform: "scale(2)" };
    }
  }

  onTouchStart(e: TouchEvent) {
    if (!this.zoomed) return;

    const t = e.touches[0];
    this.startX = t.clientX - this.currentX;
    this.startY = t.clientY - this.currentY;
  }

  onTouchMove(e: TouchEvent) {
    if (!this.zoomed) return;

    e.preventDefault();
    const t = e.touches[0];

    this.currentX = t.clientX - this.startX;
    this.currentY = t.clientY - this.startY;

    this.dialogZoomStyle = {
      transform: `scale(2) translate3d(${this.currentX}px, ${this.currentY}px, 0)`
    };
  }
  // --- Inline Zoom ---
  onMouseMove(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    this.zoomStyle = {
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
      cursor: "zoom-in",
    };
  }

  onMouseLeave() {
    this.zoomStyle = { transform: "scale(1)", cursor: "default" };
  }

  // --- Dialog Logic ---
  openDialog() {
    this.dialogOpen = true;
  }

  closeDialog() {
    this.dialogOpen = false;
  }

  @HostListener("document:keydown.escape")
  onEscape() {
    this.closeDialog();
  }

  // --- Zoom inside Dialog ---
  onDialogMouseMove(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    this.dialogZoomStyle = {
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2 )",
      cursor: "zoom-out",
    };
  }

  onDialogMouseLeave() {
    this.dialogZoomStyle = { transform: "scale(1)", cursor: "default" };
  }

  goToReels(): void {
    const targetId = 'REELS';

    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    // Are we already on the home route?
    const atHome = this.router.url.split('?')[0] === '/';

    if (atHome) {
      // Same page → just smooth scroll
      scrollToTarget();
    } else {
      // Navigate to home WITHOUT fragment (so no # in URL), then scroll
      this.router.navigateByUrl('/').then(() => {
        // Wait a tick to ensure the section is rendered
        setTimeout(scrollToTarget, 0);
      });
    }
  }
  ngOnDestroy(): void {
    if (this.imageInterval) clearInterval(this.imageInterval)
  }

  private loadProduct(slug: string): void {
    this.isLoading = true
    setTimeout(() => {
      this.product = this.products.find((p) => p.slug === slug) ?? null
      this.isLoading = false
      if (this.product) {
        this.currentImageIndex = 0
        // this.startImageSlideshow()
        this.bottomBannerSrc = null
      }
    }, 250)
  }

  private startImageSlideshow(): void {
    if (!this.product || this.product.images.length <= 1) return
    if (this.imageInterval) clearInterval(this.imageInterval)
    this.imageInterval = setInterval(() => {
      if (!this.product) return
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length
    }, 4000)
  }

  selectImage(index: number): void {
    this.currentImageIndex = index
  }

  toggleSection(key: SectionKey): void {
    this.sectionsOpen[key] = !this.sectionsOpen[key]
  }

  // toggleFaq(i: number) {
  //   this.faqs[i].open = !this.faqs[i].open
  // }

  // Reviews
  get totalReviews(): number {
    return this.product?.productReviews?.length ?? 0
  }
  get averageRating(): number {
    if (!this.product?.productReviews) return this.product?.rating ?? 0
    const reviews = this.product?.productReviews ?? []
    const sum = reviews.reduce((a, r) => a + (Number.isFinite(r.rating) ? r.rating : 0), 0)
    return reviews.length ? Math.round((sum / reviews.length) * 10) / 10 : 0
  }
  countFor(star: number): number {
    const reviews = this.product?.productReviews ?? []
    return reviews.filter((r) => Math.round(r.rating) === star).length
  }
  percentFor(star: number): number {
    if (!this.totalReviews) return 0
    return Math.round((this.countFor(star) / this.totalReviews) * 100)
  }
  helpful(id: string) {
    const reviews = this.product?.productReviews ?? []
    const r = reviews.find((x) => x.id === id)
    if (r) r.helpful += 1
  }

  // Utils
  goBack(): void {
    this.router.navigate(["/"])
  }

  parsePrice(p?: string): number | null {
    if (!p) return null
    const digits = p.replace(/[^\d]/g, "")
    const n = Number(digits)
    return Number.isFinite(n) ? n : null
  }
  discountPercent(price?: string, mrp?: string): number | null {
    const p = this.parsePrice(price)
    const m = this.parsePrice(mrp)
    if (!p || !m || m <= p) return null
    return Math.round(((m - p) / m) * 100)
  }

  formatDate(d: string): string {
    const date = new Date(d)
    return date.toLocaleDateString()
  }
  navigateToCheckout(link: string): void {
    if (link) {
      window.open(link, "_blank");
    }
  }
}
