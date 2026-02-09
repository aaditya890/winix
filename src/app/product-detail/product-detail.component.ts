import { Component, OnInit, OnDestroy, HostListener } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from "@angular/router"

interface Product {
  id: number
  isFilter: boolean
  productUrl: string
  userManual?: string,
  ahamCertificate?: string | null,
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
  videos?: string[],
  lastImage?: string,
  faqs: FAQ[]

  productInformation?: {
    featuresAndSpecs: Record<string, string>;
    measurements: Record<string, string>;
    userGuide: string[] | Record<string, string>;
    additionalDetails: Record<string, string>;
  };

  itemDetails?: {
    brandName?: string;
    modelNumber?: string;
    manufacturer?: string;
    globaltradeidentificationNumber?: string;

    customerReviews?: {
      rating: number;
      totalReviews: number;
      ratingText?: string;
    };

    bestSellersRank?: string[]; // multiple ranks (as shown)

    asin?: string;

    importerContactInformation?: string;
    itemTypeName?: string;
    includedComponents?: string;
    countryofOrigin?: string;
    itemHeight?: string;
    manufacturercontactInformation?: string;
    packerContactInformation?: string;
    unitCount?: string;
    warrantyDescription?: string;
  };

  //add new changes here
  productTechnicalSpecs?: {
    [key: string]: string;
    // Examples:
    // "Colour": "White"
    // "Brand": "Winix"
    // "Product Dimensions": "24D x 24W x 37H Centimeters"
  };

  /**
   * Additional Information (Amazon-style)
   */
  additionalInformation?: {
    manufacturer?: string;
    packer?: string;
    importer?: string;
    contact: string;
    email: string;
    itemWeight?: string;
    netQuantity?: string;
    includedComponents?: string;
    genericName?: string;
    bestSellersRank?: string[];
  };

  /**
   * What's in the Box Section
   */
  whatsInTheBox?: {
    items: string[];
  };

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
  //Product info sections
  isOpen = {
    productTechnicalSpecs: true,
    box: true,
    additionalInformation: true,
  };
  currentImageIndex = 0
  zoomed = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  isMobileOpen = false;
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
  detailedFeatures: any

  objectKeys = Object.keys;

  toggle(section: keyof typeof this.isOpen) {
    this.isOpen[section] = this.isOpen[section];
  }

  formatKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')      // camelCase → words
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
  }

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

  currentVideoIndex = 0;

  nextVideo(videos: string[]) {
    if (this.currentVideoIndex < videos.length - 1) {
      this.currentVideoIndex++;
    }
  }

  prevVideo(videos: string[]) {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
    }
  }

  products: Product[] = [
    /// Filter Products Start
    // FILTER 5500-2 Product Start
    {
      id: 6,
      isFilter: true,
      productUrl: "https://amzn.in/d/7CIFKmW",
      slug: "winix-5500-2-replacement-filter",
      name: "Winix Genuine 116130 Replacement Filter H for 5500-2 Air Purifier",
      shortName: "Winix 5500-2 Filter",
      description:
        "Genuine 116130 Replacement Filter H for Winix 5500-2. Includes True HEPA, washable AOC carbon filter, and long-lasting performance for dust, smoke, odours, and allergens.",
      images: [
        "/assets/filters/5500-2/1.webp",
        "/assets/filters/5500-2/2.webp",
        "/assets/filters/5500-2/3.webp",
        "/assets/filters/5500-2/4.webp",
        "/assets/filters/5500-2/5.webp",
        "/assets/filters/5500-2/6.webp",
        "/assets/filters/5500-2/7.webp",
        "/assets/filters/5500-2/8.webp",
        "assets/products-v2/5500-2/5500-2.webp",
        "assets/products-v2/28.webp"
      ],
      currentImage: "/assets/filters/5500-2/1.webp",
      rating: 4.7,
      category: "Replacement Filter",
      technology: "True HEPA 99.97% • Washable AOC Carbon • 4-Stage Filtration",
      keyFeatures: [
        "True HEPA captures 99.97% of airborne pollutants",
        "Washable AOC Carbon removes odours & VOCs",
        "Pre-filter extends HEPA lifespan",
        "Compatible with Winix 5500-2 air purifier",
        "Simple installation & long filter life",
        "Improves dust, smoke & allergy control"
      ],
      coverage: "NA (Filter Only)",
      filterType: "Pre-filter + Washable AOC Carbon + True HEPA",
      noiseLevel: "NA",
      isHovered: false,
      badge: "Genuine Replacement",
      isAward: true,
      awardType: "AHAM • UK Allergy • ECARF Certified",
      price: "₹3,999",
      mrp: "₹7,999",
      topReview: "5,445",
      detailedSpecs: {
        dimensions: "16.25\"L x 12.5\"W x 1.5\"H",
        weight: "980 g",
        powerConsumption: "NA",
        filterLife: "HEPA: ~12 months • Carbon: 3–6 months",
        warranty: "1 Year",
        certifications: ["AHAM", "ECARF", "Allergy UK"]
      },
      detailedFeatures: [
        "True HEPA Filter captures 99.97% of airborne particles as fine as 0.3 microns.",
        "Washable AOC Carbon Filter reduces odours from pets, kitchens, and smoke.",
        "Improves airflow & purifier efficiency with regular replacement.",
        "Easy installation with perfectly fitting frame for Winix 5500-2.",
        "Essential for maintaining clean, fresh indoor air quality.",
        "Removes dust, allergens, smoke, odours, VOCs, and pollution.",
        "Prolongs air purifier motor life by reducing strain.",
        "Designed for long-lasting, consistent filtration performance.",
        "High-quality activated carbon absorbs household smells effectively.",
        "AHAM-certified and allergy-tested for safety & performance."
      ],
      technicalDetails: {
        cadr: "NA (Filter only)",
        airChangesPerHour: "Depends on purifier",
        roomSizeRecommended: "NA",
        fanSpeeds: "NA",
        controlType: "Manual Installation",
        indicators: ["Replace Filter Indicator (5500-2 Purifier)"]
      },
      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Manual",
          "Control Method": "Touch (via purifier)",
          "Filter Type": "True HEPA + AOC Carbon",
          "Floor Area": "NA",
          "Noise Level": "NA",
          "Particle Retention Size": "0.3 Micrometer",
          "Controller Type": "Manual Insert"
        },
        measurements: {
          "Item Dimensions D x W x H": "1.5 x 12.5 x 16.25 inches",
          "Item Weight": "980 g"
        },
        userGuide: { "Specification Met": "AHAM Certified" },
        additionalDetails: { "Color": "White & Black" }
      },
      itemDetails: {
        brandName: "Winix",
        modelNumber: "116130 (Filter H)",
        manufacturer: "Winix",
        customerReviews: {
          rating: 4.7,
          totalReviews: 5445,
          ratingText: "4.7 out of 5 stars"
        },
        bestSellersRank: [
          "#91,822 in Home & Kitchen",
          "#101 in HEPA Air Purifiers"
        ],
        asin: "B01JL1TO8R",
        importerContactInformation: "Winix / Local Distributor",
        itemTypeName: "Replacement Filter",
        includedComponents: "HEPA Filter + AOC Carbon Filter",
        itemHeight: "16.25 Inches",
        packerContactInformation: "Winix Packaging Unit",
        unitCount: "1.0 count"
      },
      productTechnicalSpecs: {
        "Power Source Type": "Manual",
        "Control Method": "Touch (Purifier)",
        "Filter Type": "True HEPA + AOC Carbon",
        "Floor Area": "NA",
        "Noise Level": "NA",
        "Particle Retention Size": "0.3 Micrometer",
        "Controller Type": "Manual",
        "Item Dimensions D x W x H": "1.5 x 12.5 x 16.25 inches",
        "Item Weight": "980 g",
        "Specification Met": "AHAM Certified",
        "Color": "White & Black",
        "Brand Name": "Winix",
        "Model Number": "116130",
        "Manufacturer": "Winix",
        "ASIN": "B01JL1TO8R",
        "Item Type Name": "Replacement Filter",
        "Item Height": "16.25 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "1 Year on Product"
      },
      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "980 g",
        netQuantity: "1 Count",
        includedComponents: "True HEPA + AOC Carbon Filter",
        genericName: "Replacement Air Purifier Filter",
        bestSellersRank: [
          "#91,822 in Home & Kitchen",
          "#101 in HEPA Air Purifiers"
        ]
      },
      whatsInTheBox: {
        items: ["True HEPA Filter H", "AOC Carbon Filter", "User Insert Guide"]
      },
      highlightImages: [
        "/assets/filters/5500-2/A+/1.webp",
        "/assets/filters/5500-2/A+/2.webp",
        "/assets/filters/5500-2/A+/3.webp",
        "/assets/filters/5500-2/A+/4.webp",
        "/assets/filters/5500-2/A+/5.webp",
        "/assets/filters/5500-2/A+/6.webp"
      ],
      videos: ["/assets/filters/5500-2/5500-2.webm"],
      lastImage: "assets/winix-product-images/last-image.webp",
      faqs: [
        {
          q: "Is this a genuine filter?",
          a: "Yes, it is an authentic Winix Genuine 116130 Filter H compatible with 5500-2.",
          open: false
        },
        {
          q: "Is the carbon filter washable?",
          a: "Yes, the AOC Carbon filter is fully washable.",
          open: false
        },
        {
          q: "How long do the filters last?",
          a: "HEPA lasts ~12 months; Carbon lasts 3–6 months depending on usage.",
          open: false
        },
        {
          q: "Does this help with odours?",
          a: "Yes, the washable carbon filter effectively reduces household smells.",
          open: false
        },
        {
          q: "Is it easy to install?",
          a: "Yes, simply open the front panel and replace the old filter.",
          open: false
        }
      ],
      productReviews: [
        {
          id: "5500-r1",
          author: "Dr. Susan",
          rating: 5,
          title: "Best replacement filter",
          body: "The filter quality is excellent. Fits perfectly and the purifier performance improved immediately.",
          date: "2025-11-19",
          verified: true,
          helpful: 22,
          images: []
        },
        {
          id: "5500-r2",
          author: "Hannah",
          rating: 5,
          title: "Just perfect",
          body: "Genuine filter and works exactly as expected. Air quality improved within a few hours.",
          date: "2023-12-07",
          verified: true,
          helpful: 18,
          images: []
        },
        {
          id: "5500-r3",
          author: "Harold",
          rating: 4,
          title: "Good for regular dust and allergies",
          body: "Filters most dust and pollen well. Needs cleaning or replacement on time for best results.",
          date: "2025-09-25",
          verified: true,
          helpful: 9,
          images: []
        },
        {
          id: "5500-r4",
          author: "Gaurav D.",
          rating: 5,
          title: "Perfect fit for my purifier",
          body: "The replacement was simple and the air quality improvement was noticeable instantly.",
          date: "2025-10-11",
          verified: true,
          helpful: 12,
          images: []
        },
        {
          id: "5500-r5",
          author: "Lina",
          rating: 5,
          title: "Good product",
          body: "This is my second purchase. Works well and lasts a good amount of time with regular cleaning.",
          date: "2025-07-03",
          verified: true,
          helpful: 15,
          images: []
        },
        {
          id: "5500-r6",
          author: "Sheila",
          rating: 5,
          title: "Genuine filter",
          body: "High quality and fits perfectly. Will definitely purchase again when needed.",
          date: "2025-05-27",
          verified: true,
          helpful: 14,
          images: []
        }
      ]
    },
    // FILTER 5500-2 Product End

    // FILTER T800 Product Start
    {
      id: 7,
      isFilter: true,
      productUrl: "https://www.amazon.in/Winix-Genuine-Replacement-Filter-T810/dp/B0CS246BPH",
      slug: "winix-t800-replacement-filter",
      name: "Winix Genuine Replacement Filter R for T800 Air Purifier",
      shortName: "Winix T800 Filter",
      description:
        "Genuine Winix Filter R for the T800 air purifier. Includes True HEPA, Fine-Mesh Pre-Filter and Activated Carbon Filter for powerful filtration of dust, smoke, odours, and allergens.",

      images: [
        "/assets/filters/T800/1.webp",
        "/assets/filters/T800/2.webp",
        "/assets/filters/T800/3.webp",
        "assets/products-v2/T800/T800.webp",
        "/assets/filters/T800/4.webp",
        "/assets/filters/T800/5.webp",
        "/assets/filters/T800/6.webp",
        "assets/products-v2/28.webp"
      ],

      currentImage: "/assets/filters/T800/1.webp",

      rating: 4.9,
      category: "Replacement Filter",
      technology: "True HEPA 99.99%* • Activated Carbon • Fine Mesh Pre-Filter",

      keyFeatures: [
        "Compatible with Winix T800 air purifier",
        "True HEPA captures 99.99% allergens as small as 0.01 microns",
        "Activated carbon reduces odours & VOCs",
        "Fine mesh pre-filter traps larger dust particles",
        "Designed for long filter life and high airflow",
        "AHAM certified filtration performance"
      ],

      coverage: "NA (Filter Only)",
      filterType: "Pre-Filter + Activated Carbon + True HEPA",
      noiseLevel: "NA",

      isHovered: false,
      badge: "Genuine Replacement",
      isAward: true,
      awardType: "AHAM • Allergy UK • ECARF Certified",

      price: "₹4,499",
      mrp: "₹6,999",

      topReview: "20",

      detailedSpecs: {
        dimensions: "22.9D x 22.9W x 26.7H cm",
        weight: "454 g",
        powerConsumption: "NA",
        filterLife: "Replace every 12 months",
        warranty: "1 Year",
        certifications: ["AHAM Certified", "Allergy UK", "ECARF"]
      },

      detailedFeatures: [
        "Compatible with Winix T800 air cleaner",
        "Fine Mesh Pre-Filter captures larger airborne particles and protects the HEPA filter",
        "True HEPA captures 99.99% airborne allergens like pollen, dust, smoke and pet dander",
        "Activated Carbon Filter removes VOCs and household odours from kitchens, pets and smoke",
        "All-in-one canister filter ensures easy replacement and consistent airflow",
        "Designed to maintain high air quality and purifier performance",
        "Ideal for homes with pets, dust allergies or pollution exposure",
        "Optimised for long filter life when maintained properly"
      ],

      technicalDetails: {
        cadr: "NA (Filter only)",
        airChangesPerHour: "Depends on purifier",
        roomSizeRecommended: "NA",
        fanSpeeds: "NA",
        controlType: "Manual Installation",
        indicators: ["Filter Replacement Light (T800 Purifier)"]
      },

      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "AC (Purifier-powered)",
          "Control Method": "Touch (via purifier)",
          "Filter Type": "True HEPA + Carbon + Pre-Filter",
          "Floor Area": "410 Sq Ft",
          "Noise Level": "NA",
          "Particle Retention Size": "0.01 Micrometer",
          "Controller Type": "Button Control"
        },
        measurements: {
          "Item Dimensions D x W x H": "22.9 x 22.9 x 26.7 cm",
          "Item Weight": "454 g"
        },
        userGuide: {
          "Specification Met": "AHAM Certified"
        },
        additionalDetails: {
          "Color": "Black"
        }
      },

      itemDetails: {
        brandName: "Winix",
        modelNumber: "1712-0118-00",
        manufacturer: "Winix",
        customerReviews: {
          rating: 4.9,
          totalReviews: 20,
          ratingText: "4.9 out of 5 stars"
        },
        bestSellersRank: [
          "#304,655 in Home & Kitchen",
          "#184 in Air Purifier Filters"
        ],
        asin: "B0CS246BPH",
        importerContactInformation: "Sha Maknaji Veerchand, Ph no-8885241706",
        itemTypeName: "Replacement Filter",
        includedComponents: "True HEPA Filter, Pre-Filter, Activated Carbon",
        itemHeight: "10.5 Inches",
        packerContactInformation:
          "Sha Maknaji Veerchand, Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count"
      },

      productTechnicalSpecs: {
        "Power Source Type": "AC (Purifier)",
        "Control Method": "Touch (Purifier)",
        "Filter Type": "True HEPA + Carbon + Pre-Filter",
        "Floor Area": "410 Sq Ft",
        "Noise Level": "NA",
        "Particle Retention Size": "0.01 Micrometer",
        "Controller Type": "Button Control",
        "Item Dimensions D x W x H": "22.9 x 22.9 x 26.7 cm",
        "Item Weight": "454 g",
        "Specification Met": "AHAM Certified",
        "Color": "Black",
        "Brand Name": "Winix",
        "Model Number": "1712-0118-00",
        "Manufacturer": "Winix",
        "ASIN": "B0CS246BPH",
        "Item Type Name": "Replacement Filter",
        "Item Height": "10.5 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "1 Year on Product"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "454 g",
        netQuantity: "1 Count",
        includedComponents: "HEPA Filter, Pre-Filter, Carbon Filter",
        genericName: "Air Purifier Replacement Filter",
        bestSellersRank: [
          "#304,655 in Home & Kitchen",
          "#184 in Air Purifier Filters"
        ]
      },

      whatsInTheBox: {
        items: ["HEPA Filter", "Pre-Filter", "Carbon Filter"]
      },

      highlightImages: [
        "/assets/filters/T800/A+/1.webp",
        "/assets/filters/T800/A+/2.webp",
        "/assets/filters/T800/A+/3.webp",
        "/assets/filters/T800/A+/4.webp",
        "/assets/filters/T800/A+/5.webp",
        "/assets/filters/T800/A+/6.webp",
      ],

      videos: ["assets/filters/T800/T800.webm"],
      lastImage: "assets/winix-product-images/last-image.webp",

      faqs: [
        {
          q: "Is this filter compatible with T800?",
          a: "Yes, this is the original Winix Filter R designed for the T800 air purifier.",
          open: false
        },
        {
          q: "How long does the filter last?",
          a: "Typically up to 12 months depending on usage and air quality.",
          open: false
        },
        {
          q: "Does this remove cooking and pet odours?",
          a: "Yes, the activated carbon filter removes common household smells.",
          open: false
        },
        {
          q: "Is the installation easy?",
          a: "Yes, simply open the purifier, remove the old filter and insert the new one.",
          open: false
        },
        {
          q: "Is this a genuine Winix part?",
          a: "Yes, this is the authentic manufacturer replacement filter.",
          open: false
        }
      ],

      productReviews: [
        {
          id: "t800-r1",
          author: "Mark Lakatos",
          rating: 5,
          title: "Great",
          body: "Works exactly as expected. Genuine filter and improves performance immediately.",
          date: "2025-11-04",
          verified: true,
          helpful: 4,
          images: []
        },
        {
          id: "t800-r2",
          author: "Delane Robertson",
          rating: 5,
          title: "Keeps the Winix working",
          body: "Perfect replacement. The purifier works really well after installing the new filter.",
          date: "2025-11-01",
          verified: true,
          helpful: 6,
          images: []
        },
        {
          id: "t800-r3",
          author: "Patrick",
          rating: 5,
          title: "Quiet",
          body: "Seems to work like the original filter. Satisfied so far.",
          date: "2025-04-15",
          verified: true,
          helpful: 3,
          images: []
        },
        {
          id: "t800-r4",
          author: "Charles Johnson",
          rating: 4,
          title: "Good product as advertised",
          body: "Really a great product. I will probably order again soon.",
          date: "2025-11-25",
          verified: true,
          helpful: 5,
          images: []
        }
      ]
    },
    // FILTER T800 Product End

    // FILTER 5300-2 Product Start
    {
      id: 8,
      isFilter: true,
      productUrl: "https://www.amazon.in/Genuine-Winix-115115-Replacement-5300-2/dp/B002QUZJAS",
      slug: "winix-5300-2-replacement-filter",
      name: "Genuine Winix 115115 Replacement Filter A for 5300-2 Compatible Models",
      shortName: "Winix 5300-2 Filter",
      description:
        "Original Winix 115115 Replacement Filter A compatible with Winix 5300-2, C535, P300 and other models. Includes True HEPA filter plus four Activated Carbon Pre-Filters for powerful odour, dust, VOC, and allergen removal.",

      images: [
        "/assets/filters/5300-2/1.webp",
        "/assets/filters/5300-2/2.webp",
        "/assets/filters/5300-2/3.webp",
        "assets/products-v2/5300-2/5300-2.webp",
        "assets/products-v2/28.webp"
      ],

      currentImage: "/assets/filters/5300-2/1.webp",

      rating: 4.7,
      category: "Replacement Filter",
      technology: "True HEPA 99.99% • Activated Carbon Pre-Filters • 4-Stage Filtration",

      keyFeatures: [
        "True HEPA captures 99.99% of airborne allergens",
        "4 Activated Carbon Pre-Filters reduce odour and VOCs",
        "Compatible with Winix 5300-2, C535, P300 models",
        "Captures dust, smoke, pollen, and pet dander",
        "Long filter life for year-round clean air",
        "Simple installation with perfect OEM fit"
      ],

      coverage: "NA (Filter Only)",
      filterType: "True HEPA + Activated Carbon",
      noiseLevel: "NA",
      isHovered: false,
      badge: "Genuine Replacement",
      isAward: true,
      awardType: "AHAM • ECARF Certified",

      price: "₹3,799",
      mrp: "₹7,990",

      topReview: "8,434",

      detailedSpecs: {
        dimensions: "14.09\"D × 2.2\"W × 16.61\"H",
        weight: "499 g",
        powerConsumption: "NA",
        filterLife: "HEPA: 12 months • Carbon: 3 months",
        warranty: "No Warranty (Consumable)",
        certifications: ["AHAM Certified", "ECARF Tested"]
      },

      detailedFeatures: [
        "True HEPA Filter captures 99.99% of fine particles as small as 0.01 microns.",
        "Four Activated Carbon Pre-Filters reduce odours from pets, kitchens, smoking, and VOCs.",
        "Compatible with Winix models 5300-2, C535, 6300-2, P300, and more.",
        "Improves airflow and restores peak performance to the purifier.",
        "Perfect OEM fit ensures easy, quick installation.",
        "Designed to remove dust, allergens, smoke, pet hair, and household odours.",
        "Extends purifier life by reducing motor strain.",
        "High-quality carbon filtration helps maintain fresh indoor air.",
        "Recommended HEPA replacement every 12 months.",
        "Comes with a filter change indicator (purifier-based)."
      ],

      technicalDetails: {
        cadr: "NA (Filter only)",
        airChangesPerHour: "Depends on purifier model",
        roomSizeRecommended: "NA",
        fanSpeeds: "NA",
        controlType: "Manual Installation",
        indicators: ["Replace Filter Indicator (in purifier)"]
      },

      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "AC (Purifier)",
          "Control Method": "Touch (Purifier Panel)",
          "Filter Type": "True HEPA + Activated Carbon",
          "Floor Area": "99 Square Meters",
          "Noise Level": "NA",
          "Particle Retention Size": "0.01 Micron",
          "Controller Type": "Button Control (Purifier)"
        },
        measurements: {
          "Item Dimensions D x W x H": "14.09 × 2.2 × 16.61 inches",
          "Item Weight": "454 g"
        },
        userGuide: { "Specification Met": "AHAM Certified" },
        additionalDetails: { "Color": "White/Black" }
      },

      itemDetails: {
        brandName: "Winix",
        modelNumber: "115115",
        manufacturer: "Winix",
        customerReviews: {
          rating: 4.7,
          totalReviews: 8434,
          ratingText: "4.7 out of 5 stars"
        },
        bestSellersRank: [
          "#7,814 in Home & Kitchen",
          "#26 in Air Purifier Filters"
        ],
        asin: "B002QUZJAS",
        itemTypeName: "HEPA Air Filter",
        includedComponents: "True HEPA Filter + 4 Carbon Pre-Filters",
        itemHeight: "16.61 Inches",
        unitCount: "1.0 count"
      },

      productTechnicalSpecs: {
        "Power Source Type": "AC",
        "Control Method": "Touch",
        "Filter Type": "True HEPA + Carbon",
        "Floor Area": "99 Square Meters",
        "Noise Level": "NA",
        "Particle Retention Size": "0.01 Micron",
        "Controller Type": "Button Control",
        "Item Dimensions D x W x H": "14.09 × 2.2 × 16.61 inches",
        "Item Weight": "454 g",
        "Specification Met": "AHAM Certified",
        "Color": "White/Black",
        "Brand Name": "Winix",
        "Model Number": "115115",
        "Manufacturer": "Winix",
        "ASIN": "B002QUZJAS",
        "Item Type Name": "HEPA Filter",
        "Item Height": "16.61 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "No Warranty"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "454 g",
        netQuantity: "1 Count",
        includedComponents: "True HEPA Filter + 4 Carbon Pre-Filters",
        genericName: "Replacement Air Purifier Filter",
        bestSellersRank: [
          "#7,814 in Home & Kitchen",
          "#26 in Air Purifier Filters"
        ]
      },

      whatsInTheBox: {
        items: [
          "True HEPA Filter",
          "4 Activated Carbon Pre-Filters",
          "User Insert Guide"
        ]
      },

      highlightImages: [
        "/assets/filters/5500-2/A+/1.webp",
        "/assets/filters/5500-2/A+/2.webp",
        "/assets/filters/5500-2/A+/3.webp",
        "/assets/filters/5500-2/A+/4.webp",
        "/assets/filters/5500-2/A+/5.webp",
        "/assets/filters/5500-2/A+/6.webp"
      ],

      videos: ["/assets/filters/5300-2/5300-2.webm"],
      lastImage: "assets/winix-product-images/last-image.webp",

      faqs: [
        {
          q: "Is this a genuine Winix filter?",
          a: "Yes, this is the original Winix 115115 Replacement Filter A.",
          open: false
        },
        {
          q: "How long does the HEPA filter last?",
          a: "Around 12 months depending on air quality and usage.",
          open: false
        },
        {
          q: "Are the carbon pre-filters included?",
          a: "Yes, four Activated Carbon Pre-Filters are included.",
          open: false
        },
        {
          q: "Does this fit the Winix 5300-2?",
          a: "Yes, it is fully compatible with Winix 5300-2, C535, and P300.",
          open: false
        },
        {
          q: "Does it help with pet odour?",
          a: "Yes, the carbon filters effectively reduce pet odour and household smells.",
          open: false
        }
      ],

      productReviews: [
        {
          id: "5300-r1",
          author: "Rohan M.",
          rating: 5,
          title: "Original and perfect fit",
          body: "Fits my 5300-2 perfectly. Air feels noticeably cleaner within a day. Genuine Winix quality.",
          date: "2025-07-19",
          verified: true,
          helpful: 41,
          images: []
        },
        {
          id: "5300-r2",
          author: "Ayesha Khan",
          rating: 5,
          title: "Excellent filter set",
          body: "Carbon pre-filters work really well for kitchen odours. Installation was super simple.",
          date: "2025-06-11",
          verified: true,
          helpful: 28,
          images: []
        },
        {
          id: "5300-r3",
          author: "Sandeep",
          rating: 4,
          title: "Good but price could be lower",
          body: "Working great so far. Removes dust effectively. Slightly expensive but worth it.",
          date: "2025-05-02",
          verified: true,
          helpful: 16,
          images: []
        },
        {
          id: "5300-r4",
          author: "Aris (Germany)",
          rating: 5,
          title: "Meet the expectations. Original winix filter",
          body: "The filter is the original Winix filter and fits perfectly. Very satisfied.",
          date: "2025-07-12",
          verified: true,
          helpful: 22,
          images: []
        }
      ]
    },
    // FILTER 5300-2 Product End

    // FILTER T500 Product Start
    {
      id: 9,
      isFilter: true,
      productUrl: "https://www.amazon.in/dp/B08QDHDHTV",
      slug: "winix-t500-replacement-filter",
      name: "Winix Genuine 1712-0110-00 Replacement Filter for T500 Air Purifier",
      shortName: "Winix T500 Filter",
      description:
        "Genuine Replacement Filter for Winix T500 Air Purifier. Includes True HEPA, Activated Carbon, and Pre-filter for long-lasting protection against dust, smoke, odours, and allergens.",
      images: [
        "/assets/filters/A231/2.webp",
        "/assets/filters/A231/1.webp",
        "/assets/filters/A231/3.webp",
        "assets/products-v2/T500/T500.webp",
        "/assets/filters/A231/4.webp",
        "/assets/filters/A231/5.webp",
        "/assets/filters/A231/6.webp",
        "assets/products-v2/28.webp"
      ],
      currentImage: "/assets/filters/A231/2.webp",
      rating: 4.8,
      category: "Replacement Filter",
      technology: "True HEPA 99.97% • Activated Carbon • 3-Stage Filtration",
      keyFeatures: [
        "True HEPA captures 99.97% airborne pollutants",
        "Activated Carbon removes odours & VOCs",
        "Fine pre-filter traps dust & hair",
        "Compatible only with Winix T500",
        "Long filter life up to 12 months",
        "Improves allergy & pollution control"
      ],
      coverage: "NA (Filter Only)",
      filterType: "Pre-filter + Carbon + True HEPA",
      noiseLevel: "NA",
      isHovered: false,
      badge: "Genuine Replacement",
      isAward: true,
      awardType: "AHAM • Allergy Safe",
      price: "₹2,999",
      mrp: "₹3,999",
      topReview: "251",
      detailedSpecs: {
        dimensions: "8.3 x 8.3 x 2.5 inches",
        weight: "385 g",
        powerConsumption: "NA",
        filterLife: "HEPA: ~12 months • Carbon: 3–6 months",
        warranty: "NA",
        certifications: ["AHAM Certified"]
      },
      detailedFeatures: [
        "True HEPA captures 99.97% particles up to 0.3 microns",
        "Carbon filter absorbs smoke, pets & kitchen odours",
        "Improves purifier efficiency & airflow",
        "Perfect OEM fit for T500 model",
        "Protects motor life & ensures peak performance",
        "Reduces PM2.5, pollen & indoor pollution"
      ],
      technicalDetails: {
        cadr: "NA",
        airChangesPerHour: "Depends on purifier",
        roomSizeRecommended: "NA",
        fanSpeeds: "NA",
        controlType: "Manual Installation",
        indicators: ["Filter Replacement Indicator"]
      },

      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Manual",
          "Control Method": "Touch (via purifier)",
          "Filter Type": "True HEPA + Carbon",
          "Floor Area": "NA",
          "Noise Level": "NA",
          "Particle Retention Size": "0.3 Micrometer",
          "Controller Type": "Manual Insert"
        },
        measurements: {
          "Item Dimensions D x W x H": "8.3 x 8.3 x 2.5 inches",
          "Item Weight": "385 g"
        },
        userGuide: { "Specification Met": "AHAM Certified" },
        additionalDetails: { "Color": "Black" }
      },

      itemDetails: {
        brandName: "Winix",
        modelNumber: "1712-0110-00",
        manufacturer: "Winix",
        customerReviews: {
          rating: 4.8,
          totalReviews: 251,
          ratingText: "4.8 out of 5 stars"
        },
        bestSellersRank: [
          "#109,271 in Home & Kitchen",
          "#482 in Air Purifier Filters"
        ],
        asin: "B08NSQ91LM",
        importerContactInformation: "Sha Maknaji Veerchand, Ph no-8885241706",
        itemTypeName: "Replacement Filter",
        includedComponents: "Pre-filter + Carbon + HEPA",
        itemHeight: "2.5 Inches",
        packerContactInformation:
          "Sha Maknaji Veerchand, Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count"
      },

      productTechnicalSpecs: {
        "Power Source Type": "Manual",
        "Control Method": "Touch (Purifier)",
        "Filter Type": "True HEPA + Carbon",
        "Floor Area": "NA",
        "Noise Level": "NA",
        "Particle Retention Size": "0.3 Micrometer",
        "Controller Type": "Manual",
        "Item Dimensions D x W x H": "8.3 x 8.3 x 2.5 inches",
        "Item Weight": "385 g",
        "Specification Met": "AHAM Certified",
        "Color": "Black",
        "Brand Name": "Winix",
        "Model Number": "1712-0110-00",
        "Manufacturer": "Winix",
        "ASIN": "B08NSQ91LM",
        "Item Type Name": "Replacement Filter",
        "Item Height": "2.5 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "No Warranty"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "385 g",
        netQuantity: "1 Count",
        includedComponents: "True HEPA + Carbon Filter",
        genericName: "Replacement Air Purifier Filter",
        bestSellersRank: [
          "#109,271 in Home & Kitchen",
          "#482 in Air Purifier Filters"
        ]
      },

      whatsInTheBox: {
        items: ["True HEPA Filter", "Carbon Filter", "Pre-filter"]
      },

      highlightImages: [
        "/assets/filters/A231/A+/1.webp",
        "/assets/filters/A231/A+/2.webp",
        "/assets/filters/A231/A+/3.webp",
        "/assets/filters/A231/A+/4.webp",
        "/assets/filters/A231/A+/5.webp",
        "/assets/filters/A231/A+/6.webp"
      ],

      videos: ["assets/filters/A231/A231.webm"],
      lastImage: "assets/winix-product-images/last-image.webp",

      faqs: [
        {
          q: "Is this filter compatible with T500 only?",
          a: "Yes, this filter is specially designed only for the Winix T500 air purifier for perfect fit and best performance.",
          open: false
        },
        {
          q: "How often should I replace the filter?",
          a: "It is recommended to replace the filter once every 12 months depending on usage and air quality.",
          open: false
        },
        {
          q: "Does this filter reduce cooking and pet odours?",
          a: "Yes, the activated carbon layer effectively reduces cooking smells, pet odours and smoke.",
          open: false
        },
        {
          q: "Is this a genuine Winix original filter?",
          a: "Yes, this is a 100% genuine Winix original replacement filter made for T500.",
          open: false
        },
        {
          q: "Can I wash this filter?",
          a: "Only the pre-filter is washable. The HEPA and carbon filters should not be washed.",
          open: false
        },
        {
          q: "Will this help with dust allergy and sneezing?",
          a: "Yes, the True HEPA filter captures fine dust, pollen and allergens which helps reduce allergy symptoms.",
          open: false
        }
      ]
      ,
      productReviews: [
        {
          id: "t500-r1",
          author: "Rahul",
          rating: 5,
          title: "Perfect fit for T500",
          body: "Original filter, fitting perfect and air feels fresh in just few hours.",
          date: "2025-08-12",
          verified: true,
          helpful: 11,
          images: []
        },
        {
          id: "t500-r2",
          author: "Neha",
          rating: 4,
          title: "Good quality",
          body: "Carbon filter clears cooking smell easily. Works well.",
          date: "2025-06-03",
          verified: true,
          helpful: 7,
          images: []
        },
        {
          id: "t500-r3",
          author: "Amit",
          rating: 5,
          title: "Air quality improved a lot",
          body: "After replacing the filter, dust in my room reduced clearly. Very satisfied.",
          date: "2025-07-18",
          verified: true,
          helpful: 14,
          images: []
        },
        {
          id: "t500-r4",
          author: "Pooja",
          rating: 4,
          title: "Worth the price",
          body: "Little expensive but performance is very good and genuine product.",
          date: "2025-05-21",
          verified: true,
          helpful: 9,
          images: []
        },
        {
          id: "t500-r5",
          author: "Sanjay",
          rating: 5,
          title: "Best replacement filter",
          body: "Easy to install and perfect match for my T500 purifier. Fast delivery also.",
          date: "2025-04-10",
          verified: true,
          helpful: 12,
          images: []
        },
        {
          id: "t500-r6",
          author: "Kiran",
          rating: 4,
          title: "Helps with allergy",
          body: "Sneezing and dust problem reduced after using this new filter.",
          date: "2025-03-02",
          verified: true,
          helpful: 10,
          images: []
        }
      ]

    },
    // FILTER T500 Product End

    // FILTER T500 Product Start
    {
      id: 10,
      isFilter: true,
      productUrl: "https://www.amazon.in/dp/B08QDHDHTV",
      slug: "winix-a231-replacement-filter",
      name: "Winix Genuine 1712-0110-00 Replacement Filter O for A231 Air Purifier",
      shortName: "Winix A231 Filter",
      description:
        "Genuine Winix 1712-0110-00 Replacement Filter O for A231. Includes True HEPA, activated carbon filter and long-lasting filtration for dust, smoke, odours and allergens.",
      images: [
        "/assets/filters/A231/1.webp",
        "/assets/filters/A231/2.webp",
        "/assets/filters/A231/3.webp",
        "assets/products-v2/T500/T500.webp",
        "/assets/filters/A231/4.webp",
        "/assets/filters/A231/5.webp",
        "/assets/filters/A231/6.webp",
        "assets/products-v2/28.webp"

      ],
      currentImage: "/assets/filters/A231/1.webp",
      rating: 4.8,
      category: "Replacement Filter",
      technology: "True HEPA 99.97% • Activated Carbon • 3-Stage Filtration",
      keyFeatures: [
        "True HEPA captures 99.97% of airborne pollutants",
        "Activated carbon reduces odours & VOCs",
        "Fine mesh pre-filter for large particles",
        "Compatible only with Winix A231 air purifier",
        "Easy installation & long filter life",
        "Improves dust, smoke & allergy control"
      ],
      coverage: "NA (Filter Only)",
      filterType: "Pre-filter + Activated Carbon + True HEPA",
      noiseLevel: "NA",
      isHovered: false,
      badge: "Best Seller",
      isAward: true,
      awardType: "AHAM Certified",
      price: "₹2,999",
      mrp: "₹3,999",
      topReview: "251",

      detailedSpecs: {
        dimensions: "8.3\" x 8.3\" x 2.5\"",
        weight: "386 g",
        powerConsumption: "NA",
        filterLife: "HEPA: ~12 months • Carbon: 3–6 months",
        warranty: "1 Year",
        certifications: ["AHAM Certified"]
      },

      detailedFeatures: [
        "True HEPA Filter captures 99.97% of airborne particles as small as 0.3 microns.",
        "Activated Carbon Filter reduces odours from pets, kitchens and smoke.",
        "Fine Mesh Pre-Filter blocks large airborne dust particles.",
        "Designed exclusively for Winix A231 purifier.",
        "Improves indoor air quality instantly after replacement.",
        "Helps reduce allergy symptoms and respiratory discomfort.",
        "Easy slide-in installation without tools.",
        "Maintains optimal airflow and purifier efficiency.",
        "Durable multi-layer filter construction.",
        "Long-lasting performance for daily home use."
      ],

      technicalDetails: {
        cadr: "NA (Filter only)",
        airChangesPerHour: "Depends on purifier",
        roomSizeRecommended: "NA",
        fanSpeeds: "NA",
        controlType: "Manual Installation",
        indicators: ["Replace Filter Indicator"]
      },

      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Manual",
          "Control Method": "Touch (via purifier)",
          "Filter Type": "True HEPA + Activated Carbon",
          "Floor Area": "NA",
          "Noise Level": "NA",
          "Particle Retention Size": "0.3 Micrometer",
          "Controller Type": "Manual Insert"
        },
        measurements: {
          "Item Dimensions D x W x H": "8.3 x 8.3 x 2.5 inches",
          "Item Weight": "386 g"
        },
        userGuide: {
          "Specification Met": "AHAM Certified"
        },
        additionalDetails: {
          "Color": "Black"
        }
      },

      itemDetails: {
        brandName: "Winix",
        modelNumber: "1712-0110-00",
        manufacturer: "Winix",
        customerReviews: {
          rating: 4.8,
          totalReviews: 251,
          ratingText: "4.8 out of 5 stars"
        },
        bestSellersRank: [
          "#109,271 in Home & Kitchen",
          "#482 in Air Purifier Filters"
        ],
        asin: "B08NSQ91LM",
        importerContactInformation: "Sha Maknaji Veerchand, Ph no-8885241706",
        itemTypeName: "Replacement Filter",
        includedComponents: "Pre-filter, Carbon Filter, HEPA Filter",
        itemHeight: "2.5 Inches",
        packerContactInformation:
          "Sha Maknaji Veerchand , Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count"
      },

      productTechnicalSpecs: {
        "Power Source Type": "Manual",
        "Control Method": "Touch (Purifier)",
        "Filter Type": "True HEPA + Activated Carbon",
        "Floor Area": "NA",
        "Noise Level": "NA",
        "Particle Retention Size": "0.3 Micrometer",
        "Controller Type": "Manual",
        "Item Dimensions D x W x H": "8.3 x 8.3 x 2.5 inches",
        "Item Weight": "386 g",
        "Specification Met": "AHAM Certified",
        "Color": "Black",
        "Brand Name": "Winix",
        "Model Number": "1712-0110-00",
        "Manufacturer": "Winix",
        "ASIN": "B08NSQ91LM",
        "Item Type Name": "Replacement Filter",
        "Item Height": "2.5 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "1 Year on Product"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "386 g",
        netQuantity: "1 Count",
        includedComponents: "Pre-filter, Carbon Filter, HEPA Filter",
        genericName: "Replacement Air Purifier Filter",
        bestSellersRank: [
          "#109,271 in Home & Kitchen",
          "#482 in Air Purifier Filters"
        ]
      },

      whatsInTheBox: {
        items: ["True HEPA Filter", "Activated Carbon Filter", "Pre-Filter"]
      },

      highlightImages: [
        "/assets/filters/A231/A+/1.webp",
        "/assets/filters/A231/A+/2.webp",
        "/assets/filters/A231/A+/3.webp",
        "/assets/filters/A231/A+/4.webp",
        "/assets/filters/A231/A+/5.webp",
        "/assets/filters/A231/A+/6.webp"
      ],

      videos: ["assets/filters/A231/A231.webm"],
      lastImage: "assets/winix-product-images/last-image.webp",

      faqs: [
        {
          q: "Is this filter compatible with A231 only?",
          a: "Yes, it is specially designed only for the Winix A231 air purifier.",
          open: false
        },
        {
          q: "How often should I replace the filter?",
          a: "Usually once every 12 months depending on air quality and usage.",
          open: false
        },
        {
          q: "Does it help with kitchen odours?",
          a: "Yes, the activated carbon layer effectively absorbs cooking smells.",
          open: false
        },
        {
          q: "Is this a genuine Winix filter?",
          a: "Yes, this is a 100% genuine original Winix replacement filter.",
          open: false
        },
        {
          q: "Can the filter be washed?",
          a: "Only the pre-filter is washable. HEPA and carbon filters should not be washed.",
          open: false
        },
        {
          q: "Is this good for allergy patients?",
          a: "Yes, it captures dust, pollen and allergens that cause sneezing and breathing issues.",
          open: false
        }
      ],

      productReviews: [
        {
          id: "a231-r1",
          author: "Amit",
          rating: 5,
          title: "Perfect replacement for A231",
          body: "Original filter, perfect fitting and air feels much cleaner within few hours.",
          date: "2025-08-10",
          verified: true,
          helpful: 14,
          images: []
        },
        {
          id: "a231-r2",
          author: "Pooja",
          rating: 4,
          title: "Good quality filter",
          body: "Odour reduction is very noticeable. Works well in bedroom.",
          date: "2025-06-18",
          verified: true,
          helpful: 9,
          images: []
        },
        {
          id: "a231-r3",
          author: "Rohit",
          rating: 5,
          title: "Best for dust allergy",
          body: "Sneezing reduced a lot after replacing this filter. Worth the price.",
          date: "2025-07-22",
          verified: true,
          helpful: 12,
          images: []
        },
        {
          id: "a231-r4",
          author: "Sneha",
          rating: 4,
          title: "Easy to install",
          body: "Installation is super easy. Just slide and it’s done.",
          date: "2025-05-30",
          verified: true,
          helpful: 8,
          images: []
        },
        {
          id: "a231-r5",
          author: "Kunal",
          rating: 5,
          title: "Genuine Winix filter",
          body: "Packaging and quality both are original. Air purifier performance boosted.",
          date: "2025-04-12",
          verified: true,
          helpful: 11,
          images: []
        },
        {
          id: "a231-r6",
          author: "Meena",
          rating: 4,
          title: "Good for daily use",
          body: "Daily dust and pet odour problem solved. Satisfied purchase.",
          date: "2025-03-25",
          verified: true,
          helpful: 7,
          images: []
        }
      ]
    },

    /// Filter Products End

    // A231 Product Start
    {
      id: 1,
      isFilter: false,
      productUrl: "https://www.amazon.in/Winix-Small-Tower-A231-Purifier/dp/B08HW5SBQ6/ref=sr_1_1_sspa?crid=3E4UW6KQS1IHL&dib=eyJ2IjoiMSJ9.nyrDct4QLbf6J4nB4JwHKdswXh_KKQKMAuEv-AlXIBI.39zb7Frm_88rf20XFP4m78D_BdJfBpTFCAvaG-7-It4&dib_tag=se&keywords=winix%2Ba231&qid=1758281141&sprefix=winix%2Ba231%2Caps%2C246&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1 ",
      slug: "winix-a231-air-purifier",
      name: "Winix A231 360° All in One 4 Stage True HEPA Air Purifier with PlasmaWave Tech",
      shortName: "A231 Compact",
      userManual: 'assets/manuals/a231.pdf',
      ahamCertificate: null,
      description:
        "Compact HEPA purifier for small-to-medium rooms with washable pre-filter, activated carbon, True HEPA, and PlasmaWave. AHAM-verified 230 sq ft coverage; ultra-quiet 20 dB.",
      images: [
        "assets/products-v2/A231/A231.png",
        "assets/products-v2/A231/2.png",
        "assets/products-v2/A231/3.png",
        "assets/products-v2/A231/4.png",
        "assets/products-v2/A231/5.png",
        "assets/products-v2/A231/6.png",
        "assets/products-v2/A231/7.png",
        "assets/products-v2/A231/8.png",
        "assets/products-v2/28.png"
      ],
      currentImage: "assets/products-v2/A231/product-1.jpg",
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
        "AHAM Verifide® at 230 sq ft.: Also cleans rooms up to 1,104 sq ft in 1 hour (552 sq ft in 30 minutes, 368 sq ft in 20 minutes, 276 sq ft in 15 minutes)",

        "Fine Mesh Pre-Filter: The first line of defense against the largest airborne particles found indoors.",

        "Winix True HEPA: Captures 99.99%* of airborne allergens including pollen, dust, smoke, and pet dander, as small as 0.01 microns.",

        "Activated Carbon Filter: Reduces VOCs and household odors from cooking, pets, and smoke. It is designed to catch airborne particles found indoors, which also helps prolong the True HEPA Filter life",
        "PlasmaWave® Air Cleaning Technology:",

        "Smart Sensor + Auto Mode: Built-in air quality sensor measures and adjusts fan speed in real-time",

        "Air Quality Indicator: Visual indicator displays real-time air quality in the room with LED lights",

        "Ultra-Quiet: Nearly silent on its slowest speed",

        "Sleep Mode: Activate the quiet, energy-efficient Sleep Mode for a good night's sleep",

        "Tested and Trusted: This unit is proven dependable and efficient by being AHAM Verified, Energy Star Certified, ETL Certified, and backed by the Winix 2 Year Warranty",

        "Energy Efficient: Energy Star Certified for low energy consumption, resulting in reduced operating costs.",

        "Filter Replacement Indicator: When the filters need to be replaced, the Filter Replacement Indicator LED will illuminate."
      ],
      technicalDetails: {
        cadr: "250 m³/h (≈147 CFM)",
        airChangesPerHour: "≈4.8x per hour",
        roomSizeRecommended: "230 sq ft",
        fanSpeeds: "3 + Auto + Sleep",
        controlType: "Touch Panel + Remote",
        indicators: ["Air Quality LED", "Filter Replacement"],
      },
      //Old  product information
      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Corded Electric",
          "Control Method": "Touch",
          "Filter Type": "Activated Carbon",
          "Floor Area": "230 Square Feet",
          "Noise Level": "20 Decibels",
          "Particle Retention Size": "0.3 Micrometer",
          "Controller Type": "Remote Control",
        },
        measurements: {
          "Item Dimensions D x W x H": "24D x 24W x 37H Centimeters",
          "Item Weight": "3.22 Kg"
        },
        userGuide: {
          "Specification Met": "AHAM Certified",
        },
        additionalDetails: {
          "Color": "White",
        }
      },

      itemDetails: {
        brandName: "Winix",
        modelNumber: "A231",
        manufacturer: "Phone Number: +91 8885241706, Mail Id: care@justshop24x7.com, Winix",

        customerReviews: {
          rating: 4.5,
          totalReviews: 39310,
          ratingText: "4.5 out of 5 stars"
        },

        bestSellersRank: [
          "#26,107 in Home & Kitchen",
          "#67 in HEPA Air Purifiers"
        ],

        asin: "B08HW5SBQ6",
        importerContactInformation:
          "Sha Maknaji Veerchand, Ph no- 8885241706",
        itemTypeName: "Air Purifier",
        includedComponents: "Air Purifier",
        itemHeight: "14.6 Inches",
        packerContactInformation:
          "Sha Maknaji Veerchand , Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count"
      },

      //Add ne changes start here 
      productTechnicalSpecs: {
        "Power Source Type": "Corded Electric",
        "Control Method": "Touch",
        "Filter Type": "Activated Carbon",
        "Floor Area": "230 Square Feet",
        "Noise Level": "20 Decibels",
        "Particle Retention Size": "0.3 Micrometer",
        "Controller Type": "Remote Control",

        // measurements
        "Item Dimensions D x W x H": "24D x 24W x 37H Centimeters",
        "Item Weight": "3.22 Kg",

        // userGuide
        "Specification Met": "AHAM Certified",

        // additionalDetails (old)
        "Color": "White and Charcoal Grey",

        // from itemDetails
        "Brand Name": "Winix",
        "Model Number": "A231",
        "Manufacturer": "Phone Number: +91 8885241706, Mail Id: care@justshop24x7.com, Winix",
        "ASIN": "B08HW5SBQ6",
        "Item Type Name": "Air Purifier",
        "Item Height": "14.6 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "2 + 1 On Registration"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "3.22 Kg",
        netQuantity: "1.0 count",
        includedComponents: "Air Purifier",
        genericName: "Air Purifier",

        bestSellersRank: [
          "#26,107 in Home & Kitchen",
          "#67 in HEPA Air Purifiers"
        ]
      },

      whatsInTheBox: {
        items: ["Winix A231", "Manual"]
      },
      //Add new changes end here
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
        "assets/winix-product-images/a231/1.png",
        "assets/winix-product-images/a231/2.png",
        "assets/winix-product-images/a231/3.png",
      ],
      videos: ["assets/winix-product-images/a231/Aplus.mp4"],
      lastImage: "assets/winix-product-images/last-image.jpeg",
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
    // A231 Product End

    // 5300-2 Product Start
    {
      id: 2,
      isFilter: false,
      productUrl: "https://www.amazon.in/Winix-5300-2-Purifier-PlasmaWave-Reducing/dp/B01D8DAYBA/ref=sr_1_1_sspa?crid=13CBVJUQ98R7R&dib=eyJ2IjoiMSJ9.Kp26yzZ_O7yzCqZVio4eM8X0lDXtjI4IfNuutcBiDJOGikTLEumjQeBFs12phlwA1fPcueTVaqVD8kvlO0LzVS3kqv8EVjfipAZbFaTS5M-faaYKj7ZDocTv-YUva276h32vcS85_jaCvZc6TWJgbzlg8wqQrXuCTGNgpPEjCj3-OCVrHK5852_MkjQt8IMCLWO3KgPNN05ZgwuShB8-ppE3Za8j8rnNwQMBmf6tkX0.FtKqwonycx94L0Lbr2GqcBMCiLTMC1vheZeg9izAgPM&dib_tag=se&keywords=winix%2B5500-2%2Bair%2Bpurifier&nsdOptOutParam=true&qid=1758281186&sprefix=winix%2B5500-2%2B%2Caps%2C317&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1 ",
      slug: "winix-5300-2-air-purifier",
      name: "WINIX 5300-2 Premium 4-Stage Air Purifier",
      shortName: "Winix 5300-2 Premium",
      userManual: 'assets/manuals/5300-2.pdf',
      ahamCertificate: 'assets/manuals/5300-2-aham.pdf',
      description:
        "Premium 4-stage purifier with True HEPA, PlasmaWave, and activated carbon. AHAM-verified coverage up to 1065 sq ft, CADR 390 m³/h, with ultra-quiet 27.8 dB operation.",
      images: [
        "assets/products-v2/5300-2/1.png",
        "assets/products-v2/5300-2/2.png",
        "assets/products-v2/5300-2/3.png",
        "assets/products-v2/5300-2/4.png",
        "assets/products-v2/5300-2/5.png",
        "assets/products-v2/5300-2/6.png",
        "assets/products-v2/5300-2/7.png",
        "assets/products-v2/5300-2/8.png",
        "assets/products-v2/5300-2/9.png",
        "assets/products-v2/28.png"
      ],
      currentImage: "assets/products-v2/5300-2/product-1.jpg",
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
      price: "₹14,999",
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
        "AHAM Verifide® 360 sq. ft.: CADR rated for 360 sq. ft. Suitable for medium and large rooms including kids’ bedrooms, baby nurseries, and offices.",

        "Winix True HEPA: True-HEPA filter captures 99.97% of airborne pollutants such as dust mites, pet dander, pollen, and other allergens as small as 0.3 microns.",

        "3-Stage Cleaning System: Removes a wide range of allergens including dust, cigarette smoke, pollen, odors, pet dander, mold spores, and organic chemicals. CFM (Sleep / Low / Med / High / Turbo): 35.31 / 70.63 / 91.82 / 123.60 / 240.14.",

        "PlasmaWave® Air Cleaning Technology:PlasmaWave acts as a permanent filter to safely break down odors, allergens, chemical vapors, and other pollutants — with no harmful ozone.",

        "Smart Sensor + Auto Mode: 236 CFM, decibels, 27.8. Smart Sensor gauges the air and our Auto Mode adjusts the fan to filter the air as needed; with a sleep mode for silent night-time operation, No remote control.",

        "Ultra-Quiet Operation: Nearly silent when running on its slowest speed. ",

        "Sleep Mode: Activates the quiet, energy-efficient Sleep Mode for a good night’s sleep.",

        "Tested and Trusted: This unit is proven dependable and efficient by being AHAM Verified, Energy Star Certified, ETL Certified, and backed by the Winix 3 Year Warranty",

        "Energy Efficient: Energy Star Certified for low energy consumption, reducing overall operating costs.",
      ],
      technicalDetails: {
        cadr: "236 CFM (≈390 m³/h)",
        airChangesPerHour: "≈4.7x per hour",
        roomSizeRecommended: "Up to 1065 sq ft",
        fanSpeeds: 5, // Sleep / Low / Med / High / Turbo
        controlType: "Touch + Button Control",
        indicators: ["Air Quality LED", "Filter Replacement", "Mode Status"],
      },

      //Old  product information
      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "electric",
          "Control Method": "Touch",
          "Filter Type": "Activated Carbon",
          "Floor Area": "360 Square Feet",
          "Noise Level": "27.8 Decibels",
          "Particle Retention Size": "0.3 Micron",
          "Controller Type": "Button Control",
          "Wattage": "7E+1",
        },
        measurements: {
          "Item Dimensions D x W x H": "15D x 37W x 49H Centimeters",
          "Item Weight": "6.71 kg"
        },
        userGuide: {
          "Specification Met": "Certified HEPA",
        },
        additionalDetails: {
          "Color": "Gray",
        }
      },
      itemDetails: {
        brandName: "Winix",
        modelNumber: "5300-2",
        globaltradeidentificationNumber: "08809154399143",
        manufacturer: "Phone Number: +91 8885241706, Mail Id: care@justshop24x7.com, Winix",
        customerReviews: {
          rating: 4.5,
          totalReviews: 39316,
          ratingText: "4.5 out of 5 stars"
        },

        bestSellersRank: [
          "#1,304 in Home & Kitchen (See Top 100 in Home & Kitchen)",
          "#14 in HEPA Air Purifiers"
        ],

        asin: "B01D8DAYBA",

        importerContactInformation:
          "Sha Maknaji Veerchand, Kamala Nagar DCMS road Anantapur-515001-Ph no 08554-356969, care@justshop24x7.com",

        itemTypeName: "Air purifier",

        includedComponents: "5300-2 unit and filters, Four Carbon FIlters, one Model 5300-2 Air Purifier, one True Hepa Filter",
        itemHeight: "23.6 Inches",
        packerContactInformation:
          "Sha Maknaji Veerchand, Kamala Nagar DCMS road Anantapur-515001-Ph no 08554-356969, care@justshop24x7.com",
        unitCount: "1.0 count",
        warrantyDescription: "2 + 1 On Registration",
      },

      //Add ne changes start here
      productTechnicalSpecs: {
        // features & specs
        "Power Source Type": "Electric",
        "Control Method": "Touch",
        "Filter Type": "Activated Carbon",
        "Floor Area": "360 Square Feet",
        "Noise Level": "27.8 Decibels",
        "Particle Retention Size": "0.3 Micron",
        "Controller Type": "Button Control",
        "Wattage": "7E+1",

        // measurements
        "Item Dimensions D x W x H": "5D x 37W x 49H Centimeters",
        "Item Weight": "6.71 kg",

        // user guide
        "Specification Met": "Certified HEPA",

        // additionalDetails
        "Color": "Gray",

        // itemDetails main values
        "Brand Name": "Winix",
        "Model Number": "5300-2",
        "ASIN": "B01D8DAYBA",
        "Item Type Name": "Air purifier",
        "Item Height": "23.6 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "2 + 1 On Registration",
      },
      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "6.71 kg",
        netQuantity: "1.0 count",

        includedComponents:
          "5300-2 unit and filters, Four Carbon FIlters, one Model 5300-2 Air Purifier, one True Hepa Filter",

        genericName: "Air Purifier",

        bestSellersRank: [
          "#1,304 in Home & Kitchen (See Top 100 in Home & Kitchen)",
          "#14 in HEPA Air Purifiers"
        ]
      },
      whatsInTheBox: {
        items: [
          "Winix 5300-2",
          "Manual",
        ]
      },
      //add new changes end here

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
        "assets/winix-product-images/t5300-2/1.png",
        "assets/winix-product-images/t5300-2/2.png",
        "assets/winix-product-images/t5300-2/3.png",
        "assets/winix-product-images/t5300-2/4.jpg",
        "assets/winix-product-images/t5300-2/5.jpg",
        "assets/winix-product-images/t5300-2/6.jpg",
        "assets/winix-product-images/t5300-2/7.jpg",
        "assets/winix-product-images/t5300-2/8.jpg"
      ],
      videos: ["assets/winix-product-images/t5300-2/Aplus.mp4", "assets/winix-product-images/t5300-2/Aplus-2.mp4", "assets/winix-product-images/t5300-2/Aplus-3.mp4"],
      lastImage: "assets/winix-product-images/last-image.jpeg",
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
    // 5300-2 Product End

    // 5500-2 Product Start
    {
      id: 3,
      isFilter: false,
      productUrl: "https://www.amazon.in/Winix-5500-2-Purifier-PlasmaWave-Reducing/dp/B01D8DAYII/ref=sr_1_3?crid=13CBVJUQ98R7R&dib=eyJ2IjoiMSJ9.Kp26yzZ_O7yzCqZVio4eM8X0lDXtjI4IfNuutcBiDJOGikTLEumjQeBFs12phlwA1fPcueTVaqVD8kvlO0LzVS3kqv8EVjfipAZbFaTS5M-faaYKj7ZDocTv-YUva276h32vcS85_jaCvZc6TWJgbzlg8wqQrXuCTGNgpPEjCj3-OCVrHK5852_MkjQt8IMCLWO3KgPNN05ZgwuShB8-ppE3Za8j8rnNwQMBmf6tkX0.FtKqwonycx94L0Lbr2GqcBMCiLTMC1vheZeg9izAgPM&dib_tag=se&keywords=winix%2B5500-2%2Bair%2Bpurifier&nsdOptOutParam=true&qid=1758281186&sprefix=winix%2B5500-2%2B%2Caps%2C317&sr=8-3&th=1 ",
      slug: "winix-5500-2-air-purifier",
      name: "WINIX 5500-2 True HEPA purifier with PlasmaWave Tech AOC carbon filter AHAM-verified 360 sq ft coverage.",
      shortName: "WINIX 5500-2",
      userManual: 'assets/manuals/5500-2.pdf',
      ahamCertificate: 'assets/manuals/5500-2-aham.pdf',
      description:
        "True HEPA purifier with PlasmaWave and washable AOC carbon filter. 360 sq ft coverage, 27.8 dB operation, 70W power.",
      images: [
        "assets/products-v2/5500-2/1.png",
        "assets/products-v2/5500-2/2.png",
        "assets/products-v2/5500-2/3.png",
        "assets/products-v2/5500-2/5500-2-certificate.png",
        "assets/products-v2/5500-2/4.png",
         "assets/products-v2/5500-2/6.png",
          "assets/products-v2/5500-2/7.png",
          "assets/products-v2/5500-2/8.png",
        "assets/products-v2/5500-2/5.png",
        "assets/products-v2/5500-2/map.png",
      ],
      currentImage: "assets/products-v2/5500-2/product-1.jpg",
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
      price: "₹15,999",
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
        "AHAM Verifide® at 350 sq ft.: CADR rated for 360 sq. ft. room size. Suitable for medium and large rooms; kids bedrooms, family rooms and kitchens.",

        "Winix True HEPA: True-HEPA filter captures 99. 97% of airborne pollutants; dust mites, pet dander, pollen and other allergens as small as 0. 3 microns.",

        "Fine Mesh Filter: Washable AOC Carbon Filter, made from activated carbon granulars for removal of household odors.PlasmaWave acts as a permanent filter to safely break down odor, allergens, chemical vapors and other pollutants - with no harmful ozone.",

        "The Smart Sensors Air Purifier : Smart Sensors gauge the air and our Auto Mode adjusts the fan to filter the air as needed; with a sleep mode for silent night-time operation.",

        "Air Quality Indicator: Visual indicator displays real-time air quality in the room with LED lights.",

        "Ultra-Quiet: Nearly silent on its slowest speed.",

        "Sleep Mode: Activate the quiet, energy-efficient Sleep Mode for a good night’s sleep.",

        "Tested and Trusted: This unit is proven dependable and efficient by being AHAM Verified, Energy Star Certified, UL Certified, and backed by the Winix 3 Year Warranty.",

        "Energy Efficient: Energy Star Certified for low energy consumption, resulting in reduced operating costs.",

        "Sleep Mode: Activate the quiet, energy-efficient Sleep Mode for a good night’s sleep",

      ],

      technicalDetails: {
        cadr: "243 CFM (Smoke), 246 CFM (Dust), 232 CFM (Pollen)",
        airChangesPerHour: "≈4.8x per hour",
        roomSizeRecommended: "360 sq ft",
        fanSpeeds: 4,
        controlType: "Touch Panel",
        indicators: ["Air Quality LED", "Filter Replacement", "PlasmaWave Status"],
      },

      //Old product information
      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Corded Electric",
          "Control Method": "Remote",
          "Filter Type": "HEPA",
          "Floor Area": "360 Square Feet",
          "Noise Level": "27.8 Decibels",
          "Particle Retention Size": "0.3 Micron",
          "Controller Type": "Hand Control",
          "Wattage": "70 Watts",
        },
        measurements: {
          "Item Dimensions D x W x H": "8.2D x 14.9W x x 23.6H",
          "Item Weight": "6.7 Kg"
        },
        userGuide: {
          "Specification Met": "HAM Certified, CARB Certified, Energy Star Certified, UL Certified",
        },
        additionalDetails: {
          "Color": "Charcoal Gray",
        }
      },

      itemDetails: {
        brandName: "Winix",
        modelNumber: "5500-2",
        globaltradeidentificationNumber: "08809154399167",
        manufacturer: "Phone Number: +91 8885241706, Mail Id: care@justshop24x7.com, Winix",
        customerReviews: {
          rating: 4.5,
          totalReviews: 39310,
          ratingText: "4.5 out of 5 stars"
        },

        bestSellersRank: [
          "#1,304 in Home & Kitchen (See Top 100 in Home & Kitchen)",
          "#14 in HEPA Air Purifiers"
        ],

        asin: "B01D8DAYII",
        importerContactInformation: "Sha Maknaji Veerchand , Kamala Nagar, Anantapur. Ph no-08554-356969",
        itemTypeName: "Washable AOC Carbon Filter",
        includedComponents: "Air Purifier",
        itemHeight: "23.6 Inches",
        packerContactInformation:
          "Sha Maknaji Veerchand , Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count",
        warrantyDescription: "2 + 1 On Registration",
      },

      //Add new changes start here
      productTechnicalSpecs: {
        // features & specs
        "Power Source Type": "Corded Electric",
        "Control Method": "Touch",
        "Filter Type": "Activated Carbon",
        "Floor Area": "360 Square Feet",
        "Noise Level": "27.8 Decibels",
        "Particle Retention Size": "0.3 Micron",
        "Controller Type": "Hand Control",
        "Wattage": "70 Watts",

        // measurements
        "Item Dimensions D x W x H": "19.8D x 37.8W x x 59.6H Centimeters",
        "Item Weight": "6.7 Kg",

        // user guide
        "Specification Met": "Certified HEPA",

        // additional details
        "Color": "Black",

        // item details (main)
        "Brand Name": "Winix",
        "Model Number": "5500-2",
        "ASIN": "B01D8DAYII",
        "Item Type Name": "Washable AOC Carbon Filter",
        "Item Height": "23.6 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "2 + 1 On Registration"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "6.7 Kg",
        netQuantity: "1.0 count",

        includedComponents: "Air Purifier",
        genericName: "Air Purifier",

        bestSellersRank: [
          "#1,304 in Home & Kitchen (See Top 100 in Home & Kitchen)",
          "#14 in HEPA Air Purifiers"
        ]
      },

      whatsInTheBox: {
        items: ["Winix 5500-2", "Manual"]
      },

      //Add new changes end here
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
        "assets/winix-product-images/t5500-2/1.png",
        "assets/winix-product-images/t5500-2/2.png",
        "assets/winix-product-images/t5500-2/3.png",
        "assets/winix-product-images/t5500-2/4.jpg",
        "assets/winix-product-images/t5500-2/5.jpg",
      ],
      videos: ["assets/winix-product-images/t5500-2/Aplus.mp4","assets/winix-product-images/t5500-2/Aplus-2.mp4"],
      lastImage: "assets/winix-product-images/last-image.jpeg",
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
    // 5500-2 Product End

    // T800 Product Start
    {
      id: 4,
      isFilter: false,
      productUrl: "https://www.amazon.in/dp/B0CDNH5NX4?th=1",
      slug: "winix-t800-air-purifier",
      name: "Winix T800 360° True HEPA WiFi Air Purifier with 4-Stage PlasmaWave Tech",
      shortName: "WINIX T800",
      userManual: 'assets/manuals/t800.pdf',
      ahamCertificate: 'assets/manuals/t800-aham.pdf',
      description:
        "Smart Wi-Fi enabled air purifier with True HEPA, carbon filter, auto mode, and air quality monitor. Covers up to 1968 sq ft in 1 hour with AHAM-verified 410 sq ft rating.",
      images: [
        "assets/products-v2/T800/T800.png",
        "assets/products-v2/T800/2.png",
        "assets/products-v2/T800/3.png",
        "assets/products-v2/T800/4.png",
        "assets/products-v2/T800/5.png",
        "assets/products-v2/T800/6.png",
        "assets/products-v2/T800/7.png",
        "assets/products-v2/T800/8.png",
        "assets/products-v2/T800/9.png",
        "assets/products-v2/28.png"
      ],
      currentImage: "assets/products-v2/T800/product-1.jpg",
      rating: 4.4,
      category: "Smart Series",
      technology: "True HEPA + Carbon Filter + PlasmaWave + Smart Wi-Fi",
      keyFeatures: [
        "AHAM Verifide ® at 410 sq ft",
        "The Smarter Air Purifier",
        "Fine Mesh Pre-Filter ",
        "Washable fine mesh pre-filter",
        "Winix True HEPA",
        "Activated Carbon Filter",
        "PlasmaWave® Air Cleaning Technology ",
        "Smart Sensor + Auto Mode ",
        "Air Quality Indicator",
        "Ultra-Quiet",
        "Sleep Mode",
        "Tested and Trusted",
        "Energy Efficient",
        "Filter Replacement Indicator",
        "03 Years warranty"
      ],
      coverage: "410 sq ft (AHAM) • Up to 1968 sq ft (1 hour)",
      filterType: "Washable Pre-filter + Carbon + True HEPA",
      noiseLevel: "—",
      isHovered: false,
      badge: "Smart Choice",
      isAward: true,
      awardType: "AHAM • CARB • Energy Star • FCC • UL Certified",
      price: "₹21,999",
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
        "AHAM Verifide ® at 410 sq ft.: Also cleans rooms up to 1,968 sq ft in 1 hour (984 sq ft in 30 minutes, 656 sq ft in 20 minutes, 492 sq ft in 15 minutes)",
        "The Smarter Air Purifier: Control and monitor your unit anytime from anywhere by instantly accessing your unit with the Winix Smart App through the convenient WiFi feature",
        "Fine Mesh Pre-Filter: The first line of defense against the largest airborne particles found indoors.",
        "Winix True HEPA: Captures 99.99% * of airborne allergens including pollen, dust, smoke, and pet dander, as small as 0.01 microns ",
        "Activated Carbon Filter: Reduces VOCs and household odors from cooking, pets, and smoke. It is designed to catch airborne particles found indoors, which also helps prolong the True HEPA Filter life.",
        "PlasmaWave® Air Cleaning Technology",
        "Smart Sensor + Auto Mode: Built-in air quality sensor measures and adjusts fan speed in real-time ",
        "Air Quality Indicator: Visual indicator displays real-time air quality in the room with LED lights ",
        "Ultra-Quiet: Nearly silent on its slowest speed",
        "Sleep Mode: Activate the quiet, energy-efficient Sleep Mode for a good night's sleep",
        "Tested and Trusted: This unit is proven dependable and efficient by being AHAM Verified, Energy Star Certified, UL Certified, and backed by the Winix 3 Year Warranty",
        "Energy Efficient: Energy Star Certified for low energy consumption, resulting in reduced operating costs.",
      ],
      technicalDetails: {
        cadr: "(AHAM Verified at 410 sq ft)",
        airChangesPerHour: "(varies by room size)",
        roomSizeRecommended: "410 sq ft (AHAM) / up to 1968 sq ft",
        fanSpeeds: "3",
        controlType: "Touch + Wi-Fi App Control",
        indicators: ["Air Quality LED", "Filter Replacement"],
      },
      //Old Product Information
      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Corded Electric",
          "Control Method": "App",
          "Filter Type": "HEPA",
          "Floor Area": "410 Square Feet",
          "Noise Level": "23.8 Decibels",
          "Particle Retention Size": "0.01 Micrometer",
          "Controller Type": "Amazon Alexa",
          "Wattage": "45 Watts",
        },

        measurements: {
          "Item Dimensions D x W x H": "24D x 24W x 37H Centimeters",
          "Item Weight": "4.7 kg"
        },

        userGuide: {
          "Specification Met": "AHAM Certified, CARB Certified, Energy Star Certified, FCC Certified, UL Certified",
        },

        additionalDetails: {
          "Color": "White",
        }
      },
      itemDetails: {
        brandName: "Winix",
        modelNumber: "T800",
        manufacturer: "Winix",

        customerReviews: {
          rating: 4.4,
          totalReviews: 192,
          ratingText: "4.4 out of 5 stars"
        },

        bestSellersRank: [
          "#26,107 in Home & Kitchen",
          "#67 in HEPA Air Purifiers"
        ],
        asin: "BOCDNH5NX4",
        importerContactInformation: "Sha Maknaji Veerchand, Ph no- 8885241706",
        itemTypeName: "Air Purifier",
        includedComponents: "Air Purifier",
        itemHeight: "20.4 Inches",
        packerContactInformation: "Sha Maknaji Veerchand, Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count",

      },

      //Add new changes start here
      productTechnicalSpecs: {
        // features & specs
        // "Power Source Type": "Corded Electric",
        "Control Method": "App",
        "Filter Type": "HEPA",
        "Floor Area": "410 Square Feet",
        "Noise Level": "23.8 Decibels",
        "Particle Retention Size": "0.01 Micrometer",
        "Controller Type": "Amazon Alexa",
        "Wattage": "45 Watts",
        "Special Feature": "Programmable",

        // measurements
        "Item Dimensions D x W x H": "24D x 24W x 37H Centimeters",
        "Item Weight": "4.7 kg",

        // user guide
        "Specification Met": "AHAM Certified, CARB Certified, Energy Star Certified, FCC Certified, UL Certified",

        // additional details
        "Color": "White",

        // item details (main)
        "Brand Name": "Winix",
        "Model Number": "T800",
        "Manufacturer": "Winix",
        "ASIN": "BOCDNH5NX4",
        "Item Type Name": "Air Purifier",
        "Item Height": "20.4 Inches",
        "Unit Count": "1.0 count",
        "Warranty Description": "2 + 1 On Registration"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',

        itemWeight: "4.7 kg",
        netQuantity: "1.0 count",
        includedComponents: "Air Purifier",
        genericName: "Air Purifier",

        bestSellersRank: [
          "#62,834 in Home & Kitchen",
          "#97 in HEPA Air Purifiers"
        ]
      },

      whatsInTheBox: {
        items: ["Winix T800", "Manual"]
      },

      //Add new changes end here
      productReviews: [
        {
          id: "t800-r1",
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
          id: "t800-r2",
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
          id: "t800-r3",
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
          id: "t800-r4",
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
          id: "t800-r5",
          author: "Samir",
          rating: 4,
          title: "Great filtration, basic app",
          body: "T800 ki cleaning power bohot strong hai—pollen aur cooking VOCs handle ho jaate hain. App ka UI thoda basic hai par kaam kar deta hai.",
          date: "2025-05-10",
          verified: true,
          helpful: 7,
          images: [],
        },
        {
          id: "t800-r6",
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
          id: "t800-r7",
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
          id: "t800-r8",
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
        "assets/winix-product-images/t800/1.jpg",
        "assets/winix-product-images/t800/1.png",
        "assets/winix-product-images/t800/2.jpg",
        "assets/winix-product-images/t800/2.png",
        "assets/winix-product-images/t800/3.1.png",
        "assets/winix-product-images/t800/3.jpg",
        "assets/winix-product-images/t800/4.jpg",
        "assets/winix-product-images/t800/5.jpg",
      ],
      videos: ["assets/winix-product-images/t800/Aplus.mp4","assets/winix-product-images/t800/Aplus-2.mp4"],
      lastImage: "assets/winix-product-images/last-image.jpeg",
      faqs: [
        {
          q: "Does it support Wi-Fi or app control?",
          a: "Yes. The T800 can connect to Wi-Fi and be controlled through the Winix Smart app.",
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
    // T800 Product End

    // T500 Product Start
    {
      id: 5,
      isFilter: false,
      productUrl: "https://www.amazon.in/dp/B0FQBSFWRJ",
      slug: "winix-t500-air-purifier",
      name: "WINIX T500 360° 4-Stage True HEPA WiFi Air Purifier with PlasmaWave®",
      shortName: "WINIX T500",
      userManual: 'assets/manuals/t500.pdf',
      ahamCertificate: 'assets/manuals/t500-aham.pdf',
      description:
        "360° all-in-one air purifier with WiFi Smart App control, PlasmaWave technology, and 4-stage filtration including fine mesh pre-filter, True HEPA, and activated carbon. AHAM verified for 251 sq ft, capable of cleaning up to 1204 sq ft in 1 hour.",
      images: [
        "assets/products-v2/T500/T500.png",
        "assets/products-v2/T500/2 (2).png",
        "assets/products-v2/T500/2.png",
        "assets/products-v2/T500/4.png",
        "assets/products-v2/T500/5.png",
        "assets/products-v2/T500/6.png",
        "assets/products-v2/T500/7.jpg",
        "assets/products-v2/T500/8.png",
        "assets/products-v2/T500/9.png",
        "assets/products-v2/T500/10.png",
        "assets/products-v2/28.png"
      ],
      currentImage: "assets/products-v2/T500/product-1.jpg",
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
        "AHAM Verifide® at 251 sq ft. : Also cleans rooms up to 1204 sq. ft. in 1 hour (602 sq. ft. in 30 minutes, 401 sq. ft. in 20 minutes, 301 sq. ft. in 15 minutes).",

        "The Smarter Air Purifier : Control and monitor your unit anytime from anywhere by instantly accessing your unit with the Winix Smart App through the convenient Wifi feature.",

        "Fine Mesh Pre-Filter: The first line of defense against the largest airborne particles found indoors.",
        "Winix True HEPA: Captures 99.99%* of airborne allergens including pollen, dust, smoke, and pet dander, as small as 0.01 microns.",

        "Activated Carbon Filter: Reduces VOCs and household odors from cooking, pets, and smoke. It is designed to catch airborne particles found indoors, which also helps prolong the True HEPA Filter life.",
        "PlasmaWave® Air Cleaning Technology:",

        "Smart Sensor + Auto Mode: Built-in air quality sensor measures and adjusts fan speed in real-time.",

        "Air Quality Indicator: Visual indicator displays real-time air quality in the room with LED lights.",

        "Ultra-Quiet: Nearly silent on its slowest speed.",

        "Sleep Mode: Activate the quiet, energy-efficient Sleep Mode for a good night’s sleep.",

        "Tested and Trusted: This unit is proven dependable and efficient by being AHAM Verified, Energy Star Certified, UL Certified, and backed by the Winix 3 Year Warranty.",

        "Energy Efficient: Energy Star Certified for low energy consumption, resulting in reduced operating costs.",

        "Filter Replacement Indicator: When the filters need to be replaced, the Filter Replacement Indicator LED will illuminate."
      ],
      technicalDetails: {
        cadr: "172 (Dust) / 174 (Pollen) / 162 (Smoke)",
        airChangesPerHour: "4.8x per hour (AHAM verified)",
        roomSizeRecommended: "251 sq ft (AHAM) / up to 1204 sq ft",
        fanSpeeds: 5,
        controlType: "Touch + WiFi App Control",
        indicators: ["Air Quality LED (4-color)", "Filter Replacement"],
      },

      //Old Product Information
      productInformation: {
        featuresAndSpecs: {
          "Power Source Type": "Corded Electric",
          "Control Method": "App",
          "Filter Type": "HEPA",
          "Floor Area": "50 Square Meters",
          "Noise Level": "36.4 Decibels",
          "Wattage": "55 Watts",
        },
        measurements: {
          "Item Dimensions D x W x H": "24D x 24W x 37H Centimeters",
          "Item Weight": "3.1 Kg"
        },
        userGuide: {
          "": "",
        },
        additionalDetails: {
          "Color": "White and Black",
        }
      },
      itemDetails: {
        brandName: "Winix",
        modelNumber: "WINIX T500",
        manufacturer: "Winix",

        customerReviews: {
          rating: 4.5,
          totalReviews: 39310,
          ratingText: "4.5 out of 5 stars"
        },

        bestSellersRank: [
          "#26,107 in Home & Kitchen",
          "#67 in HEPA Air Purifiers"
        ],

        asin: "B0FQBSFWRJ",
        importerContactInformation: "Sha Maknaji Veerchand, Ph no- 8885241706",
        itemTypeName: "Air Purifier",
        includedComponents: "Air Purifier",
        itemHeight: "37 Centimeters",
        packerContactInformation:
          "Sha Maknaji Veerchand , Kamala Nagar, Anantapur. Ph no-08554-356969",
        unitCount: "1.0 count"
      },

      //Add new changes start here
      productTechnicalSpecs: {
        // features & specs
        "Power Source Type": "Corded Electric",
        "Control Method": "App",
        "Filter Type": "HEPA",
        "Floor Area": "50 Square Meters",
        "Noise Level": "36.4 Decibels",
        "Wattage": "55 Watts",

        // measurements
        "Item Dimensions D x W x H": "24D x 24W x 37H Centimeters",
        "Item Weight": "3.1 Kg",

        // user guide (empty)
        "User Guide": "",

        // additional details
        "Color": "White and Black",

        // item details main mapped
        "Brand Name": "Winix",
        "Model Number": "WINIX T500 Luftreiniger WIFI",
        "Manufacturer": "Winix",
        "ASIN": "B0FQBSFWRJ",
        "Item Type Name": "Air Purifier",
        "Item Height": "37 Centimeters",
        "Unit Count": "1.0 count",
        "Warranty Description": "2 + 1 On Registration"
      },

      additionalInformation: {
        manufacturer: 'Winix',
        packer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        importer: 'Sha Maknaji Veerchand, S.No.4, H.No.1/18/2, Lane 5, Kakdewasti, Next to Rishi Enclave, Kondhwa Budruk, Pune 411048.',
        contact: '+91 88852 41706',
        email: 'care@justshop24x7.com',
        itemWeight: "3.1 Kg",
        netQuantity: "1.0 count",

        includedComponents: "Air Purifier",
        genericName: "Air Purifier",

        bestSellersRank: [
          "#26,107 in Home & Kitchen",
          "#67 in HEPA Air Purifiers"
        ]
      },

      whatsInTheBox: {
        items: ["Winix T500", "Manual"]
      },
      //Add new changes end here
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
        "assets/winix-product-images/t500/1.png",
        "assets/winix-product-images/t500/2.1.jpg",
        "assets/winix-product-images/t500/2.png",
        "assets/winix-product-images/t500/4.1.jpg",
        "assets/winix-product-images/t500/5.0.jpg",
      ],
      videos: ["assets/winix-product-images/t500/Aplus.mp4","assets/winix-product-images/t500/Aplus-2.mp4"],
      lastImage: "assets/winix-product-images/last-image.jpeg",
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
        // ✅ FILTER PRODUCT → Product Details hamesha OPEN
        if (this.product.isFilter) {
          this.sectionsOpen.details = true;
        }
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

  //
  scrollTo(id: string) {
    // Close mobile menu (if open)
    this.isMobileOpen = false;
    document.body.classList.remove("overflow-hidden");

    const header = document.querySelector("header") as HTMLElement | null;
    const headerOffset = header?.offsetHeight ?? 72;
    const extraGap = 8;

    const doScroll = () => {
      const target = document.getElementById(id);
      if (target) {
        const y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset -
          extraGap;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    };


    // If already on home page
    if (this.router.url === "/" || this.router.url === "/home") {
      // Add a slight delay for smoother UX
      setTimeout(() => doScroll(), 150);
    } else {
      // Navigate to home, then scroll
      this.router.navigate(["/"]).then(() => {
        setTimeout(() => doScroll(), 500); // ensure DOM loads
      });
    }
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

  // Open Product Manual
  openManual() {
    if (this.product?.userManual) {
      window.open(this.product.userManual, "_blank");
    }
  }

  // Open AHAM Certificate Pdf
  openAhamCertificate() {
    if (this.product?.ahamCertificate) {
      window.open(this.product.ahamCertificate, "_blank");
    }
  }
}
