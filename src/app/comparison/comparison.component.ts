import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface PurifierSpec {
  category: string
  zeroCompact?: string | number
  winix5300?: string | number
  winix5500?: string | number
  winixT810?: string | number
  cowayAirMega?: string | number
  cowayAirMega150?: string | number
  cowayAirMega200?: string | number
  honeywell?: string | number
  xiaomiMi4?: string | number
  philipsAC9950?: string | number
  philipsAC1711?: string | number
  eurekaE150?: string | number
  sharpFP?: string | number
}

interface PurifierModel {
  name: string
  image: string
  modelName: string
}

interface PurifierModel {
  name: string
  modelName: string
  image: string
}

interface SpecRow {
  category: string
  subcategory?: string
  isGroupHeader?: boolean
  values: (string | number)[]
}

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent {
  models = [
    "ZERO Compact",
    "5300-2",
    "5500-2",
    "T810",
    "AirMega Aim",
    "AirMega 150",
    "AirMega 200",
    "Air Touch V2",
    "Mi 4 Lite",
    "AC0990",
    "AC1711",
    "Eureka 150",
    "FP-F40E",
  ]

  brands = [
    "Winix",
    "Winix",
    "Winix",
    "Winix",
    "Coway",
    "Coway",
    "Coway",
    "Honeywell",
    "Xiaomi",
    "Philips",
    "Philips",
    "Eureka",
    "Sharp",
  ]

  imagePaths = [
    'assets/comparison-images/winix-zero-compact.jpg',
    'assets/comparison-images/winix-5300-2.jpg',
    'assets/comparison-images/winix-5500-2.jpg',
    'assets/comparison-images/winix-t810.png',
    'assets/comparison-images/coway-airmega-aim.png',
    'assets/comparison-images/coway-airmega-150.jpg',
    'assets/comparison-images/coway-airmega-200.jpg',
    'assets/comparison-images/honeywell-airtouch-v2.jpg',
    'assets/comparison-images/xiaomi-mi-4-lite.jpg',
    'assets/comparison-images/philips-ac0950.jpg',
    'assets/comparison-images/philips-ac1711.png',
    'assets/comparison-images/eureka-150.jpg',
    'assets/comparison-images/sharp-fp-f40e.jpg'
  ]

  specifications: SpecRow[] = [
    {
      category: "Coverage Area",
      subcategory: "Shown Area",
      values: [
        "50 sqm (538 sqft)",
        "99 sqm (1065 sqft)",
        "99 sqm (1065 sqft)",
        "120sqm",
        "N/A",
        "N/A",
        "N/A",
        "N/A",
        "43 sqm",
        "N/A",
        "N/A",
        "N/A",
        "40 sqm",
      ],
    },
    {
      category: "Coverage Area",
      subcategory: "Shown sqft",
      values: [
        "380 (TBD)",
        "642 (TBD)",
        "642 (TBD)",
        "770(TBD)",
        "355",
        "214",
        "N/A",
        "388",
        "516",
        "300",
        "380",
        "200",
        "320",
      ],
    },
    {
      category: "CADR ECARF",
      subcategory: "m³",
      values: ["250", "390", "390", "500", "", "", "", "", "", "", "", "", ""],
    },
    {
      category: "CADR (AHAM Standard)",
      subcategory: "sqft",
      values: ["230", "360", "360", "410", "X", "X", "X", "X", "X", "X", "231", "X", "183"],
    },
    {
      category: "Filter",
      subcategory: "HEPA",
      values: [
        "True 99.97%",
        "True 99.97%",
        "True 99.97%",
        "True 99.97%",
        "99.99%",
        "99.99%",
        "99.99%",
        "99.99%",
        "99.97%",
        "99.97%",
        "99.97%",
        "99.97%",
        "99.97%",
      ],
    },
    {
      category: "Filter",
      subcategory: "Deodorization",
      values: [
        "All-in one Carbon",
        "Carbon Sheet",
        "AOC",
        "All-in one SW",
        "All-in one Carbon",
        "Urethane Carbon Filter",
        "Activated Carbon Filter",
        "AOC",
        "All-in one Carbon",
        "All-in one Carbon",
        "All-in one Carbon",
        "All-in one Carbon",
        "AOC",
      ],
    },
    {
      category: "Filter",
      subcategory: "Plasma",
      values: ["0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X", "0"],
    },
    {
      category: "Filter",
      subcategory: "Pet Filter",
      values: ["X", "X", "X", "Accessory", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    },
    {
      category: "Sensor",
      subcategory: "Sensor",
      values: ["Dust", "VOC, light", "VOC, light", "Dust, VOC, Light", "", "", "", "", "", "", "", "", ""],
    },
    {
      category: "Air Quality Display Stage",
      subcategory: "Air Quality Display Stage",
      values: [
        "3",
        "3",
        "3",
        "Numerical + 4",
        "3",
        "0",
        "4",
        "3",
        "Numerical + 4",
        "Numerical + 3",
        "Numerical + 3",
        "N/A",
        "4",
      ],
    },
    {
      category: "Wifi",
      subcategory: "Wifi",
      values: ["X", "X", "X", "0 (Google, Alexa)", "X", "X", "X", "X", "0", "0", "0", "X", "X"],
    },
    {
      category: "Origin",
      subcategory: "Origin",
      values: [
        "Thailand",
        "Thailand",
        "Thailand",
        "Thailand",
        "China",
        "China",
        "China",
        "China",
        "China",
        "China",
        "China",
        "China",
        "Thailand",
      ],
    },
  ]

  getHighlightClass(value: string | number): string {
    if (typeof value === "string") {
      if (value === "X") return "highlight-red"
      if (value === "0") return "highlight-yellow"
      if (value === "N/A") return "highlight-gray"
      if (value === "") return "empty-cell"
    }
    return ""
  }
}
